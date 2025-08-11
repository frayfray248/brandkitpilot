// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
    component: InputField,
    args: {
        placeholder: 'Enter text',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Text: Story = {};

export const TextArea: Story = {
    args: {
        type: 'textarea',
    },
};
