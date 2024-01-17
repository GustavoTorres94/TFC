import { Router, Response, Request } from 'express';
import { LeaderBoardController } from '../controllers';

const leaderboardRouter = Router();

const leaderBoardController = new LeaderBoardController();

leaderboardRouter.get('/home', (_req: Request, res: Response) =>
  leaderBoardController.homeStatus(_req, res));

leaderboardRouter.get('/away', (_req: Request, res: Response) =>
  leaderBoardController.awayStatus(_req, res));

export default leaderboardRouter;
