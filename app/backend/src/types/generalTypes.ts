export type TokenType = {
  token: string;
};

export type UserErrors = {
  status: number;
  data: { message: string };
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserSuccess = {
  status: number;
  data: { token: string };
};

export type UserRole = {
  status: number;
  data: { role: string };
};

export type DecodedType = {
  id: string;
};
