

import React from 'react';
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import { getUser } from '@/lib/dal/users';
import Table from '@/components/Table/Table';

const page = async () => {

    const user = await getUser()

    return (
        <Box>
            <Heading type="h1" className="mb-4">Dashboard</Heading>
            <Text>This is the dashboard page.</Text>
            <Table variant="bordered" className='max-w-fit'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Tokens</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.tokens} <Text color="primary" as="a" href="/checkout" >Refill</Text></td>
                    </tr>
                </tbody>
            </Table>
        </Box>
    );
}

export default page