import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';

const PrivacyPage = () => {
    return (
        <Box>
            <Heading type="h1" className="mb-4">Privacy Policy</Heading>
            <Text>This is the privacy policy page.</Text>
        </Box>
    );
};

export default PrivacyPage;
