import { differenceInMilliseconds } from "date-fns";
import { getRandomChars } from "../generated/prisma/sql";
import checkPosition from "../lib/checkPosition";
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

async function statusGet(req: any, res: any) {
  const status = await prisma.history.findUnique({
    where: { id: req.user.id },
    include: {
      tasks: true,
      progress: true,
    },
  });
  res.json({ status });
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
      tasks: {
        create: characters.map((character) => ({
          boardId,
          characterId: character.id,
        })),
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

async function gamePatch(req: any, res: any) {
  const game = await prisma.history.update({
    where: { id: req.user.id },
    data: { playerName: req.body.name },
  });
  res.json({ game });
}

async function statusPatch(req: any, res: any) {
  const { position, characterId } = req.body;
  const game = await prisma.history.findUnique({
    where: { id: req.user.id },
    include: {
      tasks: {
        include: { character: true },
      },
      progress: true,
    },
  });
  const characters = game?.tasks.map((task) => task.character);
  const character = checkPosition(characters, position);
  if (character && game) {
    let status = await prisma.history.update({
      where: { id: req.user.id },
      data: {
        tasks: {
          delete: game.tasks
            .filter((task) => task.characterId === characterId)
            .map((task) => ({ id: task.id })),
        },
        progress: {
          create: { boardId: game.boardId, position, characterId },
        },
      },
      include: {
        tasks: true,
        progress: true,
      },
    });
    if (status.tasks.length === 0) {
      status = await prisma.history.update({
        where: { id: req.user.id },
        data: {
          finishedAt: new Date(),
          duration: differenceInMilliseconds(new Date(), game.startedAt),
        },
        include: {
          tasks: true,
          progress: true,
        },
      });
      return res.json({ status });
    }
    return res.json({ status });
  } else {
    return res.json({
      status: {
        ...game,
        tasks: game?.tasks.map((task) => ({
          id: task.id,
          historyId: task.historyId,
          boardId: task.boardId,
          characterId: task.characterId,
        })),
      },
    });
  }
}

export { leaderboardGet, gameGet, statusGet, gamePost, gamePatch, statusPatch };
