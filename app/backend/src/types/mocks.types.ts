import { ITeam } from '../interfaces/ITeam';

export type allTeamsType = {
  status: number;
  data: ITeam[];
};

export type teamByIdType = {
  status: number;
  data: ITeam | null;
};

export type teamErrorType = {
  status: number;
  data: null;
};
