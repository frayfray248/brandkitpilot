import { auth } from "@/auth/auth"
import { CHECK_ADMIN_AUTH_REDIRECT_URL, CHECK_AUTH_REDIRECT_URL } from "@/lib/auth/const"
import { isAdmin } from "@/lib/auth/roles"
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"
import { notFound, redirect } from "next/navigation"

/**
 * Get session (no auth requirement)
 */
export const getServerSession = async (headers: () => Promise<ReadonlyHeaders>) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    return session
}

/**
 * Check authentication and redirect if not logged in
 */
export const checkServerAuth = async (headers: () => Promise<ReadonlyHeaders>) => {
    const session = await getServerSession(headers)

    if (!session) {
        redirect(CHECK_AUTH_REDIRECT_URL)
    }

    return session
}


/**
 * Check admin role and redirect if not admin or not logged in
 * Use this for admin pages that need automatic redirects
 */
export const checkAdminAuth = async (headers: () => Promise<ReadonlyHeaders>) => {
    const session = await getServerSession(headers)

    // Redirect to login if no session
    if (!session) {
        redirect(CHECK_AUTH_REDIRECT_URL)
    }

    // Redirect to dashboard if not admin
    if (!isAdmin(session.user.role)) {
        redirect(CHECK_ADMIN_AUTH_REDIRECT_URL)
    }

    return session
}