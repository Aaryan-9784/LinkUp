import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

// Nodemailer transporter using SMTP credentials from environment
export const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465, // true for port 465, false for 587/25
    auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
    },
});

// Sender information used across all outgoing emails
export const sender = {
    email: config.senderEmail,
    name: config.senderName,
};
