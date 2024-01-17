import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { MatchesService } from '../services';
import TeamModel from '../database/models/teamsModel';
import { MatchesController } from '../controllers';
import {
  getMatchesInProgressMock,
  allMatchesMock,
  matchByIdMock,
  matchByIdNotFoundMock,
  finishMatchMock,
  updateMatchMock,
  createMatchMock,
  teamNotFoundErrorMock,
  sameTeamErrorMock,
  internalServerErrorMock,
} from './mocks/matches.mocks';

import { app } from '../app';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing matches controller', () => {
  let chaiHttpResponse: Response;
  const res = {} as Response;
  const req = {} as Request;
  
  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  let verifyStub: sinon.SinonStub;

  beforeEach(() => {
    verifyStub = sinon.stub();
    sinon.replace(jwt, 'verify', verifyStub);
  });
  
  afterEach(sinon.restore);

  it('testing if MatchesController.getMatchesInProgress is returning success when called propoerly', async () => {
    sinon.stub(MatchesService.prototype, 'getMatchesInProgress').resolves(getMatchesInProgressMock);

    let chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(getMatchesInProgressMock.data);
  });

  it('testing getAllMatches', async () => {
    sinon.stub(MatchesService.prototype, 'getAllMatches').resolves(allMatchesMock);

    let chaiHttpResponse = await chai
    .request(app)
    .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatchesMock.data);
  });

  it('testing getMatchById', async () => {
    sinon.stub(MatchesService.prototype, 'getMatchById').resolves(matchByIdMock);

    const { status, data } = await new MatchesService().getMatchById('1');

    expect(status).to.be.equal(200);
    expect(data).to.be.deep.equal(matchByIdMock.data);
  });

  it('testing getMatchById error', async () => {
    sinon.stub(MatchesService.prototype, 'getMatchById').resolves(matchByIdNotFoundMock);

    const { status, data } = await new MatchesService().getMatchById('100');

    expect(status).to.be.equal(404);
    expect(data).to.be.deep.equal(matchByIdNotFoundMock.data);
  });

  it('testing finishMatch', async () => {
    sinon.stub(MatchesService.prototype, 'finishMatch').resolves(finishMatchMock);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(finishMatchMock.data);
  });

  it('testing finishMatch error', async () => {
    sinon.stub(MatchesService.prototype, 'finishMatch').resolves(matchByIdNotFoundMock);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/100/finish')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchByIdNotFoundMock.data);
  });

  it('testing updateMatch', async () => {
    sinon.stub(MatchesService.prototype, 'updateMatch').resolves(updateMatchMock);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/1')
    .send({
      homeTeamGoals: 2,
      awayTeamGoals: 1,
    })
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(updateMatchMock.data);
  });

  it('testing createMatch', async () => {
    sinon.stub(MatchesService.prototype, 'createMatch').resolves(createMatchMock);
    sinon.stub(TeamModel, 'findByPk').resolves({ dataValues: { teamName: 'Palmeiras' } } as Model<any, any>);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
    })
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4');

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(createMatchMock.data);
  });

  it('testing createMatch same Id error', async () => {
    sinon.stub(MatchesService.prototype, 'createMatch').resolves(sameTeamErrorMock);
    sinon.stub(TeamModel, 'findByPk').resolves({ dataValues: { teamName: 'Palmeiras' } } as Model<any, any>);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeamId: 1,
      awayTeamId: 1,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
    })
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4');

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal(sameTeamErrorMock.data);
  });

  it('testing createMatch team not found error', async () => {
    sinon.stub(MatchesService.prototype, 'createMatch').resolves(teamNotFoundErrorMock);
    sinon.stub(TeamModel, 'findByPk').resolves({ dataValues: { teamName: 'Palmeiras' } } as Model<any, any>);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeamId: 1,
      awayTeamId: 100,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
    })
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamNotFoundErrorMock.data);
  });

  it('testing createMatch internal server error', async () => {
    sinon.stub(MatchesService.prototype, 'createMatch').resolves(internalServerErrorMock);
    sinon.stub(TeamModel, 'findByPk').resolves({ dataValues: { teamName: 'Palmeiras' } } as Model<any, any>);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
    })
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(internalServerErrorMock.data);
  });

  it('testing finishMatch internal server error', async () => {
    sinon.stub(MatchesService.prototype, 'finishMatch').resolves(internalServerErrorMock);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(internalServerErrorMock.data);
  });

  it('testing updateMatch internal server error', async () => {
    sinon.stub(MatchesService.prototype, 'updateMatch').resolves(internalServerErrorMock);
    verifyStub.returns({ id: 2 });

    let chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/1')
    .send({
      homeTeamGoals: 2,
      awayTeamGoals: 1,
    })
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(internalServerErrorMock.data);
  });

  it('testing getAllMatches internal server error', async () => {
    sinon.stub(MatchesService.prototype, 'getAllMatches').resolves({ status: 500, data: { message: 'Internal Server Error'} });

    let chaiHttpResponse = await chai
    .request(app)
    .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(internalServerErrorMock.data);
  });

  it('testing getMatchesInProgress internal server error', async () => {
    sinon.stub(MatchesService.prototype, 'getMatchesInProgress').resolves({ status: 500, data: { message: 'Internal Server Error'} });

    let chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(internalServerErrorMock.data);
  });
});