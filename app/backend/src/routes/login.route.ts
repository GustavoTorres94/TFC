import { Router, Response, Request } from 'express';
import { LoginController } from '../controllers';

const loginRouter = Router();

const logController = new LoginController();

loginRouter.post('/', (req: Request, res: Response) => logController.login(req, res));

export default loginRouter;
