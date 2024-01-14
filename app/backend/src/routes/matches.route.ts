import { Router, Response, Request } from 'express';
import { MatchesController } from '../controllers';
import validateToken from '../middlewares/validateToken';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get(
  '/',
  (_req: Request, res: Response) => matchesController.getAllMatches(_req, res),
);
matchesRouter.patch(
  '/:id/finish',
  validateToken,
  (_req: Request, res: Response) => matchesController.finishMatch(_req, res),
);
matchesRouter.patch(
  '/:id',
  validateToken,
  (_req: Request, res: Response) => matchesController.updateMatch(_req, res),
);
matchesRouter.post(
  '/',
  validateToken,
  (_req: Request, res: Response) => matchesController.createMatch(_req, res),
);

export default matchesRouter;
