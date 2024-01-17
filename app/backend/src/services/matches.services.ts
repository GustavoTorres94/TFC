import MatchModel from '../models/matches.model';
import TeamsModel from '../database/models/teamsModel';
import { IMatches } from '../interfaces/IMatches';
import { CreatedMatchType, MatchErrorsType, InternalErrorType } from '../types/generalTypes';

export default class MatchesService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<{ status: number, data: IMatches[] | InternalErrorType }> {
    const matches = await this.matchModel.getAllMatches();
    return { status: 200, data: matches };
  }

  public async getMatchById(id: string): Promise<{ status: number, data: IMatches | null }> {
    const match = await this.matchModel.getMatchById(id);
    if (!match) {
      return { status: 404, data: null };
    }
    return { status: 200, data: match };
  }

  public async getMatchesInProgress(value: string)
    : Promise<{ status: number, data: IMatches[] | InternalErrorType }> {
    const matches = await this.matchModel.getMatchesInProgress(value);
    return { status: 200, data: matches };
  }

  public async finishMatch(id: string)
    :Promise<{ status: number, data: { message: string } | null }> {
    const match = await this.matchModel.getMatchById(id);
    if (!match) {
      return { status: 404, data: null };
    }
    await this.matchModel.finishMatch(id);
    return { status: 200, data: { message: 'Finished' } };
  }

  public async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number)
    :Promise<{ status: number, data: { message: string } | null }> {
    await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 200, data: { message: 'Updated' } };
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ):Promise<{ status: number, data: CreatedMatchType | MatchErrorsType }> {
    const id = await this.matchModel
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    const homeTeam = await TeamsModel.findByPk(homeTeamId);
    const awayTeam = await TeamsModel.findByPk(awayTeamId);
    if (!homeTeam?.dataValues.teamName || !awayTeam?.dataValues.teamName) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }
    if (homeTeamId === awayTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const obj = { id, homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true };
    return { status: 201, data: obj };
  }
}
