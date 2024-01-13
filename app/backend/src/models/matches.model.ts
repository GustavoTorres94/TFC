import MatchesModel from '../database/models/matchesModel';
import { IMatches } from '../interfaces/IMatches';
import { IMatchModel } from '../interfaces/IMatchesModel';

export default class MatchModel implements IMatchModel {
  private model = MatchesModel;

  public async getAllMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll();
    console.log(matches);
    return matches;
  }

  public async getMatchById(id: string): Promise<IMatches | null> {
    const match = await this.model.findByPk(id);
    return match;
  }
}
