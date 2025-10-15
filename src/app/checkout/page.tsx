import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import ProductCard from "@/components/ProductCard";
import Stack from "@/components/layout/Stack/Stack";
import getProducts from "@/lib/stripe/getProducts";
import { getUser } from "@/lib/dal/users";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {

    const user = await getUser()

    if (!user.termsAccepted.version) {
        redirect('/legal/accept')
    }

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
