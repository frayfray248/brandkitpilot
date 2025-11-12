
import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Stack from "@/components/layout/Stack/Stack";
import NewBrandKitForm from "@/components/NewBrandKitForm";
import { getUser } from "@/lib/dal/users";
import { redirect } from "next/navigation";
import { getFrameworks } from "@/lib/dal/brandFrameworks";

const StartPage = async () => {

    const user = await getUser()

    if (!user.termsAccepted.version) {
        redirect('/legal/accept')
    }

    const frameworks = await getFrameworks()

    return (
        <Stack gap="8">
            <Heading type="h1">New Brand Kit</Heading>

            <Box bgColor='base-100' padding='6' className='rounded-lg'>
                <NewBrandKitForm frameworks={frameworks} />
            </Box>
        </Stack>
    );
};

export default StartPage;
