import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import ProductCard from "@/components/ProductCard";
import Stack from "@/components/layout/Stack/Stack";
import getProducts from "@/lib/stripe/getProducts";
import { checkServerAuth } from "@/lib/auth/server/session";
import { headers } from "next/headers";

const CheckoutPage = async () => {

    await checkServerAuth(headers)

    const products = (await getProducts()).sort((a, b) => a.tokens - b.tokens);

    return (
        <Stack gap="8">
            <Heading type="h1">Checkout</Heading>

            <Box className="bg-base-200">
                <Stack gap="6" direction="row" wrap="wrap">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
};

export default CheckoutPage;
