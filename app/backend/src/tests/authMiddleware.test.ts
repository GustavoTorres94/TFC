import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import validateToken from '../middlewares/validateToken';
import { bearerToken } from '../middlewares/validateToken';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing middleware', () => {
  afterEach(sinon.restore);

  // const req = {} as unknown as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('testing if validateToken is returning expected values', async () => {
    const req = {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1MDg5MzgwfQ.maEtrCBx2HjyCtuMj5BRg0kJ0pxVYslingpyDGWu1b4',
      body: {
        "email": "user@user.com",
        "password": "secret_user",
        decoded: {
          id: 2,
          iat: 1705089380,
        },
      },
    } as unknown as Request;
  });
});