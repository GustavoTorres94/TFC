import { TokenType } from '../types/generalTypes';
import UsersModel from '../database/models/usersModel';
import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
import Auth from '../utils/auth';

export default class UserModel implements IUserModel {
  private model = UsersModel;

  public async login(email: string, password: string): Promise<TokenType | null | Error> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) throw new Error('Invalid email or password');
    const isMatch = await Auth.comparePasswords(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');
    const token = await Auth.generateToken(user.id);
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
