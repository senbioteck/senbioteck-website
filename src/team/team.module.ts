import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './services/team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
