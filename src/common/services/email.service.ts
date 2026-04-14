import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  userId?: string;
}

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async send(options: EmailOptions): Promise<boolean> {
    try {
      const apiKey = this.configService.get<string>('RESEND_API_KEY');
      if (!apiKey) {
        console.warn('RESEND_API_KEY not configured, email not sent');
        await this.logEmail({ ...options, status: 'SKIPPED_NO_API' });
        return false;
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.configService.get<string>('EMAIL_FROM') || 'onboarding@resend.dev',
          to: options.to,
          subject: options.subject,
          html: options.body,
        }),
      });

      if (response.ok) {
        await this.logEmail({ ...options, status: 'SENT' });
        return true;
      } else {
        const error = await response.text();
        await this.logEmail({ ...options, status: 'FAILED', error });
        return false;
      }
    } catch (error) {
      await this.logEmail({ ...options, status: 'ERROR', error: String(error) });
      return false;
    }
  }

  private async logEmail(options: EmailOptions & { status: string; error?: string }) {
    try {
      await this.prisma.emailLog.create({
        data: {
          userId: options.userId,
          recipient: options.to,
          subject: options.subject,
          body: options.body,
          status: options.status,
          error: options.error,
        },
      });
    } catch (e) {
      console.error('Failed to log email:', e);
    }
  }

  async sendAppointmentConfirmation(appointment: any, patientEmail: string) {
    const subject = 'Confirmation de votre rendez-vous - Senbioteck';
    const body = `
      <h1>Confirmation de rendez-vous</h1>
      <p>Bonjour ${appointment.patient.firstName},</p>
      <p>Votre rendez-vous a été confirmé pour le ${new Date(appointment.scheduledAt).toLocaleDateString('fr-FR')} à ${new Date(appointment.scheduledAt).toLocaleTimeString('fr-FR')}.</p>
      <p>Motif: ${appointment.reason || 'Non spécifié'}</p>
      <p>Merci de votre confiance.</p>
      <p>L'équipe Senbioteck</p>
    `;
    return this.send({ to: patientEmail, subject, body });
  }

  async sendAppointmentCancellation(appointment: any, patientEmail: string, reason?: string) {
    const subject = 'Annulation de votre rendez-vous - Senbioteck';
    const body = `
      <h1>Annulation de rendez-vous</h1>
      <p>Bonjour ${appointment.patient.firstName},</p>
      <p>Votre rendez-vous prévu le ${new Date(appointment.scheduledAt).toLocaleDateString('fr-FR')} a été annulé.</p>
      ${reason ? `<p>Raison: ${reason}</p>` : ''}
      <p>Pour prendre un nouveau rendez-vous, veuillez nous contacter.</p>
      <p>L'équipe Senbioteck</p>
    `;
    return this.send({ to: patientEmail, subject, body });
  }
}
