import Box from '@/components/layout/Box/Box';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Card from '@/components/Card/Card';

const testimonials = [
    {
        quote: "BrandKitPilot saved me weeks of back-and-forth with copywriters. I had professional brand messaging for my startup in under an hour.",
        name: "Sarah Chen",
        title: "Founder, TechFlow Labs",
    },
    {
        quote: "As a solopreneur, I couldn't afford a branding agency. This tool gave me the same quality output at a fraction of the cost.",
        name: "Marcus Johnson",
        title: "Independent Consultant",
    },
];

export default function SocialProofSection() {
    return (
        <Box as="section" padding="8" bgColor="base-200">
            <Stack gap="8" className="max-w-5xl mx-auto">
                <Heading type="h2" className="text-3xl font-bold text-center">
                    What Our Users Say
                </Heading>

                <FlexBox 
                    justify="center" 
                    gap="6" 
                    wrap="wrap"
                >
                    {testimonials.map((testimonial, index) => (
                        <Card 
                            key={index}
                            variant="elevated"
                            padding="6"
                            className="flex-1 min-w-[300px] max-w-[450px]"
                        >
                            <Stack gap="4">
                                <Text 
                                    size="lg" 
                                    color="base-content" 
                                    className="italic"
                                >
                                    &ldquo;{testimonial.quote}&rdquo;
                                </Text>
                                <Stack gap="1">
                                    <Text color="base-content" className="font-semibold">
                                        {testimonial.name}
                                    </Text>
                                    <Text size="sm" color="neutral">
                                        {testimonial.title}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Card>
                    ))}
                </FlexBox>

                <Text size="sm" color="neutral" className="text-center">
                    * Placeholder testimonials for demonstration purposes
                </Text>
            </Stack>
        </Box>
    );
}
