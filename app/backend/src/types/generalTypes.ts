export type TokenType = {
  token: string;
};

// const userError400: string = 'All fields must be filled' || 'Incorrect username or password';
// const userError401: string = 'Invalid email or password';

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
