import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';

import { app } from '../app';

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
  
  afterEach(sinon.restore);
});