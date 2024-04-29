import LeaderBoardModel from '../models/leaderboard.model';
import { MatchTypeDB, MatchTypeReturn, SortedLeaderboardType } from '../types/generalTypes';
import LeaderBoardEntity from '../entity/leaderBoard';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel = new LeaderBoardModel(),
  ) {}

  public async homeStatus(): Promise<{ status: number, data: SortedLeaderboardType[] }> {
    const leaderboard = await this.leaderBoardModel.homeStatus() as unknown as MatchTypeDB;
    const filteredLeaderboard = await LeaderBoardEntity
      .fullFilteredStatus(leaderboard) as unknown as SortedLeaderboardType[];
    const sortedLeaderboard = await LeaderBoardEntity.sortLeaderboard(filteredLeaderboard);
    return { status: 200, data: sortedLeaderboard as SortedLeaderboardType[] };
  }

  public async awayStatus(): Promise<{
    status: number,
    data: SortedLeaderboardType[] | MatchTypeReturn[] }> {
    const leaderboard = await this.leaderBoardModel.awayStatus() as unknown as MatchTypeDB;
    const filteredLeaderboard = await LeaderBoardEntity
      .fullFilteredStatus(leaderboard) as unknown as SortedLeaderboardType[];
    const sortedLeaderboard = await LeaderBoardEntity.sortLeaderboard(filteredLeaderboard);
    return { status: 200, data: sortedLeaderboard };
  }

  public async status(): Promise<{
    status: number,
    data: SortedLeaderboardType[] | MatchTypeReturn[]
  }> {
    const homeStatus = await this.leaderBoardModel.homeStatus() as unknown as MatchTypeDB;
    const awayStatus = await this.leaderBoardModel.awayStatus() as unknown as MatchTypeDB;
    const homeLeaderboard = await LeaderBoardEntity.fullFilteredStatus(homeStatus);
    const awayLeaderboard = await LeaderBoardEntity.fullFilteredStatus(awayStatus);
    const filteredLeaderboard = await LeaderBoardEntity.combineLeaderboard(
      homeLeaderboard as unknown as SortedLeaderboardType[],
      awayLeaderboard as unknown as SortedLeaderboardType[],
    );
    const sortedLeaderboard = await LeaderBoardEntity.sortLeaderboard(filteredLeaderboard);
    return { status: 200, data: sortedLeaderboard };
  }
}
