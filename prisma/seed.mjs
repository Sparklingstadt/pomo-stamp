import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.pomodoro.createMany({
    data: [
      {
        uuid: crypto.randomUUID(),
        task: "Sample Task",
        memo: "memo",
        month: 7,
        day: 27,
      }
    ]
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
