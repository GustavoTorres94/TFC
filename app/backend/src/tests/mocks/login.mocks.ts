export const loginSuccessMock = {
  status: 200,
  data: {
    token: 'token',
  },
};

export const loginWrongMailOrPasswordMock = {
  status: 401,
  data: {
    message: 'Invalid email or password',
  },
};

export const missingFieldsMock = {
  status: 400,
  data: {
    message: 'All fields must be filled',
  },
};

export const allUsersMock = {
  status: 200,
  data: [
    {
      id: 1,
      name: 'user',
      email: 'user@user.com',
      password: 'secret_user',
      role: 'user',
    },
    {
      id: 2,
      name: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
      role: 'admin',
    },
  ],
};

export const userRoleMock = {
  status: 200,
  data: {
    role: 'user',
  },
};

export const adminRoleMock = {
  status: 200,
  data: {
    role: 'admin',
  },
};

export const errorIdMock = {
  status: 404,
  data: null,
};

export const userByIdMock = {
  status: 200,
  data: {
    id: 1,
    name: 'user',
    email: 'user@user.com',
    password: 'secret_user',
    role: 'user',
  },
};

export const adminByIdMock = {
  status: 200,
  data: {
    id: 2,
    name: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
    role: 'admin',
  },
};

export const tokenNotFoundMock = {
  status: 401,
  data: {
    message: 'Token not found',
  },
};

export const loginOkMock = {
  status: 200,
  data: {
    token: 'token',
  },
};
