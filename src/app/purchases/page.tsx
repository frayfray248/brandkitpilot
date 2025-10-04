import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";
import FlexBox from "@/components/layout/FlexBox/FlexBox";
import { getUserTokenTransactions } from "@/lib/dal/tokenTransactions";
import Table from "@/components/Table/Table";

const PurchasesPage = async () => {

    const transactions = await getUserTokenTransactions()

    return (
        <Stack gap="8">
            <Heading type="h1">Purchases</Heading>

            <Box bgColor='base-100' padding='6' className='rounded-lg'>

                <Table zebra variant="bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th className="text-right">Tokens</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.createdAt.toLocaleDateString()}</td>
                                <td>{transaction.type}</td>
                                <td className="text-right">{transaction.tokens}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Box>
        </Stack>
    );
};

export default PurchasesPage;
