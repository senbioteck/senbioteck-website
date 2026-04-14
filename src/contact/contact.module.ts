import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './services/contact.service';
import { EmailService } from '../common/services/email.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, EmailService],
  exports: [ContactService],
})
export class ContactModule {}
