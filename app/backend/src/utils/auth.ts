import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export default class Auth {
  public static async generateToken(userId: number): Promise<string> {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string);
    return token;
  }

  public static async comparePasswords(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
