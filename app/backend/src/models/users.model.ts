import * as jwt from 'jsonwebtoken';
import { TokenType } from '../types/generalTypes';
import UsersModel from '../database/models/usersModel';
import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = UsersModel;

  public async login(email: string, password: string): Promise<TokenType | null> {
    if (!email || !password) {
      return null;
    }

    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return { token };
  }

  public async getAllUsers(): Promise<IUser[]> {
    const users = await this.model.findAll();

    return users;
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    return user;
  }
}
