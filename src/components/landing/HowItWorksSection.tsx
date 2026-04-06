import Box from '@/components/layout/Box/Box';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Badge from '@/components/Badge/Badge';

const steps = [
    {
        number: '1',
        title: 'Choose Your Framework',
        description: 'Select a branding framework that fits your needs—StoryBrand, Brand Key, Brand Pyramid, and more.',
    },
    {
        number: '2',
        title: 'Answer Guided Questions',
        description: 'Tell us about your business, customers, and what makes you different through simple prompts.',
    },
    {
        number: '3',
        title: 'Get Your Brand Kit',
        description: 'Receive a complete, professionally written brand kit in minutes—not weeks. Export it in your favorite format and start using it right away.',
    },
];

export default function HowItWorksSection() {
    return (
        <Box as="section" padding="8" bgColor="base-100">
            <Stack gap="8" className="max-w-5xl mx-auto">
                <Stack gap="2" className="text-center">
                    <FlexBox justify="center">
                        <Badge variant="success" size="sm">
                            Instant results
                        </Badge>
                    </FlexBox>
                    <Heading type="h2" className="text-3xl font-bold">
                        How It Works
                    </Heading>
                </Stack>

                <FlexBox 
                    justify="center" 
                    gap="6" 
                    wrap="wrap"
                    className="mt-4"
                >
                    {steps.map((step) => (
                        <Box 
                            key={step.number}
                            padding="6" 
                            bgColor="base-100"
                            className="rounded-lg border border-base-300 flex-1 min-w-[280px] max-w-[350px]"
                        >
                            <Stack gap="4" className="text-center">
                                <FlexBox justify="center">
                                    <Box 
                                        className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold"
                                    >
                                        {step.number}
                                    </Box>
                                </FlexBox>
                                <Heading type="h3" className="text-xl font-semibold">
                                    {step.title}
                                </Heading>
                                <Text color="base-content">
                                    {step.description}
                                </Text>
                            </Stack>
                        </Box>
                    ))}
                </FlexBox>
            </Stack>
        </Box>
    );
}
