import MatchesModel from '../database/models/matchesModel';
import TeamModel from '../database/models/teamsModel';
import { IMatches } from '../interfaces/IMatches';
import { IMatchModel } from '../interfaces/IMatchesModel';

export default class MatchModel implements IMatchModel {
  private model = MatchesModel;

  public async getAllMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: TeamModel,
          association: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          association: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  public async getMatchById(id: string): Promise<IMatches | null> {
    const match = await this.model.findByPk(id);
    return match;
  }

  public async getMatchesInProgress(value: string): Promise<IMatches[]> {
    return value === 'true'
      ? this.model.findAll({ where: { inProgress: true },
        include: [{ model: TeamModel,
          association: 'homeTeam' }, { model: TeamModel, association: 'awayTeam' }] })
      : this.model.findAll({ where: { inProgress: false },
        include: [{ model: TeamModel,
          association: 'homeTeam' }, { model: TeamModel, association: 'awayTeam' }] });
  }

  public async finishMatch(id: string): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number> {
    const insertId = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    console.log(insertId.id);
    return insertId.id;
  }
}
