import { QueryTypes } from 'sequelize';
import MatchesModel from '../database/models/matchesModel';
import TeamModel from '../database/models/teamsModel';
import { homeStatusQuery, awayStatusQuery } from '../entity/sequelize';
import { LeaderBoardMatchsType } from '../types/generalTypes';
// import { IMatches } from '../interfaces/IMatches';

export default class LeaderBoardModel {
  private model = MatchesModel;
  private teamModel = TeamModel;

  public async homeStatus(): Promise<LeaderBoardMatchsType[]> {
    const homeTeam = await this.model
      .sequelize?.query(homeStatusQuery, { type: QueryTypes.SELECT });
    console.log('HOME', homeTeam);
    return homeTeam as LeaderBoardMatchsType[];
  }

  public async awayStatus(): Promise<LeaderBoardMatchsType[]> {
    const awayTeam = await this.model
      .sequelize?.query(awayStatusQuery, { type: QueryTypes.SELECT });
    console.log('AWAY', awayTeam);
    return awayTeam as LeaderBoardMatchsType[];
  }
}
