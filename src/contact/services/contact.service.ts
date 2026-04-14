import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../common/services/email.service';
import { SubmitContactDto, UpdateContactMessageDto, ContactQueryDto } from '../dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async submit(dto: SubmitContactDto) {
    const message = await this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        subject: dto.subject,
        message: dto.message,
      },
    });

    const adminUsers = await this.prisma.user.findMany({
      where: { role: 'ADMIN', emailNotifications: true },
    });

    const notificationBody = `
      <h1>Nouveau message de contact</h1>
      <p><strong>Nom:</strong> ${dto.name}</p>
      <p><strong>Email:</strong> ${dto.email}</p>
      <p><strong>Téléphone:</strong> ${dto.phone || 'Non renseigné'}</p>
      <p><strong>Sujet:</strong> ${dto.subject || 'Non renseigné'}</p>
      <p><strong>Message:</strong></p>
      <p>${dto.message.replace(/\n/g, '<br>')}</p>
    `;

    for (const admin of adminUsers) {
      await this.emailService.send({
        to: admin.email,
        subject: `[Contact] ${dto.subject || 'Nouveau message'} - ${dto.name}`,
        body: notificationBody,
      });
    }

    return {
      id: message.id,
      createdAt: message.createdAt,
    };
  }

  async findAll(query: ContactQueryDto) {
    const where: any = {};
    if (query.isRead !== undefined) {
      where.isRead = query.isRead;
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      this.prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.contactMessage.count({ where }),
    ]);

    return { messages, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const message = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      throw new NotFoundException('Contact message not found');
    }
    return message;
  }

  async update(id: string, dto: UpdateContactMessageDto) {
    const message = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      throw new NotFoundException('Contact message not found');
    }

    const data: any = { ...dto };
    if (dto.isReplied && !message.isReplied) {
      data.repliedAt = new Date();
    }

    return this.prisma.contactMessage.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const message = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      throw new NotFoundException('Contact message not found');
    }

    return this.prisma.contactMessage.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async markAsRead(id: string) {
    return this.update(id, { isRead: true });
  }

  async getStats() {
    const [total, unread, replied] = await Promise.all([
      this.prisma.contactMessage.count({ where: { deletedAt: null } }),
      this.prisma.contactMessage.count({ where: { isRead: false, deletedAt: null } }),
      this.prisma.contactMessage.count({ where: { isReplied: true, deletedAt: null } }),
    ]);

    return { total, unread, replied };
  }
}
