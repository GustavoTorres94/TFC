import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserModel from '../models/users.model';
import UsersModel from '../database/models/usersModel';
import { LoginService } from '../services';

import { allUsersMock, loginOkMock } from './mocks/login.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing Login sevices', () => {
  afterEach(sinon.restore);

  // it.only('testing if LoginService is returning user when called', async () => {
  //   sinon.stub(UserModel.prototype, 'login').resolves(loginOkMock.data);

  //   const loginService = new LoginService();
  //   const login = {
  //     email: 'user@user.com',
  //     password: 'secret_user',
  //   }

  //   const { status, data } = await loginService.login(login.email, login.password);
  //   console.log(status, data);

  //   expect(status).to.be.equal(200);
  //   expect(data).to.be.deep.equal(loginOkMock.data);
  // });
});