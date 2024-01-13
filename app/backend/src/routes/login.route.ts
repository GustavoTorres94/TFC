import { Router, Response, Request } from 'express';
import { LoginController } from '../controllers';
import validateToken from '../middlewares/validateToken';

const loginRouter = Router();

const logController = new LoginController();

loginRouter.post('/', (req: Request, res: Response) => logController.login(req, res));
loginRouter.get(
  '/role',
  validateToken,
  (req: Request, res: Response) => logController.getRole(req, res),
);

export default loginRouter;
