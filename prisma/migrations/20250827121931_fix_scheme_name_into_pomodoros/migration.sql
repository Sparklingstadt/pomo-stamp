/*
  Warnings:

  - You are about to drop the `Pomodoro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Pomodoro";

-- CreateTable
CREATE TABLE "pomodoros" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "pomodoros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pomodoros_uuid_key" ON "pomodoros"("uuid");
