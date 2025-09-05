// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import InputField, { InputFieldProps } from '@/components/form/InputField/InputField';

const meta: Meta<typeof InputField> = {
    component: InputField,
    args: {
        placeholder: 'Enter text',
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: [
                'text',
                'textarea',
                'number',
                'search',
                'date',
                'datetime-local',
                'email',
                'month',
                'password',
                'tel',
                'time',
                'url',
                'week',
            ],
        },
        color: {
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
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
        fullWidth: {
            control: { type: 'boolean' },
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Text: Story = {
    args: {
        type: 'text',
    },
};

export const TextArea: Story = {
    args: {
        type: 'textarea',
        placeholder: 'Enter your message...',
    },
};

export const AllColors: Story = {
    render: () => (
        <div className="space-x-4 space-y-4">
            {[
                'base',
                'primary',
                'secondary',
                'accent',
                'neutral',
                'info',
                'success',
                'warning',
                'error',
            ].map((color) => (
                <InputField
                    key={color}
                    color={color as InputFieldProps['color']}
                    placeholder={`${color.charAt(0).toUpperCase() + color.slice(1)} input`}
                />
            ))}
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="space-x-4 space-y-4">
            <InputField size="sm" placeholder="Small input" />
            <InputField size="md" placeholder="Medium input" />
            <InputField size="lg" placeholder="Large input" />
        </div>
    ),
};

export const AllTypes: Story = {
    render: () => (
        <div className="space-x-4 space-y-4">
            <InputField type="text" placeholder="Text input" />
            <InputField type="password" placeholder="Password input" />
            <InputField type="email" placeholder="Email input" />
            <InputField type="number" placeholder="Number input" />
            <InputField type="search" placeholder="Search input" />
            <InputField type="tel" placeholder="Telephone input" />
            <InputField type="url" placeholder="URL input" />
            <InputField type="date" />
            <InputField type="time" />
            <InputField type="datetime-local" />
            <InputField type="month" />
            <InputField type="week" />
            <InputField type="textarea" placeholder="Textarea input..." />
        </div>
    ),
};
