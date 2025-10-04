import Box from '@/components/layout/Box/Box'
import Stack from '@/components/layout/Stack/Stack'
import SignupForm from '@/components/SignupForm'
import Heading from '@/components/typography/Heading/Heading'
import React from 'react'

const page = () => {
    return (
        <Stack gap="8" className="items-center">
            <Heading type="h1">Signup</Heading>

            <Box bgColor='base-100' padding='6' className='rounded-lg max-w-sm'>
                <SignupForm />
            </Box>
        </Stack>
    )
}

export default page