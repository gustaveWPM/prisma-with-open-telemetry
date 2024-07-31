import { setTimeout } from 'timers/promises';
import prisma from '@/db/prisma';

function randint(min: number, max: number) {
  if (min > max) [min, max] = [max, min];
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  while (true) {
    try {
      await prisma.user.findMany({ where: { foo: 'bar' } });
    } catch (error) {
      console.error(error);
    }
    await setTimeout(randint(1, 10) * 1e3);
  }
}

main();
