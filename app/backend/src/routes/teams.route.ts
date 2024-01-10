import { Router, Response, Request } from 'express';
import { TeamsController } from '../controllers';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', (_req: Request, res: Response) => teamsController.getAllTeams(_req, res));
teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default teamsRouter;
