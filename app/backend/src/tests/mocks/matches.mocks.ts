export const getMatchesInProgressMock = {
    status: 200,
    data: [
        {
            id: 1,
            homeTeam: 'team1',
            awayTeam: 'team2',
            homeTeamGoals: 2,
            awayTeamGoals: 1,
            inProgress: true,
            finished: false,
            homeTeamId: 1,
            awayTeamId: 2,
        },
        {
            id: 2,
            homeTeam: 'team3',
            awayTeam: 'team4',
            homeTeamGoals: 0,
            awayTeamGoals: 0,
            inProgress: true,
            finished: false,
            homeTeamId: 1,
            awayTeamId: 2,
        },
    ],
};

export const allMatchesMock = {
    status: 200,
    data: [
        {
            id: 1,
            homeTeam: 'team1',
            awayTeam: 'team2',
            homeTeamGoals: 2,
            awayTeamGoals: 1,
            inProgress: true,
            finished: false,
            homeTeamId: 1,
            awayTeamId: 2,
        },
        {
            id: 2,
            homeTeam: 'team3',
            awayTeam: 'team4',
            homeTeamGoals: 0,
            awayTeamGoals: 0,
            inProgress: true,
            finished: false,
            homeTeamId: 1,
            awayTeamId: 2,
        },
        {
            id: 3,
            homeTeam: 'team5',
            awayTeam: 'team6',
            homeTeamGoals: 2,
            awayTeamGoals: 1,
            inProgress: false,
            finished: true,
            homeTeamId: 1,
            awayTeamId: 2,
        },
    ],
};

export const matchByIdMock = {
    status: 200,
    data: {
        id: 1,
        homeTeam: 'team1',
        awayTeam: 'team2',
        homeTeamGoals: 2,
        awayTeamGoals: 1,
        inProgress: true,
        finished: false,
        homeTeamId: 1,
        awayTeamId: 2,
    },
};

export const matchByIdNotFoundMock = {
    status: 404,
    data: null,
};

export const finishMatchMock = {
    status: 200,
    data: {
        message: 'Finished',
    },
};

export const updateMatchMock = {
    status: 200,
    data: {
        message: 'Updated',
    },
};

export const createMatchMock = {
    status: 201,
    data: {
        id: 1,
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamGoals: 2,
        awayTeamGoals: 1,
        inProgress: true,
    },
};

export const teamNotFoundErrorMock = {
    status: 404,
    data: {
        message: 'There is no team with such id!',
    },
};

export const sameTeamErrorMock = {
    status: 422,
    data: {
        message: 'It is not possible to create a match with two equal teams',
    },
};

export const internalServerErrorMock = {
    status: 500,
    data: {
        message: 'Internal Server Error',
    },
};