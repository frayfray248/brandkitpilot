import Box from '@/components/layout/Box/Box'
import Stack from '@/components/layout/Stack/Stack'
import LoginForm from '@/components/LoginForm'
import Heading from '@/components/typography/Heading/Heading'
import React from 'react'

const page = () => {
    return (
        <Stack gap="8" className="items-center">
            <Heading type="h1">Login</Heading>

            <Box bgColor='base-100' padding='6' className='rounded-lg max-w-sm'>
                <LoginForm />
            </Box>
        </Stack>
    )
}

export default page