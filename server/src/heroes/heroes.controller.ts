import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { instanceToPlain } from 'class-transformer';
import { Response, Request } from 'express';
import { HeroEditModel } from 'src/models/hero';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('heroes')
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get()
  async getHeroes() {
    const heroes = await this.heroesService.get();
    return instanceToPlain(heroes);
  }

  @Get(':id')
  async getHero(@Param('id', ParseIntPipe) id: number) {
    const hero = await this.heroesService.getById(id);
    if (!hero) {
      throw new NotFoundException();
    }
    return instanceToPlain(hero);
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

  @Post()
  async create(@Body() hero: HeroEditModel) {
    const newHero = await this.heroesService.create(hero);
    return instanceToPlain(newHero);
  }

  @Put(':id')
  async update(
    @Body() hero: HeroEditModel,
    @Param('id', ParseIntPipe) id: number,
  ) {
    hero.id = id;
    const updatedHero = await this.heroesService.update(hero);
    return instanceToPlain(updatedHero);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.heroesService.delete(id);
  }

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
