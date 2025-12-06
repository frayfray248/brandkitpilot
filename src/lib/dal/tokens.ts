import prisma from "@/db/db"

// temporary conversion rate
export const TOKENS_PER_USD = 4000;

export const addTokensToUser = async (
    userId: string,
    tokens: number,
    stripeSessionId: string,
) => {

    await prisma.$transaction([
        prisma.user.update({
            where: { id: userId },
            data: { tokens: { increment: tokens } }
        }),
        prisma.tokenTransaction.create({
            data: {
                userId,
                type: "PURCHASE",
                tokens,
                stripeSessionId
            }
        })
    ])
}

export const deductTokensFromUser = async (
    userId: string,
    tokens: number,
) => {


    await prisma.$transaction([
        prisma.user.update({
            where: { id: userId },
            data: { tokens: { decrement: tokens } }
        }),
        prisma.tokenTransaction.create({
            data: {
                userId,
                type: "CONSUME",
                tokens,
            }
        })
    ])

}

export const stripeTransactionExists = async (stripeSessionId: string) => {
    const transaction = await prisma.tokenTransaction.findUnique({
        where: { stripeSessionId }
    });
    return transaction !== null;
};
