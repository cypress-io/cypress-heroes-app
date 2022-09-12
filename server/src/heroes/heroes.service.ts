import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import {
  HeroViewModel,
  HeroUpdateModel,
  HeroCreateModel,
} from '../models/models';
import { mapper } from '../utils/mapper';
import { PrismaService } from '../utils/prisma.service';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class HeroesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async get() {
    const heroDataModels = await this.prismaService.hero.findMany({
      include: {
        powers: true,
        avatar: {
          select: {
            id: true,
          },
        },
      },
    });
    const heroes = heroDataModels.map((hero) => {
      return mapper(new HeroViewModel(), hero, (obj) => {
        if (hero.avatar?.id) {
          obj.avatarUrl = `${this.req.protocol}://${this.req.get(
            'Host',
          )}/heroes/${obj.id}/avatar`;
        }
      });
    });
    return heroes;
  }

  async getById(id: number) {
    const heroDataModel = await this.prismaService.hero.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        powers: true,
        avatar: {
          select: {
            id: true,
          },
        },
      },
    });

    const hero = mapper(new HeroViewModel(), heroDataModel, (obj) => {
      if (heroDataModel.avatar?.id) {
        obj.avatarUrl = `${this.req.protocol}://${this.req.get(
          'Host',
        )}/heroes/${obj.id}/avatar`;
      }
    });
    return hero;
  }

  async getImage(id: number) {
    const heroDataModel = await this.prismaService.hero.findUnique({
      where: {
        id,
      },
      include: {
        avatar: true,
      },
    });

    return heroDataModel.avatar;
  }

  async create(hero: HeroCreateModel) {
    const { powers, ...rest } = hero;
    const heroToCreate: Prisma.HeroCreateInput = {
      ...rest,
      powers: {
        connect: powers.map((x) => ({ id: x })),
      },
      avatar: {},
    };
    return await this.prismaService.hero.create({
      data: heroToCreate,
    });
  }

  async update(id: number, hero: HeroUpdateModel) {  
    const { powers, ...rest } = hero ;
    const heroToUpdate: Prisma.HeroUpdateInput = {
      ...rest,
      powers: {
        connect: powers?.map((x) => ({ id: x })),
      },
    };
    return await this.prismaService.hero.update({
      where: {
        id,
      },
      data: heroToUpdate,
    });
  }

  async delete(id: number) {
    await this.prismaService.avatarImage.deleteMany({
      where: {
        heroId: id,
      },
    });
    await this.prismaService.hero.deleteMany({
      where: {
        id,
      },
    });
  }

  async addOrUpdateAvatar(hero: HeroViewModel, file: Express.Multer.File) {
    if (hero.id) {
      return await this.prismaService.avatarImage.upsert({
        where: {
          heroId: hero.id,
        },
        update: {
          image: file.buffer,
          filename: file.fieldname,
          contentType: file.mimetype,
        },
        create: {
          image: file.buffer,
          filename: file.fieldname,
          contentType: file.mimetype,
          heroId: hero.id,
        },
      });
    }
  }
}
