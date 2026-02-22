import { Router } from "express";
import {
  gameGet,
  gamePatch,
  gamePost,
  leaderboardGet,
  statusGet,
  statusPatch,
} from "../controllers/indexController";
import { auth } from "../middleware/auth";

const indexRouter = Router();

indexRouter.get("/leaderboard", leaderboardGet);
indexRouter.get("/game", auth, gameGet);
indexRouter.get("/status", auth, statusGet);

indexRouter.post("/game", gamePost);

indexRouter.patch("/game", auth, gamePatch);
indexRouter.patch("/status", auth, statusPatch);

export default indexRouter;
