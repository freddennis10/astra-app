import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface AuthRequest extends Request {
    user?: any;
}
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const generateTokens: (payload: any) => {
    accessToken: never;
    refreshToken: never;
};
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
export {};
//# sourceMappingURL=auth.d.ts.map