import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";
import Card from '@/components/Card/Card';
import Badge from '@/components/Badge/Badge';
import { getUser } from "@/lib/dal/users";
import { notFound, redirect } from "next/navigation";
import { getBrandKitById } from "@/lib/dal/brandkits";

interface ResultsPageProps {
    params: Promise<{ id: string }>;
}

const ResultsPage = async ({ params }: ResultsPageProps) => {

    const { id : brandKitId } = await params;

    const user = await getUser()

    if (!user.termsAccepted.version) {
        redirect('/legal/accept')
    }

    const brandKit = await getBrandKitById(brandKitId)

    if (!brandKit) notFound()

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'PENDING':
                return 'warning';
            case 'FAILED':
                return 'error';
            default:
                return 'base-200';
        }
    };

    return (
        <Stack gap="8">
            <Box>
                <Stack gap="4">
                    <Heading type="h1">{brandKit.title}</Heading>
                    <Badge variant={getStatusBadgeVariant(brandKit.status)}>
                        {brandKit.status}
                    </Badge>
                </Stack>
            </Box>

            {brandKit.status === 'COMPLETED' && brandKit.outputs && Array.isArray(brandKit.outputs) && brandKit.outputs.length > 0 ? (
                <Stack gap="6">
                    <Heading type="h2">Your Brand Kit Results</Heading>
                    <Stack gap="4">
                        {brandKit.outputs.map((section, index) => (
                            <Card key={index}>
                                <Stack gap="3">
                                    <Heading type="h3">{section.title}</Heading>
                                    <Text className="whitespace-pre-wrap">{section.content}</Text>
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
            ) : brandKit.status === 'PENDING' ? (
                <Card>
                    <Stack gap="3">
                        <Heading type="h3">Processing Your Brand Kit</Heading>
                        <Text>Your brand kit is being generated. Please check back in a few moments.</Text>
                    </Stack>
                </Card>
            ) : brandKit.status === 'FAILED' ? (
                <Card>
                    <Stack gap="3">
                        <Heading type="h3">Generation Failed</Heading>
                        <Text>There was an issue generating your brand kit. Please try creating a new one or contact support.</Text>
                    </Stack>
                </Card>
            ) : (
                <Card>
                    <Stack gap="3">
                        <Heading type="h3">No Results Available</Heading>
                        <Text>This brand kit doesn&apos;t have any generated content yet.</Text>
                    </Stack>
                </Card>
            )}
        </Stack>
    );
};

export default ResultsPage;
