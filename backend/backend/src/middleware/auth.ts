import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const accessSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;
const refreshSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;

export const generateTokens = (payload: object) => {
    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '15m' } as SignOptions);
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '7d' } as SignOptions);
    return { accessToken, refreshToken };
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, accessSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const verifyRefreshToken = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, refreshSecret, (err, user) => {
            if (err) reject(err);
            resolve(user);
        });
    });
};
