import prisma from "@/db/db"

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

export const stripeTransactionExists = async (stripeSessionId: string) => {
    const transaction = await prisma.tokenTransaction.findUnique({
        where: { stripeSessionId }
    });
    return transaction !== null;
};
