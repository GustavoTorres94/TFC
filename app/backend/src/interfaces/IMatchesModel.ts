import { IMatches } from './IMatches';

export interface IMatchModel {
  getAllMatches(): Promise<IMatches[]>;
  getMatchById(id: string): Promise<IMatches | null>;
  getMatchesInProgress(value: string): Promise<IMatches[]>;
  finishMatch(id: string): Promise<void>;
  updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
  createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number>;
}
