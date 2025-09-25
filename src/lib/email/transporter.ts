import serverEnv from '@/lib/env/serverEnv';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: serverEnv.EMAIL_SERVER_HOST,
    port: Number(serverEnv.EMAIL_SERVER_PORT),
    auth: {
        user: serverEnv.EMAIL_SERVER_USER,
        pass: serverEnv.EMAIL_SERVER_PASSWORD
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