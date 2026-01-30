import z from "zod";

const TEST_EMAIL_API_URL = 'http://localhost:8025/api/v1/messages';

export const TestEmailSchema = z.object({
    ID: z.string(),
    From: z.object({
        Name: z.string().optional(),
        Address: z.email()
    }),
    To: z.array(z.object({
        Name: z.string().optional(),
        Address: z.email()
    })),
    Snippet: z.string(),
    Created: z.string()
})

export type Email = z.infer<typeof TestEmailSchema>;

export const waitForEmail = async (): Promise<Email | null> => {

    // wait for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {

        const res = await fetch(TEST_EMAIL_API_URL);

        if (!res.ok) {
            throw new Error(`Failed to fetch emails: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();


        if (!data.messages || !Array.isArray(data.messages) || data.messages.length === 0) {

            throw new Error('Invalid email data format');
        }
        const email = TestEmailSchema.parse(data.messages[0]);
        return email;
    } catch (error) {

        if (error instanceof Error) {
            throw new Error(`Failed to wait for email: ${error.message}`);
        }
        throw new Error(`Failed to wait for email: ${String(error)}`);
    }


}

/**
 * Extract magic link URL from email text
 * @param emailText The text content of the email
 * @returns The extracted magic link URL or null if not found
 */
export const extractMagicLink = (emailText: string): string | null => {
    // Pattern to match magic link URLs
    // Matches: http://localhost:3000/api/auth/magic-link/verify?token=...&callbackURL=...&errorCallbackURL=...
    const magicLinkPattern = /https?:\/\/[^\s]+\/api\/auth\/magic-link\/verify\?[^\s.]+/gi;

    const matches = emailText.match(magicLinkPattern);

    if (matches && matches.length > 0) {
        return matches[0].replace(/[>"'\s]$/, ''); // Clean up any trailing characters
    }

    // Fallback: look for any URL with "verify" and "token" parameters
    const fallbackPattern = /https?:\/\/[^\s]+verify[^\s]*token=[^\s&]+[^\s]*/gi;
    const fallbackMatches = emailText.match(fallbackPattern);

    if (fallbackMatches && fallbackMatches.length > 0) {
        return fallbackMatches[0].replace(/[>"'\s]$/, '');
    }

    return null;
}

/**
 * Wait for email and extract magic link in one step
 * @param fromTime Timestamp to check emails from
 * @param timeout Timeout in milliseconds
 * @param recipientEmail Optional email address to filter by recipient
 * @returns The extracted magic link URL
 */
export const waitForMagicLink = async (fromTime: number, timeout: number = 30000, recipientEmail?: string): Promise<string> => {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        try {
            const res = await fetch(TEST_EMAIL_API_URL);

            if (!res.ok) {
                continue; // Try again
            }

            const data = await res.json();

            if (!data.messages || !Array.isArray(data.messages) || data.messages.length === 0) {
                continue; // Try again
            }

            // Filter emails by time and optionally by recipient
            const filteredEmails = data.messages.filter((msg: any) => {
                const emailTime = new Date(msg.Created).getTime();
                const isAfterFromTime = emailTime >= fromTime;

                if (recipientEmail) {
                    const hasMatchingRecipient = msg.To?.some((to: any) => to.Address === recipientEmail);
                    return isAfterFromTime && hasMatchingRecipient;
                }

                return isAfterFromTime;
            });

            if (filteredEmails.length === 0) {
                continue; // Try again
            }

            // Get the most recent email
            const email = TestEmailSchema.parse(filteredEmails[0]);
            const magicLink = extractMagicLink(email.Snippet);

            if (!magicLink) {
                throw new Error(`No magic link found in email. Email content: ${email.Snippet.substring(0, 200)}...`);
            }

            console.log(`Found magic link: ${magicLink}`);

            return magicLink;

        } catch (error) {
            if (Date.now() - startTime >= timeout) {
                throw new Error(`Timeout waiting for magic link email: ${error}`);
            }
            // Continue retrying
        }
    }

    throw new Error('Timeout waiting for magic link email');
}