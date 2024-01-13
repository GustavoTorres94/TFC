import { IMatches } from './IMatches';

export interface IMatchModel {
  getAllMatches(): Promise<IMatches[]>;
  getMatchById(id: string): Promise<IMatches | null>;
}
