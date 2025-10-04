import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";

interface ResultsPageProps {
    params: Promise<{ id: string }>;
}

const ResultsPage = async ({ params }: ResultsPageProps) => {

    const { id } = await params;

    return (
        <Stack gap="8">
            <Heading type="h1">Results</Heading>

            <Box bgColor='base-100' padding='6' className='rounded-lg max-w-sm'>
                <Text>Showing results for ID: {id}</Text>
            </Box>
        </Stack>
    );
};

export default ResultsPage;
