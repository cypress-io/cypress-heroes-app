import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesController } from './heroes/heroes.controller';
import { HeroesService } from './heroes/heroes.service';
import { PrismaService } from './utils/prisma.service';
import { PowersService } from './powers/powers.service';
import { PowersController } from './powers/powers.controller';

@Module({
  imports: [],
  controllers: [AppController, HeroesController, PowersController],
  providers: [AppService, HeroesService, PrismaService, {
    provide: APP_PIPE,
    useClass: ValidationPipe
  }, PowersService],
})
export class AppModule {}
