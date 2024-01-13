export default class Password {
  public static async verifyLength(password: string): Promise<boolean> {
    return password.length >= 6;
  }
}
