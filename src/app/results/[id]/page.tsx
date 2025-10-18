import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";
import { getUser } from "@/lib/dal/users";
import { notFound, redirect } from "next/navigation";
import { getBrandKitById } from "@/lib/dal/brandkits";

interface ResultsPageProps {
    params: Promise<{ id: string }>;
}

const ResultsPage = async ({ params }: ResultsPageProps) => {

    const { id : brandKitId } = await params;

    const user = await getUser()

    if (!user.termsAccepted.version) {
        redirect('/legal/accept')
    }

    const brandKit = await getBrandKitById(brandKitId)

    if (!brandKit) notFound()

    return (
        <Stack gap="8">
            <Heading type="h1">BrandKit: {brandKit.title}</Heading>

            <Box bgColor='base-100' padding='6' className='rounded-lg max-w-sm'>
                <Text>Status: {brandKit.status}</Text>
            </Box>
        </Stack>
    );
};

export default ResultsPage;
