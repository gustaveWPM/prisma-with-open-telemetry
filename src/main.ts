import prisma, { prismaTelemetry } from '@/db/prisma';
import { setTimeout } from 'timers/promises';

function randint(min: number, max: number) {
  if (min > max) [min, max] = [max, min];
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  while (true) {
    const span = prismaTelemetry.startSpan('fetch_users');
    try {
      await prisma.user.findMany({ where: { foo: 'bar' } });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      span.end();
    }
    await setTimeout(randint(1, 10) * 1e3);
  }
}

main();
