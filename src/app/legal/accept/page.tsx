"use client"

import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth/authClient";
import { userAcceptTerms } from "@/lib/dal/users";


// temporary until we fetch terms data from the backend
const TERMS_VERSION = "v1";

const LegalAcceptPage = () => {

    const router = useRouter()

    const handleAccept = async () => {

        await userAcceptTerms(TERMS_VERSION)
        router.push('/dashboard')

    }

    const handleDecline = async () => {
        await authClient.signOut()
        router.push('/')
    }

    return (
        <Stack gap="8">
            <Heading type="h1">Terms of Service</Heading>
            <Box bgColor="base-100" padding="6" className="rounded-lg">
                <Stack gap="6">
                    <Text size="sm">
                        Last updated: October 4, 2025
                    </Text>

                    <Stack gap="4">
                        <Heading type="h2">1. Acceptance of Terms</Heading>
                        <Text>
                            By accessing and using BrandKit Pilot (&ldquo;the Service&rdquo;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">2. Description of Service</Heading>
                        <Text>
                            BrandKit Pilot is a web-based application that provides brand strategy and design tools. The Service allows users to create brand kits, generate branding materials, and access various branding frameworks and resources.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">3. User Accounts</Heading>
                        <Text>
                            To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">4. User Content</Heading>
                        <Text>
                            You retain ownership of any content you submit, post, or display on or through the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content solely for the purpose of providing the Service.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">5. Prohibited Uses</Heading>
                        <Text>
                            You may not use the Service for any illegal or unauthorized purpose. You agree not to:
                        </Text>
                        <Box className="ml-4">
                            <Stack gap="2">
                                <Text>• Violate any applicable laws or regulations</Text>
                                <Text>• Infringe upon the rights of others</Text>
                                <Text>• Upload malicious code or attempt to gain unauthorized access</Text>
                                <Text>• Use the Service to harass, abuse, or spam other users</Text>
                                <Text>• Attempt to reverse engineer or copy any features of the Service</Text>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">6. Payment Terms</Heading>
                        <Text>
                            Certain features of the Service may require payment. All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing at any time, with reasonable notice to existing subscribers.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">7. Intellectual Property</Heading>
                        <Text>
                            The Service and its original content, features, and functionality are owned by BrandKit Pilot and are protected by international copyright, trademark, and other intellectual property laws.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">8. Disclaimer of Warranties</Heading>
                        <Text>
                            The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the Service.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">9. Limitation of Liability</Heading>
                        <Text>
                            In no event shall BrandKit Pilot be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">10. Termination</Heading>
                        <Text>
                            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">11. Changes to Terms</Heading>
                        <Text>
                            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">12. Contact Information</Heading>
                        <Text>
                            If you have any questions about these Terms of Service, please contact us at legal@brandkitpilot.com.
                        </Text>
                    </Stack>
                    <Stack gap="4" direction="row">
                        <Button variant="error" onClick={handleDecline}>Disagree</Button>
                        <Button variant="success" onClick={handleAccept}>Agree</Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};

export default LegalAcceptPage;
