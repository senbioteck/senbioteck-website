import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './services/appointments.service';
import { EmailService } from '../common/services/email.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, EmailService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
