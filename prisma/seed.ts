import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const currentUsers = await prisma.user.findMany();
  if (currentUsers.length > 0) return;

  const users = [
    { foo: 'bar', bar: 1 },
    { foo: 'foo', bar: 2 },
    { foo: 'bar', bar: 3 },
    { foo: 'foo', bar: 4 },
    { foo: 'bar', bar: 5 }
  ];

  for (const user of users) await prisma.user.create({ data: user });
}

let __exitCode = 0;

try {
  await seed();
} catch (e) {
  console.error(e);
  __exitCode = 1;
} finally {
  await prisma.$disconnect();
  process.exit(__exitCode);
}
