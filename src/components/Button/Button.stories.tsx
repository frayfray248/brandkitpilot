
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/Button/Button';

const meta: Meta<typeof Button> = {
    component: Button,
    args: {
        children: 'Click me',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: [
                'primary',
                'secondary',
                'accent',
                'neutral',
                'base',
                'info',
                'success',
                'warning',
                'error',
            ],
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'], // Add your sizes here
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'md'
    },
};


export const AllVariants: Story = {
    render: () => (
        <div className='space-x-4'>
            <Button variant="primary" size="md">Primary</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="accent" size="md">Accent</Button>
            <Button variant="neutral" size="md">Neutral</Button>
            <Button variant="base" size="md">Base</Button>
            <Button variant="info" size="md">Info</Button>
            <Button variant="success" size="md">Success</Button>
            <Button variant="warning" size="md">Warning</Button>
            <Button variant="error" size="md">Error</Button>
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className='space-x-4'>
            <Button size='sm'>Small</Button>
            <Button size='md'>Medium</Button>
            <Button size='lg'>Large</Button>
        </div>
    )
};