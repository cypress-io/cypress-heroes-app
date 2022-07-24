import { Injectable } from '@nestjs/common';
import { Power } from 'src/models/hero';
import { mapper } from 'src/utils/mapper';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class PowersService {
  constructor(private prismaService: PrismaService) {}

  async get() {
    const powerDataModels = await this.prismaService.power.findMany();
    const powers = powerDataModels.map(p => mapper(new Power(), p));
    return  powers;
  }
}
