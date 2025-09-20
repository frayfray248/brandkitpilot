import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';

const StartPage = () => {
    return (
        <Box>
            <Heading type="h1" className="mb-4">Start</Heading>
            <Text>This is the start page.</Text>
        </Box>
    );
};

export default StartPage;
