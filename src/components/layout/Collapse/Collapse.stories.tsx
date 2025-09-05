// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Collapse from './Collapse';
import Box from '../Box/Box';
import Stack from '../Stack/Stack';
import Text from '../../typography/Text/Text';

const meta: Meta<typeof Collapse> = {
    component: Collapse,
    parameters: {
        layout: 'padded',
    },
    args: {
        children: [
            <>
                <Collapse.Toggle>
                    <Box bgColor="base-300" padding="4">
                        <Text>Toggle Content</Text>
                    </Box>
                </Collapse.Toggle>
                <Collapse.Content>
                    <Box bgColor="base-200" padding="4">
                        <Text>This content can be toggled on smaller screens!</Text>
                    </Box>
                </Collapse.Content>
            </>
        ],
    },
    argTypes: {
        breakpoint: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Screen size below which the content collapses',
        },
        as: {
            control: { type: 'select' },
            options: ['div', 'nav', 'section', 'aside'],
            description: 'HTML element to render as',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllBreakpoints: Story = {
    name: 'All Breakpoints',
    render: () => (
        <div className="space-y-8">
            <div>
                <Text as="h3" className="mb-4 font-semibold">Small Breakpoint (sm)</Text>
                <Text size="sm" className="mb-2 text-base-content/70">
                    Collapses below 640px
                </Text>
                <Collapse breakpoint="sm">
                    <Collapse.Toggle>
                        <Box bgColor="primary" color="primary-content" padding="3" className="rounded">
                            <Text bold>☰ Toggle Navigation</Text>
                        </Box>
                    </Collapse.Toggle>
                    <Collapse.Content>
                        <Box bgColor="base-200" padding="4" className="rounded mt-2">
                            <Stack direction="row" gap="4">
                                <Text as="a" href="#" className="text-primary hover:underline">Home</Text>
                                <Text as="a" href="#" className="text-primary hover:underline">About</Text>
                                <Text as="a" href="#" className="text-primary hover:underline">Contact</Text>
                            </Stack>
                        </Box>
                    </Collapse.Content>
                </Collapse>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Medium Breakpoint (md)</Text>
                <Text size="sm" className="mb-2 text-base-content/70">
                    Collapses below 768px
                </Text>
                <Collapse breakpoint="md">
                    <Collapse.Toggle>
                        <Box bgColor="secondary" color="secondary-content" padding="3" className="rounded">
                            <Text bold>☰ Toggle Navigation</Text>
                        </Box>
                    </Collapse.Toggle>
                    <Collapse.Content>
                        <Box bgColor="base-200" padding="4" className="rounded mt-2">
                            <Stack direction="row" gap="4">
                                <Text as="a" href="#" className="text-primary hover:underline">Home</Text>
                                <Text as="a" href="#" className="text-primary hover:underline">About</Text>
                                <Text as="a" href="#" className="text-primary hover:underline">Contact</Text>
                            </Stack>
                        </Box>
                    </Collapse.Content>
                </Collapse>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Large Breakpoint (lg)</Text>
                <Text size="sm" className="mb-2 text-base-content/70">
                    Collapses below 1024px
                </Text>
                <Collapse breakpoint="lg">
                    <Collapse.Toggle>
                        <Box bgColor="accent" color="accent-content" padding="3" className="rounded">
                            <Text bold>☰ Toggle Navigation</Text>
                        </Box>
                    </Collapse.Toggle>
                    <Collapse.Content>
                        <Box bgColor="base-200" padding="4" className="rounded mt-2">
                            <Stack direction="row" gap="4">
                                <Text as="a" href="#" className="text-primary hover:underline">Home</Text>
                                <Text as="a" href="#" className="text-primary hover:underline">About</Text>
                                <Text as="a" href="#" className="text-primary hover:underline">Contact</Text>
                            </Stack>
                        </Box>
                    </Collapse.Content>
                </Collapse>
            </div>
        </div>
    ),
};

export const HeaderNavigation: Story = {
    name: 'Header Navigation',
    render: () => (
        <div className="border border-base-300 rounded-lg">
            <Box padding="4" bgColor="base-200" className="border-b border-neutral">
                <Collapse breakpoint="sm">
                    <Stack direction="row" gap='6' wrap="wrap" className="items-center">
                        <Text size="2xl" bold>ACME</Text>
                        <Collapse.Toggle className="flex-1">
                            <Text bold>☰ Menu</Text>
                        </Collapse.Toggle>
                        <Collapse.Content className="flex-[0_0_100%] sm:flex-auto">
                            <Stack as='nav' gap="2" direction="column" className="sm:flex-row">
                                <a href="#" className="text-base-content hover:text-primary py-2">Item 1</a>
                                <a href="#" className="text-base-content hover:text-primary py-2">Item 2</a>
                                <a href="#" className="text-base-content hover:text-primary py-2">Item 3</a>
                            </Stack>
                        </Collapse.Content>
                    </Stack>
                </Collapse>
            </Box>
        </div>
    ),
};

export const AccordionStyle: Story = {
    name: 'Accordion Style',
    render: () => (
        <div className="max-w-2xl space-y-4">
            <Collapse breakpoint="sm">
                <Collapse.Toggle>
                    <Box bgColor="primary" color="primary-content" padding="4" className="rounded cursor-pointer hover:opacity-90">
                        <Stack direction="row" className="items-center justify-between">
                            <Text bold>What is this component?</Text>
                            <Text>▼</Text>
                        </Stack>
                    </Box>
                </Collapse.Toggle>
                <Collapse.Content>
                    <Box bgColor="base-200" padding="4" className="rounded-b">
                        <Text>
                            The Collapse component is a responsive utility that hides/shows content based on screen size breakpoints. 
                            Perfect for mobile navigation menus and responsive layouts.
                        </Text>
                    </Box>
                </Collapse.Content>
            </Collapse>

            <Collapse breakpoint="sm">
                <Collapse.Toggle>
                    <Box bgColor="secondary" color="secondary-content" padding="4" className="rounded cursor-pointer hover:opacity-90">
                        <Stack direction="row" className="items-center justify-between">
                            <Text bold>How does it work?</Text>
                            <Text>▼</Text>
                        </Stack>
                    </Box>
                </Collapse.Toggle>
                <Collapse.Content>
                    <Box bgColor="base-200" padding="4" className="rounded-b">
                        <Text>
                            It uses CSS classes and breakpoint utilities to show the toggle button on smaller screens 
                            and hide the content until the user clicks the toggle. On larger screens, the content is always visible.
                        </Text>
                    </Box>
                </Collapse.Content>
            </Collapse>
        </div>
    ),
};
