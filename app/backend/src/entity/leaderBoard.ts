import {
  LeaderBoardMatchsType,
  MatchTypeDB,
  SortedLeaderboardType,
  MatchTypeReturn,
} from '../types/generalTypes';

export default class LeaderBoardEntity {
  public static async sortLeaderboard(leaderboard: SortedLeaderboardType[] | MatchTypeReturn[])
    : Promise<SortedLeaderboardType[] | MatchTypeReturn[]> {
    return leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
  }

  public static calculateEfficiency(
    points: number,
    draws:number,
    matches: number,
  ): number {
    const totalPoints = (3 * points) + draws;
    const efficiency = (totalPoints / (matches * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  public static async fullFilteredStatus(arr: MatchTypeDB)
    : Promise<LeaderBoardMatchsType[]> {
    return arr.map((e) => {
      const obj = {
        name: e.teamName,
        totalPoints: (3 * Number(e.wins)) + Number(e.draws),
        totalGames: e.matches,
        totalVictories: Number(e.wins),
        totalDraws: Number(e.draws),
        totalLosses: Number(e.loss),
        goalsFavor: Number(e.favorGoals),
        goalsOwn: Number(e.ownGoals),
        goalsBalance: Number(e.favorGoals) - Number(e.ownGoals),
        efficiency: this.calculateEfficiency(Number(e.wins), Number(e.draws), Number(e.matches)),
      };
      return obj;
    });
  }

  public static combine(home: SortedLeaderboardType, away: SortedLeaderboardType): MatchTypeReturn {
    if (away) {
      return {
        name: home.name,
        totalPoints: home.totalPoints + away.totalPoints,
        totalGames: home.totalGames + away.totalGames,
        totalVictories: home.totalVictories + away.totalVictories,
        totalDraws: home.totalDraws + away.totalDraws,
        totalLosses: home.totalLosses + away.totalLosses,
        goalsFavor: home.goalsFavor + away.goalsFavor,
        goalsOwn: home.goalsOwn + away.goalsOwn,
        goalsBalance: home.goalsBalance + away.goalsBalance,
        efficiency: this.calculateEfficiency(
          home.totalVictories + away.totalVictories,
          home.totalDraws + away.totalDraws,
          home.totalGames + away.totalGames,
        ),
      };
    } return { ...home };
  }

  public static async combineLeaderboard(
    homeLeaderboard: SortedLeaderboardType[],
    awayLeaderboard: SortedLeaderboardType[],
  ): Promise<MatchTypeReturn[]> {
    const combinedLeaderboard = homeLeaderboard.map((home) => {
      const findAway = awayLeaderboard.find((a) => a.name === home.name);
      return this.combine(home, findAway as SortedLeaderboardType);
    });
    return combinedLeaderboard;
  }
}
