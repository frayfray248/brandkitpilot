import Box from '@/components/layout/Box/Box';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Button from '@/components/Button/Button';
import Link from 'next/link';

export default function CTASection() {
    return (
        <Box as="section" padding="8" bgColor="primary">
            <Stack gap="6" className="max-w-3xl mx-auto text-center">
                <Heading type="h2" color="primary-content" className="text-3xl font-bold">
                    Ready to Build Your Brand?
                </Heading>
                
                <Text size="lg" color="primary-content">
                    Walk away with a professional brand kit that captures attention, builds trust, and converts visitors into customers—so you can launch marketing with confidence.
                </Text>

                <FlexBox justify="center">
                    <Link href="/start">
                        <Button variant="base" size="lg">
                            Create Your BrandKit
                        </Button>
                    </Link>
                </FlexBox>
            </Stack>
        </Box>
    );
}
