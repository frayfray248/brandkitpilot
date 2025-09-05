import nodemailer from 'nodemailer';

if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_PORT || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
    throw new Error('Email server environment variables are not set correctly.');
}

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
    }
})

export const verifyEmailTransporter = async () => {
    try {
        await transporter.verify();
        console.log('Email server is ready to take our messages');
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Email server is not configured correctly: ${error.message}`);
        }
        else {
            throw new Error('Email server is not configured correctly');
        }
    }
}

export default transporter;