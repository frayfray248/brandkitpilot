import prisma from "@/db/db";
import { BrandKit, BrandKitStatus } from "../../../generated/prisma";
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