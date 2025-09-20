import { auth } from "@/auth/auth"
import { CHECK_AUTH_REDIRECT_URL } from "@/lib/auth/const"
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"
import { redirect } from "next/navigation"


export const getServerSession = async (headers: () => Promise<ReadonlyHeaders>) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    return session
}

export const checkServerAuth = async (headers: () => Promise<ReadonlyHeaders>) => {

    const session = await getServerSession(headers)

    if (!session) {
        redirect(CHECK_AUTH_REDIRECT_URL)
    }

    return session

}