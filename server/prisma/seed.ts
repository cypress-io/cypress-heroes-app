import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { generatePasswordHash } from '../src/utils/cypto';

const prisma = new PrismaClient();

async function main() {
  const flyingPower = await prisma.power.create({
    data: {
      name: 'Flying',
    },
  });
  const fireballPower = await prisma.power.create({
    data: {
      name: 'Fireball',
    },
  });

  const strengthPower = await prisma.power.create({
    data: {
      name: 'Super Strength',
    },
  });

  const invisibilityPower = await prisma.power.create({
    data: {
      name: 'Invisibility',
    },
  });

  const telekinesisPower = await prisma.power.create({
    data: {
      name: 'Telekinesis',
    },
  });

  const minControlPower = await prisma.power.create({
    data: {
      name: 'Mind Control',
    },
  });

  await prisma.hero.create({
    data: {
      name: 'Dr Bombo',
      // avatar: fs.readFileSync('./prisma/images/hero1.jpg').toString('base64'),
      avatar: {
        create: {
          filename: 'hero1.jpg',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero1.jpg'),
        },
      },
      price: 100,
      saves: 100,
      fans: 100,
      powers: {
        connect: [{ id: fireballPower.id }],
      },
    },
  });

  await prisma.hero.create({
    data: {
      name: 'Fly girl',
      // avatar: fs.readFileSync('./prisma/images/hero2.jpg').toString('base64'),
      avatar: {
        create: {
          filename: 'hero2.jpg',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero2.jpg'),
        },
      },
      price: 100,
      saves: 100,
      fans: 100,
      powers: {
        connect: [{ id: flyingPower.id }],
      },
    },
  });
  await prisma.hero.create({
    data: {
      name: 'Fly girl',
      // avatar: fs.readFileSync('./prisma/images/hero3.jpg').toString('base64'),
      avatar: {
        create: {
          filename: 'hero3.jpg',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero3.jpg'),
        },
      },
      price: 100,
      saves: 100,
      fans: 100,
      powers: {
        connect: [{ id: flyingPower.id }],
      },
    },
  });
  await prisma.hero.create({
    data: {
      name: 'Fly girl',
      // avatar: fs.readFileSync('./prisma/images/hero4.jpg').toString('base64'),
      avatar: {
        create: {
          filename: 'hero4.jpg',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero4.jpg'),
        },
      },
      price: 100,
      saves: 100,
      fans: 100000000,
      powers: {
        connect: [{ id: flyingPower.id }],
      },
    },
  });
  await prisma.hero.create({
    data: {
      name: 'Fly girl',
      // avatar: fs.readFileSync('./prisma/images/hero5.jpg').toString('base64'),
      avatar: {
        create: {
          filename: 'hero5.jpg',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero5.jpg'),
        },
      },
      price: 100,
      saves: 100,
      fans: 100,
      powers: {
        connect: [{ id: flyingPower.id }],
      },
    },
  });
  await prisma.hero.create({
    data: {
      name: 'Fly girl',
      // avatar: fs.readFileSync('./prisma/images/hero6.jpg').toString('base64'),
      avatar: {
        create: {
          filename: 'hero6.jpg',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero6.jpg'),
        },
      },
      price: 100,
      saves: 100,
      fans: 100,
      powers: {
        connect: [{ id: flyingPower.id }],
      },
    },
  });
  await prisma.hero.create({
    data: {
      name: 'Fly girl',
      // avatar: fs.readFileSync('./prisma/images/hero7.jpg').toString('base64'),
      avatar: {
        create: {
          filename: 'hero7.jpg',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero7.jpg'),
        },
      },
      price: 100,
      saves: 100,
      fans: 100,
      powers: {
        connect: [{ id: flyingPower.id }],
      },
    },
  });

  ///Users

  await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: await generatePasswordHash('test123'),
      isAdmin: false,
    },
  });

  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      password: await generatePasswordHash('test123'),
      isAdmin: true,
    },
  });
}

main();
