import { Injectable } from '@nestjs/common';
import { PowerViewModel } from 'src/models/models';
import { mapper } from 'src/utils/mapper';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class PowersService {
  constructor(private prismaService: PrismaService) {}

  async get() {
    const powerDataModels = await this.prismaService.power.findMany();
    const powers = powerDataModels.map(p => mapper(new PowerViewModel(), p));
    return  powers;
  }
}
