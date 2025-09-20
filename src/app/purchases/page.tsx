import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';

const PurchasesPage = () => {
    return (
        <Box>
            <Heading type="h1" className="mb-4">Purchases</Heading>
            <Text>This is the purchases page.</Text>
        </Box>
    );
};

export default PurchasesPage;
