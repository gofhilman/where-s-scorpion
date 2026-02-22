import { getRandomChars } from "../generated/prisma/sql";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

const LEADERBOARD_PLAYER_NUM = 50;

async function leaderboardGet(req: any, res: any) {
  const leaderboard = await prisma.history.findMany({
    orderBy: { duration: "asc" },
    take: LEADERBOARD_PLAYER_NUM,
    select: {
      id: true,
      playerName: true,
      duration: true,
      finishedAt: true,
    },
    where: {
      duration: { not: null },
    },
  });
  res.json({ leaderboard });
}

async function gameGet(req: any, res: any) {
  const game = await prisma.history.findUnique({
    where: { id: req.user.id },
    select: {
      board: true,
      characters: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  res.json({ game });
}

async function progressGet(req: any, res: any) {
  const progress = await prisma.history.findUnique({
    where: { id: req.user.id },
    select: {
      progress: {
        select: {
          id: true,
          location: true,
          characterId: true,
        },
      },
    },
  });
  res.json({ progress });
}

async function gamePost(req: any, res: any) {
  const id = crypto.randomUUID();
  const board = await prisma.board.findFirst({
    select: { id: true },
  });
  const boardId: any = board?.id;
  const characters = await prisma.$queryRawTyped(getRandomChars());
  await prisma.history.create({
    data: {
      id,
      boardId,
      characters: {
        connect: characters,
      },
    },
  });
  jwt.sign(
    { sub: id },
    process.env.JWT_SECRET ??
      (() => {
        throw new Error("JWT_SECRET missing");
      })(),
    { expiresIn: "1 day" },
    (err, token) => {
      res.json({ token });
    },
  );
}

async function checkPost(req: any, res: any) {}

async function gamePatch(req: any, res: any) {}

async function progressPatch(req: any, res: any) {}

export {
  leaderboardGet,
  gameGet,
  progressGet,
  gamePost,
  checkPost,
  gamePatch,
  progressPatch,
};
