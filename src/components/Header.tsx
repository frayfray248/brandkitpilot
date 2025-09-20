"use client"

import { authClient } from '@/auth/authClient'
import Button from '@/components/Button/Button'
import Box from '@/components/layout/Box/Box'
import FlexBox from '@/components/layout/FlexBox/FlexBox'
import Stack from '@/components/layout/Stack/Stack'
import Heading from '@/components/typography/Heading/Heading'
import Text from '@/components/typography/Text/Text'
import { SIGNOUT_REDIRECT_URL } from '@/lib/auth/const'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {

    const { data: session, isPending } = authClient.useSession()
    const router = useRouter()

    const isLoggedIn = !isPending && session

    const handleSignout = async () => {
        await authClient.signOut()
        router.push(SIGNOUT_REDIRECT_URL)
    }

    return (
        <Box padding='4' className='border-b border-gray-200'>
            <FlexBox items="center">
                <div className='flex-1'>

                    <Stack direction='row' gap='4' className='items-center'>
                        <Heading type="h1" className='text-2xl font-bold'>BrandKit</Heading>
                        {isLoggedIn &&
                            <>
                                <Text color="primary" as="a" href="/" >Home</Text>
                                <Text color="primary" as="a" href="/dashboard" >Dashboard</Text>
                            </>
                        }
                    </Stack>
                </div>
                {isLoggedIn ?
                    <Stack direction='row' gap='4'>
                        <Text>{session.user.name}</Text>
                        <Button size='sm' onClick={handleSignout}>Sign Out</Button>
                    </Stack>
                    :
                    <Stack direction='row' gap='4'>
                        <Text color="primary" as="a" href="/login" >Login</Text>
                    </Stack>}
            </FlexBox>
        </Box>
    )
}

export default Header