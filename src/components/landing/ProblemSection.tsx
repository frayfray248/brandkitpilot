import Box from '@/components/layout/Box/Box';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';

const painPoints = [
    'Customers keep choosing competitors who communicate better',
    'Marketing spend underperforms because your message doesn\'t resonate',
    'You waste time rewriting copy that still doesn\'t feel right',
    'More opportunities slip away while you struggle to find the right words',
];

export default function ProblemSection() {
    return (
        <Box as="section" padding="8" bgColor="base-200">
            <Stack gap="6" className="max-w-3xl mx-auto">
                <Stack gap="2" className="text-center">
                    <Heading type="h2" className="text-3xl font-bold">
                        Sound Familiar?
                    </Heading>
                </Stack>

                <Text size="lg" color="base-content" className="text-center">
                    Crafting brand messaging is hard—you know your business inside and out, but turning it into words that resonate with customers is a different skill. You shouldn&apos;t have to spend thousands on agencies or lose weeks learning copywriting just to communicate your value.
                </Text>

                <Stack as="ul" gap="3" className="mt-4">
                    {painPoints.map((point, index) => (
                        <FlexBox 
                            key={index} 
                            as="li"
                            items="start" 
                            gap="3"
                            className="text-left"
                        >
                            <Text color="error" className="flex-shrink-0 mt-1">
                                ✗
                            </Text>
                            <Text size="lg" color="base-content">
                                {point}
                            </Text>
                        </FlexBox>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}
