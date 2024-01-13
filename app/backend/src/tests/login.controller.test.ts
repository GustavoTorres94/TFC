import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';

import { app } from '../app';

import { LoginService } from '../services';
import { LoginController } from '../controllers';

import { loginSuccessMock,
  loginWrongMailOrPasswordMock,
  missingFieldsMock,
  userRoleMock,
  tokenNotFoundMock,
} from './mocks/login.mocks';

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

  it('testing if LoginController is returning success when called propoerly', async () => {
    sinon.stub(LoginService.prototype, 'login').resolves(loginSuccessMock);
    
    let chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'user@user.com',
      password: 'secret_user'
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(loginSuccessMock.data);
  });

  it('testing if LoginController is returning error when called with invalid email', async () => {
    sinon.stub(LoginService.prototype, 'login').resolves(loginWrongMailOrPasswordMock);
    
    let chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'user@user',
      password: 'secret_user'
    });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(loginWrongMailOrPasswordMock.data);
  });

  it('testing if LoginController is returning error when called with invalid password', async () => {
    sinon.stub(LoginService.prototype, 'login').resolves(loginWrongMailOrPasswordMock);
    
    let chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'user@user.com',
      password: 'secret',
      });
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(loginWrongMailOrPasswordMock.data);
  });

  it('testing if LoginController is returning error when called with missing fields', async () => {
    sinon.stub(LoginService.prototype, 'login').resolves(missingFieldsMock);
    
    let chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: '',
      password: '',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal(missingFieldsMock.data);
  });

  it('testing if LoginController.getRole is retruning error when called without token', async () => {
    sinon.stub(LoginService.prototype, 'getRole').resolves(tokenNotFoundMock);
    
    let chaiHttpResponse = await chai
    .request(app)
    .get('/login/role');
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(tokenNotFoundMock.data);
  });
  
  // it.only('testing if LoginController.getRole is working properly', async () => {
  //   // const req = {
  //   //   headers: {
  //     //     authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4',
  //     //   },
  //     // } as Request;
  //     sinon.stub(LoginService.prototype, 'getRole').resolves(userRoleMock);
      
  //     let chaiHttpResponse = await chai
  //     .request(app)
  //     .get('/login/role')
  //     .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4');
  //     console.log(chaiHttpResponse.body);

  //   expect(chaiHttpResponse.status).to.be.equal(200);
  //   expect(chaiHttpResponse.body).to.be.deep.equal(userRoleMock.data);
  // });

});
