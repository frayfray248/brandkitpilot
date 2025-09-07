"use server"
import { auth } from "@/auth/auth"
import { getErrorMessage } from "@/lib/auth/clientError"
import { APIError } from "better-auth/api"


const createUser = async (name: string, email: string) => {
    try {

        await auth.api.createUser({
            body: {
                name,
                email,
                password: crypto.randomUUID() // Temporary password, as we'll use magic link for sign-in
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