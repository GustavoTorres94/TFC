import TeamsModel from '../models/teams.model';
import { ITeam } from '../interfaces/ITeam';

export default class TeamsService {
  constructor(
    private teamModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<{ status: number, data: ITeam[] }> {
    const teams = await this.teamModel.getAllTeams();
    return { status: 200, data: teams };
  }

  public async getTeamById(id: string): Promise<{ status: number, data: ITeam | null }> {
    const team = await this.teamModel.getTeamById(id);
    if (!team) {
      return { status: 404, data: null };
    }
    return { status: 200, data: team };
  }
}
