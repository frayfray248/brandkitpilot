"use client"

import React, { useState } from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";
import Card from '@/components/Card/Card';
import Badge from '@/components/Badge/Badge';
import BrandKitResultsPoller from "./BrandKitResultsPoller";
import { BrandKitStatus } from "@/generated/prisma";

interface ResultsPageClientProps {
    brandKit: {
        id: string;
        title: string;
        status: BrandKitStatus;
        outputs: Array<{
            title: string;
            content: string;
        }>;
    };
}

const ResultsPageClient = ({ brandKit: initialBrandKit }: ResultsPageClientProps) => {
    const [brandKit, setBrandKit] = useState(initialBrandKit);

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

    const handleStatusChange = (newStatus: BrandKitStatus, outputs: any[]) => {
        setBrandKit(prev => ({
            ...prev,
            status: newStatus,
            outputs: outputs || prev.outputs
        }));
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

            {brandKit.status === 'PENDING' ? (
                <BrandKitResultsPoller
                    brandKitId={brandKit.id}
                    initialStatus={brandKit.status}
                    initialTitle={brandKit.title}
                    onStatusChange={handleStatusChange}
                />
            ) : brandKit.status === 'COMPLETED' && brandKit.outputs && Array.isArray(brandKit.outputs) && brandKit.outputs.length > 0 ? (
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

export default ResultsPageClient;
