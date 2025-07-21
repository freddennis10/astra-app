"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const sendEmail = async (to, subject, html) => {
    console.log('📧 Mock Email Sent to:', to);
    console.log('Subject:', subject);
    console.log('Content:', html);
    return true;
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map