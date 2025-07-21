"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUsername = exports.validatePassword = exports.validateEmail = void 0;
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
exports.validatePassword = validatePassword;
const validateUsername = (username) => {
    const errors = [];
    if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }
    if (username.length > 20) {
        errors.push('Username must be less than 20 characters long');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push('Username can only contain letters, numbers, and underscores');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
exports.validateUsername = validateUsername;
//# sourceMappingURL=validation.js.map