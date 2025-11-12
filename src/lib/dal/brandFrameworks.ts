"use server"

import prisma from "@/db/db"
import { checkServerAuth } from "@/lib/auth/server/session"
import { headers } from "next/headers"

export const getFrameworks = async () => {

    await checkServerAuth(headers)

    const frameworks = await prisma.brandFramework.findMany()
    
    return frameworks

}

export const getFrameworkBySlug = async (slug: string) => {


    const framework = await prisma.brandFramework.findUnique({
        where: {
            slug: slug
        }
    });

    return framework;

}