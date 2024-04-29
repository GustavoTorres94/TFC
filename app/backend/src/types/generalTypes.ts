export type TokenType = {
  token: string;
};

export type UserErrors = {
  status: number;
  data: { message: string };
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserSuccess = {
  status: number;
  data: { token: string };
};

export type UserRole = {
  status: number;
  data: { role: string };
};

export type DecodedType = {
  id: string;
};

export type InternalErrorType = {
  message: string;
};

export type CreatedMatchType = {
  id: number,
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

export type MatchErrorsType = {
  message: string,
};

export type MatchTypeDB = {
  teamName: string,
  ownGoals: number,
  favorGoals: number,
  loss: number,
  matches: number,
  draws: number,
  wins: number,
  map: (arg0: (e: any) => {
    name: any;
    totalPoints: number;
    totalGames: any;
    totalVictories: number;
    totalDraws: number;
    totalLosses: number;
    goalsFavor: number;
    goalsOwn: number;
  }) => any;
};

export type LeaderBoardMatchsType = {
  teamName: string,
  ownGoals: number,
  favorGoals: number,
  loss: number,
  matches: number,
  draws: number,
  wins: number;
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
};

export type SortedLeaderboardType = {
  teamName: string,
  ownGoals: number,
  favorGoals: number,
  loss: number,
  matches: number,
  draws: number,
  wins: number;
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

export type MatchTypeReturn = {
  efficiency: number;
  goalsBalance: number;
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
};
