import Box from '@/components/layout/Box/Box';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';
import Button from '@/components/Button/Button';
import Badge from '@/components/Badge/Badge';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <Box as="section" padding="8" bgColor="base-100">
            <Stack gap="6" className="max-w-4xl mx-auto text-center">
                <Stack gap="2" className="text-center">
                    <FlexBox justify="center">
                        <Badge variant="accent" size="sm">
                            Takes less than 2 minutes
                        </Badge>
                    </FlexBox>
                    <Heading type="h1" className="text-4xl md:text-5xl font-bold">
                        Professional brand messaging in minutes
                    </Heading>
                </Stack>
                
                <Text size="lg" color="base-content" className="max-w-2xl mx-auto">
                    BrandKitPilot helps entrepreneurs and small business owners turn what makes them special into clear, compelling messaging—without becoming a copywriter or paying agency prices.
                </Text>

                <FlexBox justify="center">
                    <Link href="/start">
                        <Button variant="primary" size="lg">
                            Create Your BrandKit
                        </Button>
                    </Link>
                </FlexBox>
            </Stack>
        </Box>
    );
}
