import TeamModel from '../database/models/teamsModel';
import { ITeam } from '../interfaces/ITeam';
import { ITeamModel } from '../interfaces/ITeamModel';

export default class TeamsModel implements ITeamModel {
  private model = TeamModel;

  public async getAllTeams(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    console.log(teams);

    return teams;
  }

  public async getTeamById(id: string): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
