"use client"

import Card from '@/components/Card/Card'
import React from 'react'
import Text from '@/components/typography/Text/Text'
import Stack from '@/components/layout/Stack/Stack'
import Heading from '@/components/typography/Heading/Heading'
import FlexBox from '@/components/layout/FlexBox/FlexBox'
import Button from '@/components/Button/Button'
import useCheckout from '@/hooks/useCheckout'
import { StripeProduct } from '@/lib/stripe/getProducts'



const ProductCard = ({ product } : { product: StripeProduct }) => {

    const { handleCheckout, isLoading, error, clearError } = useCheckout()


    const handleBuy = async () => {
        try {
            clearError()
            await handleCheckout(product.id)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Card variant="elevated" interactive className="w-48">

            <Card.Body>
                <Stack gap="3">
                    <Heading type="h4">{product.name}</Heading>
                    <FlexBox justify="between" items="center">
                        <Text size="lg" bold color="primary">
                            ${product.price}
                        </Text>
                    </FlexBox>
                </Stack>
            </Card.Body>

            <Card.Footer>
                <Button
                    variant='primary'
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                    onClick={handleBuy}
                >
                    Buy Now
                </Button>
                {error && (
                    <Text size="sm" color="error" className="mt-2">
                        {error}
                    </Text>
                )}
            </Card.Footer>
        </Card>
    )
}

export default ProductCard