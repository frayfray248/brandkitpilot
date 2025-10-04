import React from "react";
import Box from '@/components/layout/Box/Box';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Stack from "@/components/layout/Stack/Stack";

const PrivacyPage = () => {
    return (
        <Stack gap="8">
            <Heading type="h1">Privacy Policy</Heading>
            <Box bgColor="base-100" padding="6" className="rounded-lg">
                <Stack gap="6">
                    <Text color="base-300" size="sm">
                        Last updated: October 4, 2025
                    </Text>

                    <Stack gap="4">
                        <Heading type="h2">1. Introduction</Heading>
                        <Text>
                            BrandKit Pilot (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">2. Information We Collect</Heading>
                        <Text>
                            We may collect information about you in a variety of ways. The information we may collect includes:
                        </Text>
                        
                        <Stack gap="3">
                            <Heading type="h3">Personal Information</Heading>
                            <Text>
                                We may collect personally identifiable information, such as your name, email address, and business information that you voluntarily give to us when you register with the Service or when you choose to participate in various activities related to the Service.
                            </Text>
                        </Stack>

                        <Stack gap="3">
                            <Heading type="h3">Usage Data</Heading>
                            <Text>
                                We may automatically collect certain information when you visit, use, or navigate the Service. This information may include device information, browser information, IP address, and usage patterns.
                            </Text>
                        </Stack>

                        <Stack gap="3">
                            <Heading type="h3">Cookies and Tracking Technologies</Heading>
                            <Text>
                                We may use cookies, web beacons, tracking pixels, and other tracking technologies to collect and store your information.
                            </Text>
                        </Stack>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">3. How We Use Your Information</Heading>
                        <Text>
                            We may use the information we collect about you for various purposes, including to:
                        </Text>
                        <Box className="ml-4">
                            <Stack gap="2">
                                <Text>• Provide, operate, and maintain our Service</Text>
                                <Text>• Improve, personalize, and expand our Service</Text>
                                <Text>• Understand and analyze how you use our Service</Text>
                                <Text>• Develop new products, services, features, and functionality</Text>
                                <Text>• Communicate with you for customer service and support</Text>
                                <Text>• Send you marketing and promotional communications</Text>
                                <Text>• Process your transactions and manage your orders</Text>
                                <Text>• Find and prevent fraud and abuse</Text>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">4. Information Sharing and Disclosure</Heading>
                        <Text>
                            We may share your information in the following situations:
                        </Text>
                        <Box className="ml-4">
                            <Stack gap="2">
                                <Text>• With your consent or at your direction</Text>
                                <Text>• With service providers who perform services on our behalf</Text>
                                <Text>• For legal reasons or to protect our rights</Text>
                                <Text>• In connection with a business transfer or merger</Text>
                                <Text>• With affiliates and business partners (with your consent)</Text>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">5. Data Security</Heading>
                        <Text>
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">6. Data Retention</Heading>
                        <Text>
                            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">7. Your Privacy Rights</Heading>
                        <Text>
                            Depending on your location, you may have the following rights regarding your personal information:
                        </Text>
                        <Box className="ml-4">
                            <Stack gap="2">
                                <Text>• The right to access your personal information</Text>
                                <Text>• The right to rectify inaccurate information</Text>
                                <Text>• The right to delete your personal information</Text>
                                <Text>• The right to restrict processing of your information</Text>
                                <Text>• The right to data portability</Text>
                                <Text>• The right to object to processing</Text>
                                <Text>• The right to withdraw consent</Text>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">8. Third-Party Services</Heading>
                        <Text>
                            Our Service may contain links to third-party websites, products, or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">9. Children&rsquo;s Privacy</Heading>
                        <Text>
                            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">10. International Data Transfers</Heading>
                        <Text>
                            Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from your jurisdiction.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">11. Changes to This Privacy Policy</Heading>
                        <Text>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. You are advised to review this Privacy Policy periodically for any changes.
                        </Text>
                    </Stack>

                    <Stack gap="4">
                        <Heading type="h2">12. Contact Information</Heading>
                        <Text>
                            If you have any questions about this Privacy Policy, please contact us at privacy@brandkitpilot.com.
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};

export default PrivacyPage;
