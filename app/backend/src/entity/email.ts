export default class Email {
  public static async verifyEmail(email: string): Promise<boolean> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return emailRegex;
  }
}
