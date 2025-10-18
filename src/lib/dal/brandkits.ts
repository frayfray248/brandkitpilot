import prisma from "@/db/db";
import { BrandKitStatus } from "../../../generated/prisma";
import { checkServerAuth } from "@/lib/auth/server/session";
import { headers } from "next/headers";

export const createBrandKit = async (userId: string, title: string) => {

    const createdBrandKit = await prisma.brandKit.create({
        data: {
            userId,
            title
        }
    });

    return createdBrandKit;

}

export const updateBrandKit = async (brandKitId: string, status: BrandKitStatus) => {

    const updatedBrandKit = await prisma.brandKit.update({
        where: {
            id: brandKitId
        },
        data: {
            status
        }
    });

    return updatedBrandKit;

}

export const getBrandKitById = async (getBrandKitId: string) => {

    await checkServerAuth(headers)

    const brandKit = await prisma.brandKit.findUnique({
        where: {
            id: getBrandKitId
        }
    });

    return brandKit;

}

export const getAllBrandKitsByUserId = async (userId: string) => {

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