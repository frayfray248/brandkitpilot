import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import ProductCard from "@/components/ProductCard";
import Stack from "@/components/layout/Stack/Stack";
import getProducts from "@/lib/stripe/getProducts";
import { checkServerAuth } from "@/lib/auth/server/session";
import { headers } from "next/headers";

const CheckoutPage = async () => {

    await checkServerAuth(headers)

    const products = await getProducts();

    return (
        <Box>
            <Heading type="h1" className="mb-4">Checkout</Heading>
            <Text>This is the checkout page.</Text>

            <Box>
                <Stack gap="6" className="my-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Stack>
            </Box>


        </Box>
    );
};

export default CheckoutPage;
