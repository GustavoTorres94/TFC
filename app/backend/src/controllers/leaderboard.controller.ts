import { Request, Response } from 'express';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(
    private leaderboardService = new LeaderBoardService(),
  ) {}

  public async homeStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { status, data } = await this.leaderboardService.homeStatus();

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async awayStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { status, data } = await this.leaderboardService.awayStatus();

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
