"use server"
import { auth } from "@/auth/auth"
import { getErrorMessage } from "@/lib/auth/client/error"
import { APIError } from "better-auth/api"


const createUser = async (name: string, email: string) => {
    try {

        await auth.api.createUser({
            body: {
                name,
                email,
                password: Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('') // Secure random temporary password
            }
        })

    } catch (error) {

        if (error instanceof APIError) {

            // message comparison until better-auth exports the correct error code
            if (error.body?.message === auth.$ERROR_CODES.USER_ALREADY_EXISTS) {
                throw new Error(getErrorMessage("USER_ALREADY_EXISTS"))
            }

        } else {
            throw new Error("Failed to create user")
        }
    }
}

export default createUser