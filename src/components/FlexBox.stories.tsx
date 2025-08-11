// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import FlexBox from './FlexBox';
import Text from './Text';

const meta: Meta<typeof FlexBox> = {
    component: FlexBox,
    args: {
        gap: '2',
        children: (
            <>
                <Text>Item 1</Text>
                <Text>Item 2</Text>
                <Text>Item 3</Text>
            </>
        ),
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FlexBox>;

export const Row: Story = {};
