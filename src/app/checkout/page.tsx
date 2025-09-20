import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';

const CheckoutPage = () => {
    return (
        <Box>
            <Heading type="h1" className="mb-4">Checkout</Heading>
            <Text>This is the checkout page.</Text>
        </Box>
    );
};

export default CheckoutPage;
