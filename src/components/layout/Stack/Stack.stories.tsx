// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Stack from './Stack';
import Text from '@/components/typography/Text/Text';

const meta: Meta<typeof Stack> = {
    component: Stack,
    args: {
        direction: 'column',
        gap: '2',
        children: [
            <Text key="1">Item 1</Text>,
            <Text key="2">Item 2</Text>,
            <Text key="3">Item 3</Text>,
        ],
    },
    argTypes: {
        direction: {
            control: { type: 'select' },
            options: ['row', 'row-reverse', 'column', 'column-reverse'],
        },
        gap: {
            control: { type: 'select' },
            options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Vertical: Story = {
    args: {
        direction: 'column',
        gap: '2',
    },
};

export const Horizontal: Story = {
    args: {
        direction: 'row',
        gap: '2',
    },
};

