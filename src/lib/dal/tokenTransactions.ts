"use server"

import prisma from "@/db/db"
import { TokenTransactionType } from "../../../generated/prisma"



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
