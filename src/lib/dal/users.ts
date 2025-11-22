"use server"

import prisma from "@/db/db"
import { checkAdminAuth, checkServerAuth } from "@/lib/auth/server/session"
import { DEFAULT_ROLE } from "@/lib/auth/roles"
import { headers } from "next/headers"

export const getUser = async () => {

    const session = await checkServerAuth(headers)

    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    })
    if (!user) {
        throw new Error("User not found")
    }
    return user

}

export const userAcceptTerms = async (version: string) => {

    const session = await checkServerAuth(headers)

    const user = await prisma.user.update({
        where: { id: session.user.id },
        data: {
            termsAccepted: {
                timestamp: new Date(),
                version: version
            }
        }
    })

    return user
}

// Admin view functions

/**
 * Get all users (admin only) - for admin dashboard viewing
 */
export const getAllUsers = async () => {
   
    await checkAdminAuth(headers)

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            tokens: true,
            banned: true,
            banReason: true,
            banExpires: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return users
}

/**
 * Get total user count (admin only)
 */
export const getUserCount = async () => {
    await checkAdminAuth(headers)

    const count = await prisma.user.count()
    return count
}
