// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';

const meta: Meta<typeof Radio> = {
    component: Radio,
    args: {
        text: 'Option',
        name: 'radio',
    },
    argTypes: {
        color: {
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
            options: ['sm', 'md', 'lg'],
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
    args: {
        color: 'primary',
    },
};

export const AllColors: Story = {
    render: () => (
        <div className="space-x-4">
            <Radio color="primary" text="Primary" name="color" />
            <Radio color="secondary" text="Secondary" name="color" />
            <Radio color="accent" text="Accent" name="color" />
            <Radio color="neutral" text="Neutral" name="color" />
            <Radio color="base" text="Base" name="color" />
            <Radio color="info" text="Info" name="color" />
            <Radio color="success" text="Success" name="color" />
            <Radio color="warning" text="Warning" name="color" />
            <Radio color="error" text="Error" name="color" />
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-4">
            <Radio size="sm" text="Small" name="size" />
            <Radio size="md" text="Medium" name="size" />
            <Radio size="lg" text="Large" name="size" />
        </div>
    ),
};

