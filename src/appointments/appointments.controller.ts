import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AppointmentsService } from './services/appointments.service';
import {
  CreateSlotDto,
  UpdateSlotDto,
  CreateAppointmentDto,
  UpdateAppointmentDto,
  SlotQueryDto,
  AppointmentQueryDto,
} from './dto/appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('slots')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MEDICAL_TEAM)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new appointment slot (admin)' })
  createSlot(@Body() dto: CreateSlotDto) {
    return this.appointmentsService.createSlot(dto);
  }

  @Patch('slots/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MEDICAL_TEAM)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an appointment slot (admin)' })
  updateSlot(@Param('id') id: string, @Body() dto: UpdateSlotDto) {
    return this.appointmentsService.updateSlot(id, dto);
  }

  @Delete('slots/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an appointment slot (admin)' })
  deleteSlot(@Param('id') id: string) {
    return this.appointmentsService.deleteSlot(id);
  }

  @Get('slots')
  @Public()
  @ApiOperation({ summary: 'List available appointment slots' })
  findSlots(@Query() query: SlotQueryDto) {
    return this.appointmentsService.findSlots(query);
  }

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Public()
  @ApiOperation({ summary: 'Book an appointment (public)' })
  createAppointment(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MEDICAL_TEAM)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all appointments (admin)' })
  findAppointments(@Query() query: AppointmentQueryDto) {
    return this.appointmentsService.findAppointments(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MEDICAL_TEAM)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get appointment details (admin)' })
  getAppointment(@Param('id') id: string) {
    return this.appointmentsService.getAppointment(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MEDICAL_TEAM)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update appointment status (admin)' })
  updateAppointment(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentsService.updateAppointment(id, dto);
  }
}
