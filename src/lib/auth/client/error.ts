import { authClient } from "@/auth/authClient";

export type AuthClientErrorTypes = Partial<
    Record<
        keyof typeof authClient.$ERROR_CODES,
        string
    >
>;

export const authClientErrorCodesMessages = {
    USER_ALREADY_EXISTS: "User already registered. Try logging in instead.",
    USER_NOT_FOUND: "User not found. Please check your credentials.",
} satisfies AuthClientErrorTypes;



export const getErrorMessage = (code: string) => {
    if (code in authClientErrorCodesMessages) {
        return authClientErrorCodesMessages[code as keyof typeof authClientErrorCodesMessages];
    }
    return "An unknown error occurred. Please try again.";
};