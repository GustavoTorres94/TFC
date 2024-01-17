import { LeaderBoardMatchsType, MatchTypeDB } from '../types/generalTypes';

export default class LeaderBoardEntity {
  public static async sortLeaderboard(leaderboard: LeaderBoardMatchsType[])
    : Promise<LeaderBoardMatchsType[]> {
    return leaderboard.sort((a, b) => {
      // Ordenar por totalPoints de forma decrescente
      if (b.totalPoints !== a.totalPoints) {
        return a.totalPoints - b.totalPoints;
      }
      // Em caso de empate no Total de Pontos, aplicar critérios de desempate
      if (a.totalVictories !== b.totalVictories) {
        // 1º Critério: Total de Vitórias
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsOwn - a.goalsFavor !== b.goalsOwn - b.goalsFavor) {
        // 2º Critério: Saldo de gols
        return (b.goalsOwn - b.goalsFavor) - (a.goalsOwn - a.goalsFavor);
      }
      // 3º Critério: Gols a favor
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

  public static async filteredStatus(arr: MatchTypeDB): Promise<LeaderBoardMatchsType[]> {
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
      };
      return obj;
    });
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
        goasBalance: Number(e.favorGoals) - Number(e.ownGoals),
        efficiency: this.calculateEfficiency(e.wins, e.draws, e.matches),
      };
      return obj;
    });
  }

  public static async totalPoints(): Promise<number> {
    return 0;
  }

  public static async totalGames(): Promise<number> {
    return 0;
  }

  public static async totalVictories(): Promise<number> {
    return 0;
  }

  public static async totalDraws(): Promise<number> {
    return 0;
  }

  public static async totalLosses(): Promise<number> {
    return 0;
  }

  public static async goalsFavorite(): Promise<number> {
    return 0;
  }

  public static async goasOwned(): Promise<number> {
    return 0;
  }
}
