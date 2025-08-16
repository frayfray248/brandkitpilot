// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import FlexBox, { FlexBoxProps } from './FlexBox';
import Text from '@/components/typography/Text/Text';

const meta: Meta<typeof FlexBox> = {
    component: FlexBox,
    args: {
        gap: '2',
        children: [
            <Text key="1">Item 1</Text>,
            <Text key="2">Item 2</Text>,
            <Text key="3">Item 3</Text>,
        ],
    },
    argTypes: {
        display: {
            control: { type: 'select' },
            options: ['flex', 'inline'],
        },
        direction: {
            control: { type: 'select' },
            options: ['row', 'row-reverse', 'column', 'column-reverse'],
        },
        justify: {
            control: { type: 'select' },
            options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
        },
        items: {
            control: { type: 'select' },
            options: ['start', 'end', 'center', 'stretch', 'baseline'],
        },
        wrap: {
            control: { type: 'select' },
            options: ['wrap', 'wrap-reverse', 'nowrap'],
        },
        gap: {
            control: { type: 'select' },
            options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'],
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FlexBox>;

export const Row: Story = {
    args: {
        direction: 'row',
        gap: '2',
    },
};

export const AllDirections: Story = {
    render: () => (
        <div className="space-y-4">
            <div>
                <Text>Row:</Text>
                <FlexBox direction="row" gap="2" className="bg-gray-100 p-2">
                    <Text>Item 1</Text>
                    <Text>Item 2</Text>
                    <Text>Item 3</Text>
                </FlexBox>
            </div>
            <div>
                <Text>Column:</Text>
                <FlexBox direction="column" gap="2" className="bg-gray-100 p-2">
                    <Text>Item 1</Text>
                    <Text>Item 2</Text>
                    <Text>Item 3</Text>
                </FlexBox>
            </div>
            <div>
                <Text>Row Reverse:</Text>
                <FlexBox direction="row-reverse" gap="2" className="bg-gray-100 p-2">
                    <Text>Item 1</Text>
                    <Text>Item 2</Text>
                    <Text>Item 3</Text>
                </FlexBox>
            </div>
            <div>
                <Text>Column Reverse:</Text>
                <FlexBox direction="column-reverse" gap="2" className="bg-gray-100 p-2">
                    <Text>Item 1</Text>
                    <Text>Item 2</Text>
                    <Text>Item 3</Text>
                </FlexBox>
            </div>
        </div>
    ),
};

export const AllJustify: Story = {
    render: () => (
        <div className="space-y-4">
            {['start', 'end', 'center', 'between', 'around', 'evenly'].map((justify) => (
                <div key={justify}>
                    <Text>{justify.charAt(0).toUpperCase() + justify.slice(1)}:</Text>
                    <FlexBox justify={justify as FlexBoxProps['justify']} gap="2" className="bg-gray-100 p-2 w-full">
                        <Text>Item 1</Text>
                        <Text>Item 2</Text>
                        <Text>Item 3</Text>
                    </FlexBox>
                </div>
            ))}
        </div>
    ),
};
