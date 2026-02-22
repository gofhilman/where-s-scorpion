import { Router } from "express";
import {
  checkPost,
  gameGet,
  gamePatch,
  gamePost,
  leaderboardGet,
  progressGet,
  progressPatch,
} from "../controllers/indexController";
import { auth } from "../middleware/auth";

const indexRouter = Router();

indexRouter.get("/leaderboard", leaderboardGet);
indexRouter.get("/game", auth, gameGet);
indexRouter.get("/progress", auth, progressGet);

indexRouter.post("/game", gamePost);
indexRouter.post("/check", auth, checkPost);

indexRouter.patch("/game", auth, gamePatch);
indexRouter.patch("/progress", auth, progressPatch);

export default indexRouter;
