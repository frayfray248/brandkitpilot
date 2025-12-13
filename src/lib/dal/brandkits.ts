import prisma from "@/db/db";
import { BrandKit, BrandKitStatus, TokenTransaction, User } from "../../../generated/prisma";
import { checkServerAuth } from "@/lib/auth/server/session";
import { headers } from "next/headers";
import { JsonObject, InputJsonValue } from "@prisma/client/runtime/library";

export const createBrandKit = async (userId: string, title: string): Promise<BrandKit> => {

    const createdBrandKit = await prisma.brandKit.create({
        data: {
            userId,
            title,
            outputs: []
        }
    });

    return createdBrandKit;

}

export const updateBrandKitById = async (
    brandKitId: string,
    updates: Partial<Omit<BrandKit, "id" | "userId">>
): Promise<BrandKit> => {

    const updatedBrandKit = await prisma.brandKit.update({
        where: {
            id: brandKitId
        },
        data: updates
    });

    return updatedBrandKit;

}

export const getBrandKitById = async (getBrandKitId: string): Promise<BrandKit | null> => {

    await checkServerAuth(headers)

    const brandKit = await prisma.brandKit.findUnique({
        where: {
            id: getBrandKitId
        }
    });

    return brandKit;

}

export const getAllBrandKitsByUserId = async (userId: string): Promise<BrandKit[]> => {

    const session = await checkServerAuth(headers)

    if (session.user.id !== userId) {
        throw new Error("Not authorized")
    }

    const brandKits = await prisma.brandKit.findMany({
        where: {
            userId
        }
    });

    return brandKits;

}

/**
 * Completes a brand kit by updating its status and outputs, deducts tokens from the user,
 * and creates a token transaction record. All operations are performed atomically in a single transaction.
 *
 * @param brandKitId - The ID of the brand kit to complete.
 * @param outputs - The outputs to associate with the completed brand kit.
 * @param userId - The ID of the user whose tokens will be deducted.
 * @param tokenCost - The number of tokens to deduct from the user.
 * @returns A Promise resolving to a tuple containing:
 *   [0] The updated BrandKit,
 *   [1] The updated User (with tokens deducted),
 *   [2] The created TokenTransaction record.
 * All operations are performed in a single transaction; if any step fails, no changes are applied.
 */
export const completeBrandKitWithTokenDeduction = async (brandKitId: string, outputs: BrandKit["outputs"], userId: string, tokensConsumed: number): Promise<[
    BrandKit,
    User,
    TokenTransaction
]> => {


    return await prisma.$transaction([
        // Update BrandKit status and outputs
        prisma.brandKit.update({
            where: {
                id: brandKitId
            },
            data: {
                status: BrandKitStatus.COMPLETED,
                outputs
            }
        }),
        // Deduct tokens from user
        prisma.user.update({
            where: { id: userId },
            data: { tokens: { decrement: tokensConsumed } }
        }),
        // Create token transaction record
        prisma.tokenTransaction.create({
            data: {
                userId,
                type: "CONSUME",
                tokens: tokensConsumed,
            }
        })
    ])


}