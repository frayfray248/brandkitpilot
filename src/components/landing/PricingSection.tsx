import Box from '@/components/layout/Box/Box';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import getProducts, { type StripeProduct } from '@/lib/stripe/getProducts';

const benefits = [
    'Pay only for what you use — no subscriptions',
    'Your brand kits belong to you forever',
    'Unlimited exports in all formats',
    'Easy to recharge via Stripe',
    'No hidden fees',
];

export default async function PricingSection() {
    let products: StripeProduct[] = [];
    try {
        products = (await getProducts()).sort((a, b) => a.tokens - b.tokens);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }

    return (
        <Box as="section" padding="8" bgColor="base-100" id="pricing">
            <Stack gap="8" className="max-w-3xl mx-auto">
                <Stack gap="2" className="text-center">
                    <Heading type="h2" className="text-3xl font-bold">
                        Simple, Token-Based Pricing
                    </Heading>
                    <Text size="lg" color="base-content">
                        1 token = 1 brand kit. Buy tokens, use them whenever you want.
                    </Text>
                </Stack>

                <Stack as="ul" gap="3">
                    {benefits.map((benefit, index) => (
                        <FlexBox 
                            key={index} 
                            as="li"
                            items="center" 
                            gap="3"
                        >
                            <Text color="success" className="flex-shrink-0">
                                ✓
                            </Text>
                            <Text size="lg" color="base-content">
                                {benefit}
                            </Text>
                        </FlexBox>
                    ))}
                </Stack>

                <Box bgColor="base-200" padding="6" className="rounded-lg">
                    <Stack gap="4">
                        <Heading type="h3" className="text-xl font-semibold text-center">
                            Token Packs
                        </Heading>
                        {products.length > 0 ? (
                            <Stack as="ul" gap="3">
                                {products.map((product) => (
                                    <FlexBox 
                                        key={product.id} 
                                        as="li"
                                        justify="between"
                                        items="center"
                                        className="border-b border-base-300 pb-3 last:border-b-0 last:pb-0"
                                    >
                                        <Text size="lg" color="base-content">
                                            {product.tokens} {product.tokens === 1 ? 'token' : 'tokens'}
                                        </Text>
                                        <Text size="lg" color="primary" className="font-bold">
                                            ${product.price}
                                        </Text>
                                    </FlexBox>
                                ))}
                            </Stack>
                        ) : (
                            <Text color="neutral" className="text-center">
                                Pricing information unavailable. Please try again later.
                            </Text>
                        )}
                    </Stack>
                </Box>

                <FlexBox justify="center">
                    <Link href="/checkout">
                        <Button variant="primary" size="lg">
                            Buy Tokens
                        </Button>
                    </Link>
                </FlexBox>
            </Stack>
        </Box>
    );
}
