"use client"

import React, { useState } from "react";
import Box from '@/components/layout/Box/Box';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";
import Card from '@/components/Card/Card';
import Badge from '@/components/Badge/Badge';
import Toast from '@/components/Toast/Toast';
import Button from '@/components/Button/Button';
import ExportButton from '@/components/ExportButton/ExportButton';
import BrandKitResultsPoller from "./BrandKitResultsPoller";
import useClipboard from '@/hooks/useClipboard';
import { BrandKitStatus } from "@/generated/prisma";

// Icons for copy button states
const CopyIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
        />
    </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
        />
    </svg>
);

// Section copy button using existing Button component
interface SectionCopyButtonProps {
    text: string;
    sectionTitle: string;
    onCopySuccess: (title: string) => void;
    onCopyError: (error: string) => void;
}

const SectionCopyButton = ({ text, sectionTitle, onCopySuccess, onCopyError }: SectionCopyButtonProps) => {
    const { copy, copied } = useClipboard({ resetDelay: 2000 });

    const handleClick = async () => {
        try {
            await copy(text);
            onCopySuccess(sectionTitle);
        } catch (err) {
            onCopyError(err instanceof Error ? err.message : 'Copy failed');
        }
    };

    return (
        <Button
            variant="base"
            size="sm"
            onClick={handleClick}
            aria-label={copied ? "Copied!" : `Copy ${sectionTitle} to clipboard`}
            title={copied ? "Copied!" : "Copy to clipboard"}
            className="!p-1.5"
        >
            {copied ? (
                <CheckIcon className="w-5 h-5 text-success" />
            ) : (
                <CopyIcon className="w-5 h-5" />
            )}
        </Button>
    );
};

interface ToastState {
    visible: boolean;
    message: string;
    variant: 'success' | 'error';
}

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
    const [toast, setToast] = useState<ToastState>({ visible: false, message: '', variant: 'success' });

    const showToast = (message: string, variant: 'success' | 'error') => {
        setToast({ visible: true, message, variant });
        setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
        }, 3000);
    };

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

    const handleStatusChange = (newStatus: BrandKitStatus, outputs: Array<{ title: string; content: string }>, title: string) => {
        setBrandKit(prev => ({
            ...prev,
            status: newStatus,
            outputs: outputs || prev.outputs,
            title: title || prev.title
        }));
    };

    const handleCopySuccess = (sectionTitle: string) => {
        showToast(`${sectionTitle} copied to clipboard`, 'success');
    };

    const handleCopyError = (error: string) => {
        showToast(error || 'Failed to copy to clipboard', 'error');
    };

    const handleExportSuccess = (format: string) => {
        showToast(`Brand kit exported as ${format.toUpperCase()}`, 'success');
    };

    const handleExportError = (error: string) => {
        showToast(error || 'Failed to export brand kit', 'error');
    };

    return (
        <>
            <Stack gap="8">
                <Box>
                    <FlexBox justify="between" items="start" gap="4" className="flex-wrap">
                        <Stack gap="4">
                            <Heading type="h1">{brandKit.title}</Heading>
                            <Badge variant={getStatusBadgeVariant(brandKit.status)}>
                                {brandKit.status}
                            </Badge>
                        </Stack>
                        {brandKit.status === 'COMPLETED' && (
                            <ExportButton
                                brandKitId={brandKit.id}
                                brandKitTitle={brandKit.title}
                                variant="secondary"
                                onExportSuccess={handleExportSuccess}
                                onExportError={handleExportError}
                            />
                        )}
                    </FlexBox>
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
                                <Card key={index} padding="4">
                                    <Stack gap="3">
                                        <FlexBox justify="between" items="center">
                                            <Heading type="h3">{section.title}</Heading>
                                            <SectionCopyButton 
                                                text={section.content}
                                                sectionTitle={section.title}
                                                onCopySuccess={handleCopySuccess}
                                                onCopyError={handleCopyError}
                                            />
                                        </FlexBox>
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

            {toast.visible && (
                <Toast
                    variant={toast.variant}
                    position="bottom-right"
                    message={toast.message}
                    showCloseButton
                    onClose={() => setToast(prev => ({ ...prev, visible: false }))}
                />
            )}
        </>
    );
};

export default ResultsPageClient;
