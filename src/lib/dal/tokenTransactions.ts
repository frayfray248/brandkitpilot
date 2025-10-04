"use server"

import prisma from "@/db/db"
import { TokenTransactionType } from "../../../generated/prisma"
import { checkServerAuth } from "@/lib/auth/server/session"
import { headers } from "next/headers"



export const createTokenTransaction = async (
    userId: string,
    type: TokenTransactionType,
    tokens: number,
    stripeSessionId?: string,
) => {

    await prisma.tokenTransaction.create({
        data: {
            userId,
            type,
            tokens,
            stripeSessionId,
        }
    })

}

export const getUserTokenTransactions = async () => {

    const session = await checkServerAuth(headers)

    return prisma.tokenTransaction.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
    })

}
