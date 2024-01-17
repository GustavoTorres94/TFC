import LeaderBoardModel from '../models/leaderboard.model';
import { LeaderBoardMatchsType, MatchTypeDB } from '../types/generalTypes';
import LeaderBoardEntity from '../entity/leaderBoard';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel = new LeaderBoardModel(),
  ) {}

  public async homeStatus(): Promise<{ status: number, data: LeaderBoardMatchsType[] }> {
    const leaderboard = await this.leaderBoardModel.homeStatus() as unknown as MatchTypeDB;
    const filteredLeaderboard = await LeaderBoardEntity.fullFilteredStatus(leaderboard);
    return { status: 200, data: filteredLeaderboard as LeaderBoardMatchsType[] };
  }

  public async awayStatus(): Promise<{ status: number, data: LeaderBoardMatchsType[] }> {
    const leaderboard = await this.leaderBoardModel.awayStatus() as unknown as MatchTypeDB;
    const filteredLeaderboard = await LeaderBoardEntity.fullFilteredStatus(leaderboard);
    // const sorted = LeaderBoardEntity.sortLeaderboard(filteredLeaderboard);
    // console.log('SORDEEE', sorted);
    return { status: 200, data: filteredLeaderboard as LeaderBoardMatchsType[] };
  }
}
