import { ITeam } from './ITeam';

export interface ITeamModel {
  getAllTeams(): Promise<ITeam[]>;
  getTeamById(id: string): Promise<ITeam | null>;
}
