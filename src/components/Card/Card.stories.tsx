// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import Button from '../Button/Button';
import Heading from '../typography/Heading/Heading';
import Text from '../typography/Text/Text';
import Badge from '../Badge/Badge';
import FlexBox from '../layout/FlexBox/FlexBox';
import Stack from '../layout/Stack/Stack';

const meta: Meta<typeof Card> = {
    component: Card,
    args: {
        children: 'Card content',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['elevated', 'outlined', 'filled', 'ghost'],
        },
        bgColor: {
            control: { type: 'select' },
            options: [
                'base-100',
                'base-200', 
                'base-300',
                'primary',
                'secondary',
                'accent',
                'neutral',
                'info',
                'success',
                'warning',
                'error',
            ],
        },
        padding: {
            control: { type: 'select' },
            options: ['0', '2', '3', '4', '6', '8'],
        },
        interactive: {
            control: { type: 'boolean' },
        },
        as: {
            control: { type: 'select' },
            options: ['div', 'article', 'section'],
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        variant: 'elevated',
        padding: '4',
        children: 'This is a basic card with some content.',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="elevated" padding="4">
                <Text as="strong">Elevated Card</Text>
                <Text>Has shadow and border for depth</Text>
            </Card>
            <Card variant="outlined" padding="4">
                <Text as="strong">Outlined Card</Text>
                <Text>Simple border without shadow</Text>
            </Card>
            <Card variant="filled" padding="4">
                <Text as="strong">Filled Card</Text>
                <Text>Uses default filled background</Text>
            </Card>
            <Card variant="ghost" padding="4">
                <Text as="strong">Ghost Card</Text>
                <Text>Transparent background</Text>
            </Card>
        </div>
    ),
};

export const BackgroundColors: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card variant="outlined" bgColor="base-100" padding="4">
                <Text as="strong">Base 100</Text>
                <Text size="sm">Default light background</Text>
            </Card>
            <Card variant="outlined" bgColor="base-200" padding="4">
                <Text as="strong">Base 200</Text>
                <Text size="sm">Subtle gray background</Text>
            </Card>
            <Card variant="outlined" bgColor="base-300" padding="4">
                <Text as="strong">Base 300</Text>
                <Text size="sm">Medium gray background</Text>
            </Card>
            <Card variant="outlined" bgColor="primary" padding="4">
                <Text as="strong" color="primary-content">Primary</Text>
                <Text size="sm" color="primary-content">Brand color background</Text>
            </Card>
            <Card variant="outlined" bgColor="secondary" padding="4">
                <Text as="strong" color="secondary-content">Secondary</Text>
                <Text size="sm" color="secondary-content">Secondary color background</Text>
            </Card>
            <Card variant="outlined" bgColor="accent" padding="4">
                <Text as="strong" color="accent-content">Accent</Text>
                <Text size="sm" color="accent-content">Accent color background</Text>
            </Card>
            <Card variant="outlined" bgColor="neutral" padding="4">
                <Text as="strong" color="neutral-content">Neutral</Text>
                <Text size="sm" color="neutral-content">Neutral color background</Text>
            </Card>
            <Card variant="outlined" bgColor="info" padding="4">
                <Text as="strong" color="info-content">Info</Text>
                <Text size="sm" color="info-content">Information background</Text>
            </Card>
            <Card variant="outlined" bgColor="success" padding="4">
                <Text as="strong" color="success-content">Success</Text>
                <Text size="sm" color="success-content">Success state background</Text>
            </Card>
            <Card variant="outlined" bgColor="warning" padding="4">
                <Text as="strong" color="warning-content">Warning</Text>
                <Text size="sm" color="warning-content">Warning state background</Text>
            </Card>
            <Card variant="outlined" bgColor="error" padding="4">
                <Text as="strong" color="error-content">Error</Text>
                <Text size="sm" color="error-content">Error state background</Text>
            </Card>
        </div>
    ),
};

export const CompoundComponent: Story = {
    render: () => (
        <div className="max-w-md">
            <Card variant="elevated">
                <Card.Header>
                    <FlexBox justify="between" items="center">
                        <Heading type="h3">User Profile</Heading>
                        <Badge variant="success" size="sm">Active</Badge>
                    </FlexBox>
                </Card.Header>
                
                <Card.Body>
                    <Stack gap="3">
                        <Text as="p">
                            <Text as="strong">John Doe</Text>
                        </Text>
                        <Text size="sm">
                            Software Engineer at Tech Corp
                        </Text>
                        <Text as="p">
                            Passionate about creating user-friendly applications 
                            and learning new technologies.
                        </Text>
                    </Stack>
                </Card.Body>
                
                <Card.Footer>
                    <FlexBox gap="2" justify="end">
                        <Button variant="base" size="sm">View Profile</Button>
                        <Button variant="primary" size="sm">Edit</Button>
                    </FlexBox>
                </Card.Footer>
            </Card>
        </div>
    ),
};

export const InteractiveCards: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="elevated" bgColor="base-100" interactive padding="6">
                <Stack gap="3">
                    <Heading type="h4">Project Alpha</Heading>
                    <Text color="base-content" size="sm">Click to view details</Text>
                    <Badge variant="info" size="sm">In Progress</Badge>
                </Stack>
            </Card>
            
            <Card variant="outlined" bgColor="success" interactive padding="6">
                <Stack gap="3">
                    <Heading type="h4" color="success-content">Project Beta</Heading>
                    <Text color="success-content" size="sm">Click to view details</Text>
                    <Badge variant="base-100" size="sm">Completed</Badge>
                </Stack>
            </Card>
            
            <Card variant="filled" bgColor="warning" interactive padding="6">
                <Stack gap="3">
                    <Heading type="h4" color="warning-content">Project Gamma</Heading>
                    <Text color="warning-content" size="sm">Click to view details</Text>
                    <Badge variant="base-100" size="sm">Needs Review</Badge>
                </Stack>
            </Card>
        </div>
    ),
};

export const SemanticHTML: Story = {
    render: () => (
        <div className="space-y-6">
            <Card as="article" variant="elevated">
                <Card.Header as="header">
                    <Stack gap="2">
                        <Heading type="h2">Blog Post Title</Heading>
                        <FlexBox items="center" gap="2">
                            <Text as="time" size="sm" dateTime="2025-08-16">
                                August 16, 2025
                            </Text>
                            <Badge variant="outline" size="sm">Technology</Badge>
                        </FlexBox>
                    </Stack>
                </Card.Header>
                
                <Card.Body as="main">
                    <Text as="p">
                        This is the beginning of an interesting blog post about 
                        technology and development best practices...
                    </Text>
                </Card.Body>
                
                <Card.Footer as="footer">
                    <FlexBox justify="between" items="center">
                        <Text size="sm">
                            5 min read
                        </Text>
                        <FlexBox gap="2">
                            <Button variant="base" size="sm">Share</Button>
                            <Button variant="primary" size="sm">Read More</Button>
                        </FlexBox>
                    </FlexBox>
                </Card.Footer>
            </Card>
        </div>
    ),
};

export const ProductCards: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
                { name: 'Wireless Headphones', price: 199, rating: 4.5, inStock: true },
                { name: 'Smart Watch', price: 299, rating: 4.8, inStock: false },
                { name: 'Laptop Stand', price: 49, rating: 4.2, inStock: true },
            ].map((product, index) => (
                <Card key={index} variant="elevated" interactive>
                    <div className="aspect-video bg-base-200 flex items-center justify-center">
                        <Text>Product Image</Text>
                    </div>
                    
                    <Card.Body>
                        <Stack gap="3">
                            <Heading type="h4">{product.name}</Heading>
                            <FlexBox justify="between" items="center">
                                <Text size="lg" bold color="primary">
                                    ${product.price}
                                </Text>
                                <Badge 
                                    variant={product.inStock ? 'success' : 'error'} 
                                    size="sm"
                                >
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </Badge>
                            </FlexBox>
                            <FlexBox items="center" gap="1">
                                <Text size="sm" color="warning">★★★★☆</Text>
                                <Text size="sm" color="base-300">({product.rating})</Text>
                            </FlexBox>
                        </Stack>
                    </Card.Body>
                    
                    <Card.Footer>
                        <Button 
                            variant={product.inStock ? 'primary' : 'base'} 
                            size="sm" 
                            className="w-full"
                            disabled={!product.inStock}
                        >
                            {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                        </Button>
                    </Card.Footer>
                </Card>
            ))}
        </div>
    ),
};

export const NoPadding: Story = {
    render: () => (
        <div className="max-w-sm">
            <Card variant="elevated" padding="0">
                <div className="aspect-video bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <Text color="primary-content" size="lg" bold>Hero Image</Text>
                </div>
                
                <Card.Body>
                    <Stack gap="3">
                        <Heading type="h3">Image Card</Heading>
                        <Text as="p">
                            When using padding=&quot;0&quot; on the Card, you can have 
                            content that extends to the edges, like images.
                        </Text>
                    </Stack>
                </Card.Body>
                
                <Card.Footer>
                    <Button variant="primary" size="sm" className="w-full">
                        Learn More
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    ),
};

export const CustomPadding: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="outlined" padding="2">
                <Text as="strong">Compact Card (padding=&quot;2&quot;)</Text>
                <Text size="sm">Minimal padding for dense layouts</Text>
            </Card>
            
            <Card variant="outlined" padding="8">
                <Text as="strong">Spacious Card (padding=&quot;8&quot;)</Text>
                <Text size="sm">Generous padding for prominent content</Text>
            </Card>
        </div>
    ),
};
