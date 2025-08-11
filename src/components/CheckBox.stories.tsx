// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';

const meta: Meta<typeof CheckBox> = {
    component: CheckBox,
    args: {
        text: 'Accept terms',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
    args: {
        color: 'primary',
    },
};
