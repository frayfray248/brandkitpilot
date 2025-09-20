"use server"

import prisma from "@/db/db"
import { checkServerAuth } from "@/lib/auth/server/session"
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