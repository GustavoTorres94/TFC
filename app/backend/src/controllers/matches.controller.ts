import { Request, Response } from 'express';

import { MatchesService } from '../services';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getMatchesInProgress(req: Request, res: Response): Promise<Response> {
    try {
      const inProgress = req.query.inProgress as string;
      const { status, data } = await this.matchesService.getMatchesInProgress(inProgress);

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    try {
      const inProgress = req.query.inProgress as string;
      if (inProgress) {
        return await this.getMatchesInProgress(req, res);
      }
      const { status, data } = await this.matchesService.getAllMatches();

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async getMatchById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status, data } = await this.matchesService.getMatchById(id);

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status, data } = await this.matchesService.finishMatch(id);

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { status, data } = await this.matchesService
        .updateMatch(id, homeTeamGoals, awayTeamGoals);

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const { status, data } = await this.matchesService
        .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
