import { Request, Response } from 'express';

import { TeamsService } from '../services';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    try {
      const { status, data } = await this.teamsService.getAllTeams();

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const { status, data } = await this.teamsService.getTeamById(id);

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
