import { authClient } from "@/auth/authClient"
import { getErrorMessage } from "./error"
import { SIGNIN_CALLBACK_URL, SIGNIN_ERROR_CALLBACK_URL, } from "@/lib/auth/const"

const clientSignin = async (email: string) => {

    const { data, error } = await authClient.signIn.magicLink({
        email,
        callbackURL: SIGNIN_CALLBACK_URL,
        errorCallbackURL: SIGNIN_ERROR_CALLBACK_URL
    })

    if (error) {

        if (error.code) {

            throw new Error(getErrorMessage(error.code))
        }
        else {
            throw new Error("An unexpected error occurred. Please try again.")
        }
    }
    else {
        return data
    }
}

export default clientSignin