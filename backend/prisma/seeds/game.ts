import { prisma } from "../../lib/prisma";
import { mkBoard, mkCharacters } from "./data";

async function main() {
  console.log("seeding...");
  const board = await prisma.board.create({
    data: mkBoard,
  });
  for (const character of mkCharacters) {
    await prisma.character.create({
      data: { boardId: board.id, ...character },
    });
  }
  console.log("done");
}

main();
