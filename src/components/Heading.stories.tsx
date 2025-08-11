// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
    component: Heading,
    args: {
        type: 'h1',
        children: 'Heading',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};
