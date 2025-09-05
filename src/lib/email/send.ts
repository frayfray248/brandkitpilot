import transporter from "./transporter"

if (!process.env.EMAIL_FROM) {
    throw new Error('EMAIL_FROM environment variable is not set.');
}

const sendEmail = async (to: string, subject: string, text: string) => {
    const emailFrom = process.env.EMAIL_FROM;
    if (!emailFrom) {
        throw new Error('EMAIL_FROM environment variable is not set.');
    }
    try {
        await transporter.sendMail({
            from: emailFrom,
            to,
            subject,
            text
        });
        console.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
        else {
            throw new Error('Failed to send email: Unknown error');
        }
    }
}

export default sendEmail;