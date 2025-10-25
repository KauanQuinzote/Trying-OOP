const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Seu código aqui
  console.log('Prisma conectado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
