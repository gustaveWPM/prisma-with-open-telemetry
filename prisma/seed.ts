import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const users = [
    { foo: 'bar', bar: 1 },
    { foo: 'foo', bar: 2 },
    { foo: 'bar', bar: 3 },
    { foo: 'foo', bar: 4 },
    { foo: 'bar', bar: 5 }
  ];

  for (const user of users) await prisma.user.create({ data: user });
}

seed()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
