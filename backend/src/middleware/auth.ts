import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? 'your-secret-key') as JwtPayload;
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

export const authMiddleware = authenticateToken;

export const generateTokens = (payload: object) => {
  const jwtSecret: Secret = process.env.JWT_SECRET ?? 'your-secret-key';
  const jwtRefreshSecret: Secret = process.env.JWT_REFRESH_SECRET ?? 'your-refresh-secret';
  
  // Type assert the expiry values as valid JWT expiry strings
  const accessTokenExpiry = (process.env.JWT_EXPIRES_IN ?? '24h') as string;
  const refreshTokenExpiry = (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as string;
  
  const accessTokenOptions: SignOptions = {
    expiresIn: accessTokenExpiry
  };
  
  const refreshTokenOptions: SignOptions = {
    expiresIn: refreshTokenExpiry
  };
  
  const accessToken = jwt.sign(payload, jwtSecret, accessTokenOptions);
  const refreshToken = jwt.sign(payload, jwtRefreshSecret, refreshTokenOptions);
  
  return { accessToken, refreshToken };
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? 'your-refresh-secret');
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
