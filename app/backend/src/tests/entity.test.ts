import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Email from '../entity/email';
import Password from '../entity/password';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing entity', () => {
  afterEach(sinon.restore);

  it('testing if Email is returning expected true value', async () => {
    const validEmail = 'valid@email.com';
    const teste = await Email.verifyEmail(validEmail);
    expect(teste).to.be.equal(true);
  });

  it('testing if Email is returning expected false value', async () => {
    const invalidEmail1 = 'invalidemail.com';
    const teste = await Email.verifyEmail(invalidEmail1);
    expect(teste).to.be.equal(false);
  });

  it('testing if Password is returning expected true value', async () => {
    const validPassword = 'validPassword';
    const teste = await Password.verifyLength(validPassword);
    expect(teste).to.be.equal(true);
  });

  it('testing if Password is returning expected false value', async () => {
    const invalidPassword = '123';
    const teste = await Password.verifyLength(invalidPassword);
    expect(teste).to.be.equal(false);
  });
});