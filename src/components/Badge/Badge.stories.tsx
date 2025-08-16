// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
    component: Badge,
    args: {
        children: 'Badge',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: [
                'primary',
                'secondary',
                'accent',
                'neutral',
                'base-100',
                'base-200',
                'base-300',
                'info',
                'success',
                'warning',
                'error',
                'outline',
            ],
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
        dot: {
            control: { type: 'boolean' },
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        children: 'Primary',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="base-100">Base 100</Badge>
            <Badge variant="base-200">Base 200</Badge>
            <Badge variant="base-300">Base 300</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
        </div>
    ),
};

export const DotBadges: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
                <span>Small dots:</span>
                <Badge variant="primary" size="sm" dot />
                <Badge variant="success" size="sm" dot />
                <Badge variant="error" size="sm" dot />
            </div>
            <div className="flex items-center gap-2">
                <span>Medium dots:</span>
                <Badge variant="primary" size="md" dot />
                <Badge variant="success" size="md" dot />
                <Badge variant="error" size="md" dot />
            </div>
            <div className="flex items-center gap-2">
                <span>Large dots:</span>
                <Badge variant="primary" size="lg" dot />
                <Badge variant="success" size="lg" dot />
                <Badge variant="error" size="lg" dot />
            </div>
        </div>
    ),
};

export const UsageExamples: Story = {
    render: () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Status Indicators</h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="success" size="sm">Online</Badge>
                        <span>User is online</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="warning" size="sm">Away</Badge>
                        <span>User is away</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="error" size="sm">Offline</Badge>
                        <span>User is offline</span>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">Notification Counts</h3>
                <div className="flex gap-4">
                    <div className="relative inline-block">
                        <button className="bg-base-200 hover:bg-base-300 px-4 py-2 rounded">
                            Messages
                        </button>
                        <Badge variant="error" size="sm" className="absolute -top-2 -right-2">
                            5
                        </Badge>
                    </div>
                    <div className="relative inline-block">
                        <button className="bg-base-200 hover:bg-base-300 px-4 py-2 rounded">
                            Notifications
                        </button>
                        <Badge variant="primary" size="sm" className="absolute -top-2 -right-2">
                            12
                        </Badge>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">Category Labels</h3>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Tailwind</Badge>
                    <Badge variant="outline">Next.js</Badge>
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">Activity Indicators</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <Badge variant="success" dot />
                        <span>John Doe - Active now</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="warning" dot />
                        <span>Jane Smith - Last seen 5 minutes ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="neutral" dot />
                        <span>Bob Johnson - Last seen 2 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    ),
};
