import { setTimeout } from 'timers/promises';
import prisma from '@/db/prisma';

async function main() {
  const batch = await prisma.user.findMany({ where: { foo: 'bar' } });

  console.log(batch);
  console.log('Waiting before exiting...');
  await setTimeout(1e4);
}

main();
