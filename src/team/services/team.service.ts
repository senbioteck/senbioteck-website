import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto, TeamMemberQueryDto } from '../dto/team.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateTeamMemberDto) {
    const member = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    return this.prisma.teamMember.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const member = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    return this.prisma.teamMember.delete({ where: { id } });
  }

  async findAll(query: TeamMemberQueryDto) {
    const where: any = {};
    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }
    if (query.department) {
      where.department = query.department;
    }

    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const [members, total] = await Promise.all([
      this.prisma.teamMember.findMany({
        where,
        orderBy: { displayOrder: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.teamMember.count({ where }),
    ]);

    return { members, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findPublic() {
    return this.prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const member = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException('Team member not found');
    }
    return member;
  }
}
