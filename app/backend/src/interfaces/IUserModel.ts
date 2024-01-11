import { IUser } from './IUser';
import { TokenType } from '../types/generalTypes';

export interface IUserModel {
  getAllUsers(): Promise<IUser[]>;
  getUserByEmail(email: string): Promise<IUser | null>;
  login(email: string, password: string): Promise<TokenType | null | Error>;
}
