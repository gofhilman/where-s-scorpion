/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_boardId_fkey";

-- DropTable
DROP TABLE "Location";

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" JSONB NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToHistory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CharacterToHistory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE INDEX "_CharacterToHistory_B_index" ON "_CharacterToHistory"("B");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToHistory" ADD CONSTRAINT "_CharacterToHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToHistory" ADD CONSTRAINT "_CharacterToHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;
