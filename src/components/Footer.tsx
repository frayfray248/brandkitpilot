import Box from '@/components/layout/Box/Box'
import FlexBox from '@/components/layout/FlexBox/FlexBox'
import Stack from '@/components/layout/Stack/Stack'
import Text from '@/components/typography/Text/Text'
import React from 'react'

const Footer = () => {
    return (
        <Box padding='4' className='border-t border-gray-200'>
            <Box padding='2'>
                <FlexBox>
                    <Stack direction='row' gap='4'>
                        <Text color="neutral" as="a" href="/" >Home</Text>
                        <Text color="neutral" as="a" href="/legal/terms" >Terms</Text>
                        <Text color="neutral" as="a" href="/legal/privacy" >Privacy</Text>
                    </Stack>
                </FlexBox>
            </Box>
            <Box padding='2'>
                <FlexBox>
                    <Stack direction='row' gap='4'>
                        <Text size="xs">© {new Date().getFullYear()} BrandKit. All rights reserved.</Text>
                    </Stack>
                </FlexBox>
            </Box>
        </Box>
    )
}

export default Footer