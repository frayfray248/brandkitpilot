import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';

interface ResultsPageProps {
    params: Promise<{ id: string }>;
}

const ResultsPage = async ({ params }: ResultsPageProps) => {

    const { id } = await params;

    return (
        <Box>
            <Heading type="h1" className="mb-4">Results</Heading>
            <Text>Showing results for ID: {id}</Text>
        </Box>
    );
};

export default ResultsPage;
