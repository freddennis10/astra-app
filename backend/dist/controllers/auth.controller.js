"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.refreshToken = exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const database_1 = require("../config/database");
const redis_1 = require("../config/redis");
const auth_1 = require("../middleware/auth");
const email_1 = require("../utils/email");
const validation_1 = require("../utils/validation");
const register = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;
        if (!username || !email || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        if (!(0, validation_1.validateEmail)(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        const passwordValidation = (0, validation_1.validatePassword)(password);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Password validation failed',
                errors: passwordValidation.errors
            });
        }
        const usernameValidation = (0, validation_1.validateUsername)(username);
        if (!usernameValidation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Username validation failed',
                errors: usernameValidation.errors
            });
        }
        const existingUser = await database_1.pool.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'User with this email or username already exists'
            });
        }
        const saltRounds = 12;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        const userId = (0, uuid_1.v4)();
        const walletId = (0, uuid_1.v4)();
        await database_1.pool.query('BEGIN');
        try {
            await database_1.pool.query(`INSERT INTO users (id, username, email, password_hash, full_name, wallet_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`, [userId, username, email, hashedPassword, fullName, walletId]);
            await database_1.pool.query(`INSERT INTO wallets (id, user_id, balance, total_earnings, pending_balance, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`, [walletId, userId, 0.00, 0.00, 0.00]);
            await database_1.pool.query('COMMIT');
            const verificationToken = (0, uuid_1.v4)();
            await (0, redis_1.setCache)(`verification:${verificationToken}`, userId, 3600);
            const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
            await (0, email_1.sendEmail)(email, 'Welcome to Astra - Verify Your Email', `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea;">Welcome to Astra!</h2>
            <p>Hi ${fullName},</p>
            <p>Thank you for joining Astra! Please verify your email address by clicking the button below:</p>
            <a href="${verificationUrl}" style="background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Verify Email</a>
            <p>If you didn't create an account, please ignore this email.</p>
            <p>Best regards,<br>The Astra Team</p>
          </div>
        `);
            res.status(201).json({
                success: true,
                message: 'User registered successfully. Please check your email to verify your account.',
                data: {
                    id: userId,
                    username,
                    email,
                    fullName,
                    isVerified: false
                }
            });
        }
        catch (error) {
            await database_1.pool.query('ROLLBACK');
            throw error;
        }
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        if (!login || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email/username and password are required'
            });
        }
        const userQuery = await database_1.pool.query('SELECT id, username, email, password_hash, full_name, is_active, is_verified, avatar_url FROM users WHERE email = $1 OR username = $1', [login]);
        if (userQuery.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const user = userQuery.rows[0];
        if (!user.is_active) {
            return res.status(401).json({
                success: false,
                message: 'Account has been deactivated'
            });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const { accessToken, refreshToken } = (0, auth_1.generateTokens)(user);
        await (0, redis_1.setCache)(`refresh_token:${user.id}`, refreshToken, 7 * 24 * 3600);
        await database_1.pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullName: user.full_name,
                    isVerified: user.is_verified,
                    avatarUrl: user.avatar_url
                },
                accessToken,
                refreshToken
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const authHeader = req.headers.authorization;
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (refreshToken) {
            const decoded = await (0, auth_1.verifyRefreshToken)(refreshToken);
            await (0, redis_1.deleteCache)(`refresh_token:${decoded.userId}`);
        }
        if (accessToken) {
            await (0, redis_1.setCache)(`blacklisted_token:${accessToken}`, true, 3600);
        }
        res.json({
            success: true,
            message: 'Logout successful'
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
exports.logout = logout;
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token required'
            });
        }
        const decoded = await (0, auth_1.verifyRefreshToken)(refreshToken);
        const storedToken = await (0, redis_1.getCache)(`refresh_token:${decoded.userId}`);
        if (!storedToken || storedToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }
        const userQuery = await database_1.pool.query('SELECT id, username, email, full_name, is_active, is_verified FROM users WHERE id = $1', [decoded.userId]);
        if (userQuery.rows.length === 0 || !userQuery.rows[0].is_active) {
            return res.status(401).json({
                success: false,
                message: 'User not found or inactive'
            });
        }
        const user = userQuery.rows[0];
        const { accessToken, refreshToken: newRefreshToken } = (0, auth_1.generateTokens)(user);
        await (0, redis_1.setCache)(`refresh_token:${user.id}`, newRefreshToken, 7 * 24 * 3600);
        res.json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                accessToken,
                refreshToken: newRefreshToken
            }
        });
    }
    catch (error) {
        console.error('Token refresh error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid refresh token'
        });
    }
};
exports.refreshToken = refreshToken;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        const userQuery = await database_1.pool.query('SELECT id, username, full_name FROM users WHERE email = $1 AND is_active = true', [email]);
        if (userQuery.rows.length === 0) {
            return res.json({
                success: true,
                message: 'If an account with this email exists, you will receive a password reset link.'
            });
        }
        const user = userQuery.rows[0];
        const resetToken = (0, uuid_1.v4)();
        await (0, redis_1.setCache)(`password_reset:${resetToken}`, user.id, 3600);
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await (0, email_1.sendEmail)(email, 'Astra - Password Reset Request', `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Password Reset Request</h2>
          <p>Hi ${user.full_name},</p>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <a href="${resetUrl}" style="background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>The Astra Team</p>
        </div>
      `);
        res.json({
            success: true,
            message: 'If an account with this email exists, you will receive a password reset link.'
        });
    }
    catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: 'Token and password are required'
            });
        }
        const passwordValidation = (0, validation_1.validatePassword)(password);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Password validation failed',
                errors: passwordValidation.errors
            });
        }
        const userId = await (0, redis_1.getCache)(`password_reset:${token}`);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }
        const saltRounds = 12;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        await database_1.pool.query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [hashedPassword, userId]);
        await (0, redis_1.deleteCache)(`password_reset:${token}`);
        await (0, redis_1.deleteCache)(`refresh_token:${userId}`);
        res.json({
            success: true,
            message: 'Password reset successful'
        });
    }
    catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.controller.js.map