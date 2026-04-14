import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../common/services/email.service';
import {
  CreateSlotDto,
  UpdateSlotDto,
  CreateAppointmentDto,
  UpdateAppointmentDto,
  SlotQueryDto,
  AppointmentQueryDto,
} from '../dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async createSlot(dto: CreateSlotDto) {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);

    if (startTime >= endTime) {
      throw new BadRequestException('Start time must be before end time');
    }

    const conflictingSlot = await this.prisma.appointmentSlot.findFirst({
      where: {
        professionalId: dto.professionalId,
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
          {
            AND: [
              { startTime: { gte: startTime } },
              { endTime: { lte: endTime } },
            ],
          },
        ],
      },
    });

    if (conflictingSlot) {
      throw new ConflictException('Time slot conflicts with existing slot');
    }

    return this.prisma.appointmentSlot.create({
      data: {
        professionalId: dto.professionalId,
        startTime,
        endTime,
        notes: dto.notes,
      },
    });
  }

  async updateSlot(id: string, dto: UpdateSlotDto) {
    const slot = await this.prisma.appointmentSlot.findUnique({ where: { id } });
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    return this.prisma.appointmentSlot.update({
      where: { id },
      data: {
        ...(dto.startTime && { startTime: new Date(dto.startTime) }),
        ...(dto.endTime && { endTime: new Date(dto.endTime) }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
        ...(dto.status && { status: dto.status as any }),
      },
    });
  }

  async deleteSlot(id: string) {
    const slot = await this.prisma.appointmentSlot.findUnique({ where: { id } });
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    const hasAppointments = await this.prisma.appointment.count({
      where: { slotId: id },
    });
    if (hasAppointments > 0) {
      throw new BadRequestException('Cannot delete slot with existing appointments');
    }

    return this.prisma.appointmentSlot.delete({ where: { id } });
  }

  async findSlots(query: SlotQueryDto) {
    const where: any = {};

    if (query.professionalId) {
      where.professionalId = query.professionalId;
    }

    if (query.date) {
      const date = new Date(query.date);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      where.startTime = { gte: startOfDay, lte: endOfDay };
    }

    where.status = 'AVAILABLE';

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [slots, total] = await Promise.all([
      this.prisma.appointmentSlot.findMany({
        where,
        orderBy: { startTime: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.appointmentSlot.count({ where }),
    ]);

    return { slots, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async createAppointment(dto: CreateAppointmentDto) {
    return this.prisma.$transaction(async (tx) => {
      const slot = await tx.appointmentSlot.findUnique({
        where: { id: dto.slotId },
      });

      if (!slot) {
        throw new NotFoundException('Slot not found');
      }

      if (slot.status !== 'AVAILABLE') {
        throw new ConflictException('This slot is no longer available');
      }

      let patient = await tx.patient.findFirst({
        where: { email: dto.email },
      });

      if (!patient) {
        patient = await tx.patient.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phone: dto.phone,
            consentGivenAt: new Date(),
          },
        });
      }

      const adminUsers = await tx.user.findMany({
        where: { role: 'ADMIN', emailNotifications: true },
      });

      await tx.appointmentSlot.update({
        where: { id: dto.slotId },
        data: { status: 'BOOKED' },
      });

      const user = await tx.user.findFirst({
        where: { role: 'ADMIN' },
      });

      const appointment = await tx.appointment.create({
        data: {
          slotId: dto.slotId,
          patientId: patient.id,
          userId: user?.id || '',
          scheduledAt: slot.startTime,
          reason: dto.reason,
          notes: dto.notes,
        },
        include: {
          slot: true,
          patient: true,
        },
      });

      await this.emailService.sendAppointmentConfirmation(appointment, dto.email);

      for (const admin of adminUsers) {
        await this.emailService.send({
          to: admin.email,
          subject: `Nouveau rendez-vous: ${patient.firstName} ${patient.lastName}`,
          body: `Un nouveau rendez-vous a été pris par ${patient.firstName} ${patient.lastName}.`,
        });
      }

      return appointment;
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });
  }

  async updateAppointment(id: string, dto: UpdateAppointmentDto) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, slot: true },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (dto.status === 'CANCELLED') {
      await this.prisma.appointmentSlot.update({
        where: { id: appointment.slotId },
        data: { status: 'AVAILABLE' },
      });

      await this.emailService.sendAppointmentCancellation(
        appointment,
        appointment.patient.email,
        dto.cancellationReason,
      );
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...(dto.status && { status: dto.status as any }),
        ...(dto.cancellationReason && { cancellationReason: dto.cancellationReason }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
      },
      include: {
        slot: true,
        patient: true,
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });
  }

  async findAppointments(query: AppointmentQueryDto) {
    const where: any = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.fromDate || query.toDate) {
      where.scheduledAt = {};
      if (query.fromDate) {
        where.scheduledAt.gte = new Date(query.fromDate);
      }
      if (query.toDate) {
        where.scheduledAt.lte = new Date(query.toDate);
      }
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where,
        include: {
          slot: true,
          patient: true,
          user: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: { scheduledAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.appointment.count({ where }),
    ]);

    return { appointments, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getAppointment(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        slot: true,
        patient: true,
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }
}
