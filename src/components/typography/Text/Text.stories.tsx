// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Text, { TextProps } from '@/components/typography/Text/Text';

const meta: Meta<typeof Text> = {
    component: Text,
    args: {
        children: 'Sample text',
    },
    argTypes: {
        as: {
            control: { type: 'select' },
            options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
        size: {
            control: { type: 'select' },
            options: [
                'xs',
                'sm',
                'md',
                'lg',
                'xl',
                '2xl',
                '3xl',
                '4xl',
                '5xl',
                '6xl',
                '7xl',
                '8xl',
                '9xl',
            ],
        },
        color: {
            control: { type: 'select' },
            options: [
                'base-100',
                'base-200',
                'base-300',
                'surface',
                'base-content',
                'primary',
                'primary-content',
                'secondary',
                'secondary-content',
                'accent',
                'accent-content',
                'neutral',
                'neutral-content',
                'info',
                'info-content',
                'success',
                'success-content',
                'warning',
                'warning-content',
                'error',
                'error-content',
            ],
        },
        bold: {
            control: { type: 'boolean' },
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
    args: {
        size: 'md',
        color: 'base-content',
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-2">
            {[
                'xs',
                'sm',
                'md',
                'lg',
                'xl',
                '2xl',
                '3xl',
                '4xl',
                '5xl',
                '6xl',
                '7xl',
                '8xl',
                '9xl',
            ].map((size) => (
                <Text key={size} size={size as TextProps['size']}>
                    {size.toUpperCase()} - Sample text
                </Text>
            ))}
        </div>
    ),
};

export const AllColors: Story = {
    render: () => (
        <div className="space-y-2">
            {[
                'base-content',
                'primary',
                'secondary',
                'accent',
                'neutral',
                'info',
                'success',
                'warning',
                'error',
            ].map((color) => (
                <Text key={color} color={color as TextProps['color']}>
                    {color.charAt(0).toUpperCase() + color.slice(1)} text
                </Text>
            ))}
        </div>
    ),
};

export const AllElements: Story = {
    render: () => (
        <div className="space-y-2">
            <Text as="p">Paragraph text</Text>
            <Text as="span">Span text</Text>
            <Text as="div">Div text</Text>
            <Text as="h1">H1 text</Text>
            <Text as="h2">H2 text</Text>
            <Text as="h3">H3 text</Text>
            <Text as="h4">H4 text</Text>
            <Text as="h5">H5 text</Text>
            <Text as="h6">H6 text</Text>
        </div>
    ),
};
