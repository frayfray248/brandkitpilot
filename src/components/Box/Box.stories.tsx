// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Box from './Box';
import Text from '../Text/Text';

const meta: Meta<typeof Box> = {
    component: Box,
    args: {
        children: <Text>Content</Text>,
    },
    argTypes: {
        padding: {
            control: { type: 'select' },
            options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
        },
        margin: {
            control: { type: 'select' },
            options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
        },
        bgColor: {
            control: { type: 'select' },
            options: [
                'base',
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
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
    args: {
        padding: '4',
        margin: '0',
        bgColor: 'base',
    },
};

export const Colors: Story = {
    render: () => (
        <div className='space-y-4'>
            <Box padding='4' bgColor='primary'>
                <Text color='primary-content'>Primary</Text>
            </Box>
            <Box padding='4' bgColor='secondary'>
                <Text color='secondary-content'>Secondary</Text>
            </Box>
            <Box padding='4' bgColor='accent'>
                <Text color='accent-content'>Accent</Text>
            </Box>
            <Box padding='4' bgColor='neutral'>
                <Text color='neutral-content'>Neutral</Text>
            </Box>
            <Box padding='4' bgColor='base'>
                <Text>Base</Text>
            </Box>
            <Box padding='4' bgColor='info'>
                <Text color='info-content'>Info</Text>
            </Box>
            <Box padding='4' bgColor='success'>
                <Text color='success-content'>Success</Text>
            </Box>
            <Box padding='4' bgColor='warning'>
                <Text color='warning-content'>Warning</Text>
            </Box>
            <Box padding='4' bgColor='error'>
                <Text color='error-content'>Error</Text>
            </Box>
        </div>
    ),
};

