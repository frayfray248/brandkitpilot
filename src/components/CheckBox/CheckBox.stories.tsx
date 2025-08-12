// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';

const meta: Meta<typeof CheckBox> = {
    component: CheckBox,
    args: {
        text: 'Accept terms',
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

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
    args: {
        color: 'primary',
    },
};


export const AllColors: Story = {
    render: () => (
        <div className="space-x-4">
            <CheckBox color="primary" text="Primary" />
            <CheckBox color="secondary" text="Secondary" />
            <CheckBox color="accent" text="Accent" />
            <CheckBox color="neutral" text="Neutral" />
            <CheckBox color="base" text="Base" />
            <CheckBox color="info" text="Info" />
            <CheckBox color="success" text="Success" />
            <CheckBox color="warning" text="Warning" />
            <CheckBox color="error" text="Error" />
        </div>
    )
};

export const AllSizes: Story = {
    render: () => (
        <div className='space-y-4'>
            <CheckBox size='sm' text="Small" />
            <CheckBox size='md' text="Medium" />
            <CheckBox size='lg' text="Large" />
        </div>
    )
};