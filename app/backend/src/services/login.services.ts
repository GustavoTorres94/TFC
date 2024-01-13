import Email from '../entity/email';
import Password from '../entity/password';
import Auth from '../utils/auth';
import UserModel from '../models/users.model';
import { IUser } from '../interfaces/IUser';
import { UserErrors, UserSuccess, UserRole, DecodedType } from '../types/generalTypes';

const error = 'Invalid email or password';

export default class UsersService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  public async getAllUsers(): Promise<{ status: number, data: IUser[] }> {
    const users = await this.userModel.getAllUsers();
    return { status: 200, data: users };
  }

  public async login(email: string, password: string):
  Promise<UserErrors | UserSuccess> {
    if (!email || !password) return { status: 400, data: { message: 'All fields must be filled' } };
    const isEmailValid = await Email.verifyEmail(email);
    const isPasswordValid = await Password.verifyLength(password);
    if (!isEmailValid || !isPasswordValid) {
      return { status: 401, data: { message: error } };
    }
    const user = await this.userModel.getUserByEmail(email);
    if (!user) return { status: 401, data: { message: error } };
    const isMatch = await Auth.comparePasswords(password, user.password);
    console.log(isMatch);
    if (!isMatch) return { status: 401, data: { message: error } };
    const token = await Auth.generateToken(user.id);
    return { status: 200, data: { token } };
  }

  public async getRole(decoded: DecodedType): Promise<UserErrors | UserRole> {
    const user = await this.userModel.getUserById(decoded.id);
    if (!user) return { status: 401, data: { message: error } };
    return { status: 200, data: { role: user.role } };
  }
}
