import React from 'react';
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import { getUser } from '@/lib/dal/users';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Button from '@/components/Button/Button';
import { redirect } from 'next/navigation';

const page = async () => {

    const user = await getUser()

    if (!user.termsAccepted.version) {
        redirect('/legal/accept')
    }

    return (
            <Stack gap="8">
                <Heading type="h1">Dashboard</Heading>

                <Box bgColor='base-100' padding='6' className='rounded-lg'>
                    <Stack gap="4">
                        <FlexBox justify='between' items='center'>
                            <Heading type="h2" className="text-2xl text-primary">Kits</Heading>
                            <Text color='secondary' className='text-lg'><a href="/start" >Create new Kit</a></Text>
                        </FlexBox>

                        <hr className='border-t border-base-300' />
                        <ul className="list-inside list-none text-secondary cursor-pointer">
                            <li>Amy&apos;s Family Bakery</li>
                            <li>John&apos;s Plumbing</li>
                            <li>Sarah&apos;s Salon</li>
                            <li>Mike&apos;s Gym</li>
                            <li>Linda&apos;s Boutique</li>
                        </ul>
                    </Stack>
                </Box>

                <Box bgColor='base-100' padding='6' className='rounded-lg'>
                    <Stack gap="4">
                        <Heading type="h2" className="text-2xl text-primary">Tokens</Heading>
                        <hr className='border-t border-base-300' />
                        <div className="grid md:grid-cols-3 gap-4 w-fit">
                            <Box>
                                <Text className="font-bold">Amount</Text>
                                <Text>{user.tokens}</Text>
                            </Box>
                            <Box className='flex items-center'>
                                <Text color='secondary' className='text-lg'><a href="/checkout" >Buy More Tokens</a></Text>
                            </Box>
                            <Box className='flex items-center'>
                                <Text color='secondary' className='text-lg'><a href="/purchases" >View Purchase History</a></Text>
                            </Box>
                        </div>

                    </Stack>
                </Box>

                <Box bgColor='base-100' padding='6' className='rounded-lg'>
                    <Stack gap="4">
                        <Heading type="h2" className="text-2xl text-primary">User Information</Heading>
                        <hr className='border-t border-base-300' />
                        <div className="grid md:grid-cols-3 gap-4 w-fit">
                            <Box>
                                <Text className="font-bold">Name</Text>
                                <Text>{user.name}</Text>
                            </Box>
                            <Box>
                                <Text className="font-bold">Email</Text>
                                <Text>{user.email}</Text>
                            </Box>
                            <Box>
                                <Text className="font-bold">Member Since</Text>
                                <Text>{user.createdAt.toDateString()}</Text>
                            </Box>
                        </div>
                        <div className='pt-4'>
                            <Button variant="error">Delete Account</Button>
                        </div>
                    </Stack>
                </Box>
            </Stack>
    );
}

export default page