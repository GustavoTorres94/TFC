import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamsModel from '../models/teams.model';
import { TeamsService } from '../services';

import { allTeamsMock, teamByIdMock, teamsResponseFromDbMock } from './mocks/allTeams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing sevices', () => {

  afterEach(sinon.restore);

  it('testing if TeamService is returning all teams when called', async () => {
    sinon.stub(TeamsModel.prototype, 'getAllTeams').resolves(teamsResponseFromDbMock);

    const teamsService = new TeamsService();

    const { status, data } = await teamsService.getAllTeams();
    expect(status).to.be.equal(200);
    expect(data).to.be.deep.equal(allTeamsMock.data);
  });
  it('testing if TeamService is returning single team when called with id', async () => {
    sinon.stub(TeamsModel.prototype, 'getTeamById').resolves(teamByIdMock.data);

    const teamsService = new TeamsService();
    const id = '1';

    const { status, data } = await teamsService.getTeamById(id);

    expect(status).to.be.equal(200);
    expect(data).to.be.equal(teamByIdMock.data);
  });

  it('testing if TeamService is returning error when called with invalid id', async () => {
    sinon.stub(TeamsModel.prototype, 'getTeamById').resolves(null);

    const teamsService = new TeamsService();
    const id = '100';

    const { status, data } = await teamsService.getTeamById(id);

    expect(status).to.be.equal(404);
    expect(data).to.be.equal(null);
  });
});