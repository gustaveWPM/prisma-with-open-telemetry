import prisma from '@/db/prisma';

async function main() {
  const batch = await prisma.user.findMany({
    where: {
      foo: 'bar'
    }
  });

  console.log(batch);
}

main();
