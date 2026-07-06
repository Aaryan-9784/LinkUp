import { transporter, sender } from "../lib/nodemailer.js";
import { createWelcomeEmailTemplate, createOTPEmailTemplate, createResetPasswordEmailTemplate } from "./emailTemplates.js";

// Send welcome email to newly registered users
export const sendWelcomeEmail = async (name, email, clientURL) => {
    const htmlContent = createWelcomeEmailTemplate(name, clientURL);
    try {
        await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Welcome to LinkUp! 🎉",
            html: htmlContent,
        });
        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send welcome email to ${email}:`, error);
    }
};

// Send OTP verification email during registration
export const sendOTPEmail = async (name, email, otp) => {
    const htmlContent = createOTPEmailTemplate(name, otp);
    try {
        await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Verify Your Email - LinkUp",
            html: htmlContent,
        });
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send OTP email to ${email}:`, error);
        throw error; // Re-throw to handle in controller
    }
};

// Send password reset OTP email
export const sendResetPasswordEmail = async (name, email, otp) => {
    const htmlContent = createResetPasswordEmailTemplate(name, otp);
    try {
        await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Reset Your Password - LinkUp",
            html: htmlContent,
        });
        console.log(`Reset password email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send reset password email to ${email}:`, error);
        throw error; // Re-throw to handle in controller
    }
};
