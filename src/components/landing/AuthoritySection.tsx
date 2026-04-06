import Box from '@/components/layout/Box/Box';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Badge from '@/components/Badge/Badge';

const frameworks = [
    'StoryBrand',
    'Brand Key',
    'Brand Pyramid',
];

export default function AuthoritySection() {
    return (
        <Box as="section" padding="8" bgColor="base-100">
            <Stack gap="6" className="max-w-3xl mx-auto text-center">
                <Stack gap="2">
                    <FlexBox justify="center">
                        <Badge variant="primary" size="sm">
                            Trusted frameworks
                        </Badge>
                    </FlexBox>
                    <Heading type="h2" className="text-3xl font-bold">
                        Expert-Level Brand Messaging
                    </Heading>
                </Stack>

                <Text size="lg" color="base-content">
                    BrandKitPilot combines proven branding frameworks with advanced AI to deliver expert-level brand messaging—and has helped thousands of entrepreneurs launch with clarity and confidence.
                </Text>

                <FlexBox justify="center" gap="4" wrap="wrap">
                    {frameworks.map((framework) => (
                        <Box 
                            key={framework}
                            padding="3"
                            bgColor="base-100"
                            className="rounded-lg border border-base-300"
                        >
                            <Text color="base-content" className="font-medium">
                                {framework}
                            </Text>
                        </Box>
                    ))}
                </FlexBox>
            </Stack>
        </Box>
    );
}
