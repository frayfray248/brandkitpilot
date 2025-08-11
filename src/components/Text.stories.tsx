// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
    component: Text,
    args: {
        children: 'Sample text',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};
