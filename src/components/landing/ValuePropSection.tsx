import Box from '@/components/layout/Box/Box';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Badge from '@/components/Badge/Badge';

const benefits = [
    'Capture attention and build trust with customers',
    'Launch marketing campaigns with confidence',
    'Stand out in your market and grow your business',
    'Convert more visitors into paying customers',
];

export default function ValuePropSection() {
    return (
        <Box as="section" padding="8" bgColor="base-200">
            <Stack gap="6" className="max-w-3xl mx-auto">
                <Stack gap="2" className="text-center">
                    <FlexBox justify="center">
                        <Badge variant="success" size="sm">
                            Your success story starts here
                        </Badge>
                    </FlexBox>
                    <Heading type="h2" className="text-3xl font-bold">
                        Walk Away With Confidence
                    </Heading>
                </Stack>

                <Text size="lg" color="base-content" className="text-center">
                    Get a professional brand kit that captures attention, builds trust, and converts visitors into customers—so you can launch marketing with confidence and grow your business.
                </Text>

                <Stack as="ul" gap="3" className="mt-4">
                    {benefits.map((benefit, index) => (
                        <FlexBox 
                            key={index} 
                            as="li"
                            items="start" 
                            gap="3"
                            className="text-left"
                        >
                            <Text color="success" className="flex-shrink-0 mt-1">
                                ✓
                            </Text>
                            <Text size="lg" color="base-content">
                                {benefit}
                            </Text>
                        </FlexBox>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}
