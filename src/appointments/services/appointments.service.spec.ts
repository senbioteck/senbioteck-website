import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { AppointmentsService } from './services/appointments.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../common/services/email.service';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let prismaService: jest.Mocked<PrismaService>;
  let emailService: jest.Mocked<EmailService>;

  const mockSlot = {
    id: 'slot-1',
    professionalId: 'prof-1',
    startTime: new Date('2024-01-15T09:00:00Z'),
    endTime: new Date('2024-01-15T10:00:00Z'),
    status: 'AVAILABLE' as const,
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPatient = {
    id: 'patient-1',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: null,
    dateOfBirth: null,
    gender: null,
    address: null,
    emergencyContact: null,
    emergencyPhone: null,
    notes: null,
    consentGivenAt: new Date(),
    consentRevokedAt: null,
    dataRetentionDate: null,
    gdprDeletableAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const mockPrismaService = {
      appointmentSlot: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      appointment: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
        findMany: jest.fn(),
      },
      patient: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
      user: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    };

    const mockEmailService = {
      sendAppointmentConfirmation: jest.fn().mockResolvedValue(true),
      sendAppointmentCancellation: jest.fn().mockResolvedValue(true),
      send: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    prismaService = module.get(PrismaService);
    emailService = module.get(EmailService);
  });

  describe('createSlot', () => {
    it('should create a new slot successfully', async () => {
      prismaService.appointmentSlot.findFirst.mockResolvedValue(null);
      prismaService.appointmentSlot.create.mockResolvedValue(mockSlot);

      const result = await service.createSlot({
        professionalId: 'prof-1',
        startTime: '2024-01-15T09:00:00Z',
        endTime: '2024-01-15T10:00:00Z',
      });

      expect(result).toEqual(mockSlot);
    });

    it('should throw ConflictException for overlapping slot', async () => {
      prismaService.appointmentSlot.findFirst.mockResolvedValue(mockSlot);

      await expect(
        service.createSlot({
          professionalId: 'prof-1',
          startTime: '2024-01-15T09:00:00Z',
          endTime: '2024-01-15T10:00:00Z',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException for invalid time range', async () => {
      await expect(
        service.createSlot({
          professionalId: 'prof-1',
          startTime: '2024-01-15T10:00:00Z',
          endTime: '2024-01-15T09:00:00Z',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('createAppointment', () => {
    it('should create appointment for new patient', async () => {
      const mockAppointment = {
        id: 'apt-1',
        slotId: 'slot-1',
        patientId: 'patient-1',
        userId: 'user-1',
        status: 'SCHEDULED' as const,
        reason: null,
        notes: null,
        cancellationReason: null,
        scheduledAt: new Date('2024-01-15T09:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        slot: mockSlot,
        patient: mockPatient,
      };

      prismaService.appointmentSlot.findUnique.mockResolvedValue(mockSlot);
      prismaService.patient.findFirst.mockResolvedValue(null);
      prismaService.patient.create.mockResolvedValue(mockPatient);
      prismaService.user.findMany.mockResolvedValue([]);
      prismaService.appointmentSlot.update.mockResolvedValue({ ...mockSlot, status: 'BOOKED' });
      prismaService.user.findFirst.mockResolvedValue({ id: 'user-1' } as any);
      prismaService.appointment.create.mockResolvedValue(mockAppointment);

      const result = await service.createAppointment({
        slotId: 'slot-1',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
      });

      expect(result).toEqual(mockAppointment);
      expect(emailService.sendAppointmentConfirmation).toHaveBeenCalled();
    });

    it('should throw NotFoundException for non-existent slot', async () => {
      prismaService.appointmentSlot.findUnique.mockResolvedValue(null);

      await expect(
        service.createAppointment({
          slotId: 'non-existent',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException for already booked slot', async () => {
      prismaService.appointmentSlot.findUnique.mockResolvedValue({
        ...mockSlot,
        status: 'BOOKED',
      });

      await expect(
        service.createAppointment({
          slotId: 'slot-1',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('updateAppointment', () => {
    const mockAppointment = {
      id: 'apt-1',
      slotId: 'slot-1',
      patientId: 'patient-1',
      userId: 'user-1',
      status: 'SCHEDULED' as const,
      reason: null,
      notes: null,
      cancellationReason: null,
      scheduledAt: new Date('2024-01-15T09:00:00Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      slot: mockSlot,
      patient: mockPatient,
    };

    it('should cancel appointment and release slot', async () => {
      prismaService.appointment.findUnique.mockResolvedValue(mockAppointment);
      prismaService.appointmentSlot.update.mockResolvedValue({ ...mockSlot, status: 'AVAILABLE' });
      prismaService.appointment.update.mockResolvedValue({
        ...mockAppointment,
        status: 'CANCELLED',
        cancellationReason: 'Patient request',
      });

      const result = await service.updateAppointment('apt-1', {
        status: 'CANCELLED',
        cancellationReason: 'Patient request',
      });

      expect(result.status).toBe('CANCELLED');
      expect(prismaService.appointmentSlot.update).toHaveBeenCalledWith({
        where: { id: 'slot-1' },
        data: { status: 'AVAILABLE' },
      });
      expect(emailService.sendAppointmentCancellation).toHaveBeenCalled();
    });

    it('should throw NotFoundException for non-existent appointment', async () => {
      prismaService.appointment.findUnique.mockResolvedValue(null);

      await expect(
        service.updateAppointment('non-existent', { status: 'CONFIRMED' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findSlots', () => {
    it('should return paginated available slots', async () => {
      prismaService.appointmentSlot.findMany.mockResolvedValue([mockSlot]);
      prismaService.appointmentSlot.count.mockResolvedValue(1);

      const result = await service.findSlots({});

      expect(result.slots).toEqual([mockSlot]);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
    });
  });
});
