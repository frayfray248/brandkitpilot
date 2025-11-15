import z from "zod";

const TEST_EMAIL_API_URL = 'https://api.testmail.app/api/json';

export const TestEmailSchema = z.object({
    oid: z.string(),
    from: z.email(),
    to: z.email(),
    text: z.string(),
    date: z.number()
})

export type Email = z.infer<typeof TestEmailSchema>;

export class TestEmail {

    #apiKey: string;
    #namespace: string;

    constructor(apiKey: string, namespace: string) {
        this.#apiKey = apiKey;
        this.#namespace = namespace;
    }

    async waitForEmail(fromTime: number, timeout: number = 30000): Promise<Email | null> {

        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error(`Timeout waiting for email after ${timeout}ms`));
            }, timeout);

            const run = async () => {
                try {
                    const url = `${TEST_EMAIL_API_URL}?apikey=${this.#apiKey}&namespace=${this.#namespace}&timestamp_from=${fromTime}&livequery=true`;
                    const res = await fetch(url);
                    clearTimeout(timeoutId);
                    if (!res.ok) {
                        reject(new Error(`Failed to fetch emails: ${res.status} ${res.statusText}`));
                        return;
                    }
                    const data = await res.json();
                    if (!data.emails || !Array.isArray(data.emails) || data.emails.length === 0) {
                        reject(new Error('Invalid email data format'));
                        return;
                    }
                    const email = TestEmailSchema.parse(data.emails[0]);
                    resolve(email);
                } catch (error) {
                    clearTimeout(timeoutId);
                    reject(error);
                }
            };
            run().catch(reject);
        });
    }

    /**
     * Extract magic link URL from email text
     * @param emailText The text content of the email
     * @returns The extracted magic link URL or null if not found
     */
    extractMagicLink(emailText: string): string | null {
        // Pattern to match magic link URLs
        // Matches: http://localhost:3000/api/auth/magic-link/verify?token=...&callbackURL=...&errorCallbackURL=...
        const magicLinkPattern = /https?:\/\/[^\s]+\/api\/auth\/magic-link\/verify\?[^\s]+/gi;
        
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
     * @returns The extracted magic link URL
     */
    async waitForMagicLink(fromTime: number, timeout: number = 30000): Promise<string> {
        const email = await this.waitForEmail(fromTime, timeout);
        
        if (!email) {
            throw new Error('No email received');
        }
        
        const magicLink = this.extractMagicLink(email.text);
        
        if (!magicLink) {
            throw new Error(`No magic link found in email. Email content: ${email.text.substring(0, 200)}...`);
        }
        
        return magicLink;
    }
}
