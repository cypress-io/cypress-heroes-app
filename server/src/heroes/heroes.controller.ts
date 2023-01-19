import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { Response, Request } from 'express';
import {
  HeroCreateModel,
  HeroUpdateModel,
  UserViewModel,
} from '../models/models';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../utils/get-user.decorator';

let count = 0;
@Controller('heroes')
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get()
  async getHeroes() {
    const heroes = await this.heroesService.get();
    return heroes;
  }

  @Get(':id')
  async getHero(@Param('id', ParseIntPipe) id: number) {
    const hero = await this.heroesService.getById(id);
    if (!hero) {
      throw new NotFoundException();
    }
    return hero;
  }

  @Get(':id/avatar')
  async getAvatar(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const file = await this.heroesService.getImage(id);
    if (!file) {
      res.send('');
    } else {
      res.set('Content-Type', file.contentType).send(file.image).end();
    }
  }

  @Roles('admin')
  @Post()
  async create(@Body() hero: HeroCreateModel) {
    const newHero = await this.heroesService.create(hero);
    return newHero;
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Body() hero: HeroUpdateModel,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const updatedHero = await this.heroesService.update(id, hero);
    return updatedHero;
  }

  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.heroesService.delete(id);
  }

  @Roles('user')
  @Patch(':id')
  async patch(
    @Body() hero: HeroUpdateModel,
    @GetUser() user: UserViewModel,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(count);

    if (count < 2) {
      count++;
      throw new Error('oooppsie');
    }

    if (user.isAdmin) {
      return this.heroesService.update(id, hero);
    } else {
      // regular users are only allowed to update fans and saves
      const heroToUpdate: HeroUpdateModel = {
        fans: hero.fans,
        saves: hero.saves,
      };
      return await this.heroesService.update(id, heroToUpdate);
    }
  }

  @Roles('admin')
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const hero = await this.heroesService.getById(id);
    if (!hero) {
      throw new NotFoundException();
    }

    await this.heroesService.addOrUpdateAvatar(hero, file);
    const url = `${req.protocol}://${req.get('Host')}`;
    hero.avatarUrl = `${url}/heroes/${hero.id}/avatar`;
    return { avatar: hero.avatarUrl };
  }
}
