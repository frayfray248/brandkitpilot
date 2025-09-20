

import React from 'react';
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';

const page = async () => {


    return (
        <Box>
            <Heading type="h1" className="mb-4">Dashboard</Heading>
            <Text>This is the dashboard page.</Text>
        </Box>
    );
}

export default page