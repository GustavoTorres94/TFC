import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';

import { app } from '../app';
import { TeamsService } from '../services';
import { TeamsController } from '../controllers';

// import { Response } from 'superagent';
import { allTeamsMock, teamByIdMock, errorIdMock } from './mocks/allTeams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing controller', () => {
  let chaiHttpResponse: Response;
  const res = {} as Response;
  const req = {} as Request;
  
  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });
  
  afterEach(sinon.restore);
  
  it('testing if TeamController is returning expected values', async () => {
    sinon.stub(TeamsService.prototype, 'getAllTeams').resolves(allTeamsMock);
    
    let chaiHttpResponse = await chai
    .request(app)
    .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMock.data);
  });
  it('testing if TeamController is returning expected values when  searching for single team', async () => {
    sinon.stub(TeamsService.prototype, 'getTeamById').resolves(teamByIdMock);
    
    let chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamByIdMock.data);
  });
  it('testing if TeamController is returning error when called with invalid id', async () => {
    sinon.stub(TeamsService.prototype, 'getTeamById').resolves(errorIdMock);
    
    let chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1');

    
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal(null);
  });
  it('test if teamcontroller.getAllTeams is returning 500 error when service throws error', async () => {
    sinon.stub(TeamsService.prototype, 'getAllTeams').throws(new Error('error'));
    
    let chaiHttpResponse = await chai
    .request(app)
    .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'error' });
  });
  it('test if teamcontroller.getTeamById is returning 500 error when service throws error', async () => {
    sinon.stub(TeamsService.prototype, 'getTeamById').throws(new Error('error'));
    
    let chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'error' });
  });
});

/**
 * Exemplo do uso de stubs com tipos
 */

// let chaiHttpResponse: Response;

// before(async () => {
//   sinon
//     .stub(Example, "findOne")
//     .resolves({
//       ...<Seu mock>
//     } as Example);
// });

// after(()=>{
//   (Example.findOne as sinon.SinonStub).restore();
// })

// it('...', async () => {
//   chaiHttpResponse = await chai
//      .request(app)
//      ...

//   expect(...)
// });