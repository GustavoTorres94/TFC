import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamModel from '../database/models/teamsModel';
import TeamsModel from '../models/teams.model';

import { allTeamsMock, teamByIdMock, teamsResponseFromDbMock } from './mocks/allTeams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing model', () => {
  afterEach(sinon.restore);

  // it.only('testing if TeamModel is returning expected values', async () => {
  //   sinon.stub(TeamModel, 'findAll').resolves(teamsResponseFromDbMock);
  //   const teamsModel = new TeamsModel();
  //   const teams = await teamsModel.getAllTeams();
  //   // const teamsData = teams.map((team) => team.dataValues);
  //   // console.log(teamsData);
  
  //   expect(teams).to.be.deep.equal(allTeamsMock.data);
  // });
  it('testing if TeamModel is returning expected values when searching for single team', async () => {
    const teamData = { dataValues: teamsResponseFromDbMock[0] };
    console.log(teamData);
    const teamModelInstance = new TeamModel();
    Object.assign(teamModelInstance, teamData);

    sinon.stub(TeamModel, 'findByPk').resolves(teamModelInstance);

    const teamsModel = new TeamsModel();
    await teamsModel.getTeamById('1');

    expect(teamData.dataValues).to.be.deep.equal(teamByIdMock.data);
  });
});