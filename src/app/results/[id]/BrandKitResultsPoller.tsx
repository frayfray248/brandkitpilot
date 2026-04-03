"use client"

import React, { useEffect, useRef, useState } from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";
import Card from '@/components/Card/Card';
import Badge from '@/components/Badge/Badge';
import { BrandKitStatus } from "@/generated/prisma";
import { getBrandKitStatus } from "@/lib/dal/brandkits";

type BrandKitOutput = { title: string; content: string };

interface BrandKitResultsPollerProps {
    brandKitId: string;
    initialStatus: BrandKitStatus;
    initialTitle: string;
    onStatusChange: (status: BrandKitStatus, outputs: BrandKitOutput[], title: string) => void;
}

/**
 * Client component that handles polling for brand kit generation status.
 * 
 * Features:
 * - Polls server for status updates while status is pending
 * - Implements exponential backoff with bounded retries for error handling
 * - Stops polling when terminal state is reached (COMPLETED, FAILED)
 * - Cleans up interval on unmount
 * - Prevents duplicate requests
 * 
 * Polling strategy:
 * - Initial poll interval: 2 seconds
 * - Max interval: 30 seconds
 * - Max retries: 5 consecutive errors before stopping
 */
export default function BrandKitResultsPoller({
    brandKitId,
    initialStatus,
    initialTitle,
    onStatusChange,
}: BrandKitResultsPollerProps) {
    const [status, setStatus] = useState<BrandKitStatus>(initialStatus);
    const [isPolling, setIsPolling] = useState(initialStatus === "PENDING");
    const [errorCount, setErrorCount] = useState(0);
    
    // Refs to prevent dependency array issues and manage polling state
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const currentIntervalRef = useRef(2000); // Start with 2 second interval
    const isPollingRef = useRef(initialStatus === "PENDING");

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

    useEffect(() => {
        if (!isPollingRef.current) {
            return;
        }

        const pollStatus = async () => {
            try {
                const result = await getBrandKitStatus(brandKitId);
                
                if (!result) {
                    setErrorCount(prev => prev + 1);
                    return;
                }

                // Reset error count on successful poll
                setErrorCount(0);

                // Check if status has changed
                if (result.status !== status) {
                    setStatus(result.status);
                    onStatusChange(result.status, result.outputs, result.title);

                    // Stop polling if terminal state reached
                    if (result.status === "COMPLETED" || result.status === "FAILED") {
                        isPollingRef.current = false;
                        setIsPolling(false);
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                    }
                }
            } catch (error) {
                console.error("Error polling brand kit status:", error);
                setErrorCount(prev => {
                    const newCount = prev + 1;
                    // Stop polling after 5 consecutive errors
                    if (newCount >= 5) {
                        isPollingRef.current = false;
                        setIsPolling(false);
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                    }
                    return newCount;
                });
            }
        };

        // Set up polling interval with exponential backoff
        intervalRef.current = setInterval(() => {
            pollStatus();

            // Increase interval up to 30 seconds (exponential backoff: 2s → 4s → 8s → 16s → 30s)
            if (currentIntervalRef.current < 30000) {
                currentIntervalRef.current = Math.min(currentIntervalRef.current * 2, 30000);
                // Clear and reset interval to apply new timing
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                intervalRef.current = setInterval(pollStatus, currentIntervalRef.current);
            }
        }, currentIntervalRef.current);

        // Initial poll
        pollStatus();

        // Cleanup on unmount or when polling stops
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [brandKitId, status, onStatusChange]);

    if (status === "PENDING") {
        return (
            <Card>
                <Stack gap="3">
                    <Heading type="h3">Processing Your Brand Kit</Heading>
                    <Text>Your brand kit is being generated. Please check back in a few moments.</Text>
                    {errorCount > 0 && (
                        <Text className="text-sm text-warning">
                            {errorCount >= 5 
                                ? "Connection lost. Please refresh the page if generation completes."
                                : `Checking status... (Attempt ${errorCount})`
                            }
                        </Text>
                    )}
                </Stack>
            </Card>
        );
    }

    if (status === "FAILED") {
        return (
            <Card>
                <Stack gap="3">
                    <Heading type="h3">Generation Failed</Heading>
                    <Text>There was an issue generating your brand kit. Please try creating a new one or contact support.</Text>
                </Stack>
            </Card>
        );
    }

    // Completed state - this should be replaced by parent when status changes
    return null;
}
