// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
    component: Heading,
    args: {
        type: 'h1',
        children: 'Heading',
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
        className: {
            table: { disable: true },
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
    args: {
        type: 'h1',
    },
};

export const AllLevels: Story = {
    render: () => (
        <div className="space-y-4">
            <Heading type="h1">Heading 1</Heading>
            <Heading type="h2">Heading 2</Heading>
            <Heading type="h3">Heading 3</Heading>
            <Heading type="h4">Heading 4</Heading>
            <Heading type="h5">Heading 5</Heading>
            <Heading type="h6">Heading 6</Heading>
        </div>
    ),
};
