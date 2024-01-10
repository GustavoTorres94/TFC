import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/users.model';
import { IUser } from '../interfaces/IUser';

export default class UsersService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  public async getAllUsers(): Promise<{ status: number, data: IUser[] }> {
    const users = await this.userModel.getAllUsers();
    return { status: 200, data: users };
  }

  public async login(email: string, password: string):
  Promise<{ status: number, data: string | null }> {
    if (!email || !password) {
      return { status: 400, data: null };
    }
    const user = await this.userModel.getUserByEmail(email);
    if (!user) {
      return { status: 404, data: null };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, data: null };
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    return { status: 200, data: token };
  }
}
