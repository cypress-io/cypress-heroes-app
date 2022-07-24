import {
  AvatarImage,
  Hero as HeroDataModel,
  Power as PowerDataModel,
} from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Hero implements HeroDataModel {
  id: number;
  name: string;
  price: number;
  saves: number;
  fans: number;
  createdAt: Date;
  updatedAt: Date;
  powers: Power[];
  avatar: AvatarImage;
}

class HeroExcludedFields
  implements Pick<Hero, | 'createdAt' | 'updatedAt'>
{
  @Exclude()
  avatar: AvatarImage;
  @Exclude()
  createdAt;
  @Exclude()
  updatedAt;
}

export class HeroViewModel extends HeroExcludedFields implements Hero {
  id: number;
  name: string;
  avatarUrl: string;
  price: number;
  saves: number;
  fans: number;
  powers: Power[];
}
export class HeroEditModel
  implements Omit<Hero, 'avatar' | 'avatarUrl' | 'createdAt' | 'updatedAt' | 'id' | 'powers'>
{
  id?: number;
  name: string;
  price: number;
  powers: number[];
  saves: number;
  fans: number;
}

export class Power implements Omit<PowerDataModel, 'heroId'> {
  id: number;
  name: string;
}
