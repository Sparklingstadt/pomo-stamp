import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const pomodoros = await prisma.pomodoro.findMany();
  console.log(pomodoros);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
