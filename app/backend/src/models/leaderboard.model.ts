import { QueryTypes } from 'sequelize';
import MatchesModel from '../database/models/matchesModel';
import { homeStatusQuery, awayStatusQuery } from '../entity/sequelize';
import { LeaderBoardMatchsType } from '../types/generalTypes';

export default class LeaderBoardModel {
  private model = MatchesModel;

  public async homeStatus(): Promise<LeaderBoardMatchsType[]> {
    const homeTeam = await this.model
      .sequelize?.query(homeStatusQuery, { type: QueryTypes.SELECT });
    return homeTeam as LeaderBoardMatchsType[];
  }

  public async awayStatus(): Promise<LeaderBoardMatchsType[]> {
    const awayTeam = await this.model
      .sequelize?.query(awayStatusQuery, { type: QueryTypes.SELECT });
    return awayTeam as LeaderBoardMatchsType[];
  }
}
