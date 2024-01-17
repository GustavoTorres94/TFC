import { Request, Response } from 'express';

import { LoginService } from '../services';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { body } = req;
      const { email, password } = body;

      const { status, data } = await this.loginService.login(email, password);

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    try {
      const { decoded } = req.body;

      const { status, data } = await this.loginService.getRole(decoded);

      return res.status(status).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
