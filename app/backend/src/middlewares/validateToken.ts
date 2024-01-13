import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const bearerToken = (token: string) => token.split(' ')[1];

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const newToken = bearerToken(token);
    const decoded = jwt.verify(newToken, process.env.JWT_SECRET as string);
    req.body.decoded = decoded;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
