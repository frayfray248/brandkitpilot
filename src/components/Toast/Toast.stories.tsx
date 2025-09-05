// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Toast from '@/components/Toast/Toast';
import Button from '@/components/Button/Button';
import Stack from '@/components/layout/Stack/Stack';
import FlexBox from '@/components/layout/FlexBox/FlexBox';
import Box from '@/components/layout/Box/Box';

const meta: Meta<typeof Toast> = {
    component: Toast,
    args: {
        message: 'This is a toast notification',
        showCloseButton: true,
        showIcon: true,
        autoCloseDelay: 0, // Disable auto-close for stories
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
                'error'
            ],
        },
        position: {
            control: { type: 'select' },
            options: [
                'top-left',
                'top-center', 
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
        },
        autoCloseDelay: {
            control: { type: 'number', min: 0, max: 10000, step: 1000 },
        },
    },
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
    args: {
        variant: 'info',
        position: 'top-right',
        message: 'This is an informational toast message',
    },
};

export const WithTitle: Story = {
    args: {
        variant: 'success',
        title: 'Success!',
        message: 'Your changes have been saved successfully',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="relative h-screen">
            {/* Main color variants */}
            <Toast
                variant="primary"
                position="top-left"
                title="Primary"
                message="Primary brand toast"
                autoCloseDelay={0}
            />
            <Toast
                variant="secondary"
                position="top-center"
                title="Secondary"
                message="Secondary color toast"
                autoCloseDelay={0}
            />
            <Toast
                variant="accent"
                position="top-right"
                title="Accent"
                message="Accent color toast"
                autoCloseDelay={0}
            />
            
            {/* Base color variants */}
            <Toast
                variant="base-100"
                position="bottom-left"
                title="Base 100"
                message="Base background color"
                autoCloseDelay={0}
                style={{ top: '120px', left: '16px' }}
            />
            <Toast
                variant="base-200"
                position="bottom-center"
                title="Base 200"
                message="Base 200 background"
                autoCloseDelay={0}
                style={{ top: '120px', left: '50%', transform: 'translateX(-50%)' }}
            />
            <Toast
                variant="base-300"
                position="bottom-right"
                title="Base 300"
                message="Base 300 background"
                autoCloseDelay={0}
                style={{ top: '120px', right: '16px' }}
            />
            
            {/* Semantic color variants */}
            <Toast
                variant="info"
                position="bottom-left"
                title="Information"
                message="Here's some helpful information"
                autoCloseDelay={0}
                style={{ top: '220px', left: '16px' }}
            />
            <Toast
                variant="success"
                position="bottom-center"
                title="Success"
                message="Operation completed successfully"
                autoCloseDelay={0}
                style={{ top: '220px', left: '50%', transform: 'translateX(-50%)' }}
            />
            <Toast
                variant="warning"
                position="bottom-right"
                title="Warning"
                message="Please review your settings"
                autoCloseDelay={0}
                style={{ top: '220px', right: '16px' }}
            />
            <Toast
                variant="error"
                position="bottom-left"
                title="Error"
                message="Something went wrong"
                autoCloseDelay={0}
                style={{ top: '320px', left: '16px' }}
            />
            <Toast
                variant="neutral"
                position="bottom-center"
                title="Neutral"
                message="This is a neutral notification"
                autoCloseDelay={0}
                style={{ top: '320px', left: '50%', transform: 'translateX(-50%)' }}
            />
        </div>
    ),
};

export const WithoutIcon: Story = {
    args: {
        variant: 'info',
        title: 'No Icon',
        message: 'This toast doesn\'t have an icon',
        showIcon: false,
    },
};

export const WithoutCloseButton: Story = {
    args: {
        variant: 'success',
        title: 'No Close Button',
        message: 'This toast cannot be manually closed',
        showCloseButton: false,
    },
};

export const LongContent: Story = {
    args: {
        variant: 'warning',
        title: 'Long Content Example',
        message: 'This is a very long toast message that demonstrates how the component handles extensive text content. It should wrap properly and maintain good readability while staying within the maximum width constraints.',
    },
};

export const Interactive: Story = {
    render: () => {
        const ToastDemo = () => {
            const [toasts, setToasts] = useState<Array<{
                id: number;
                variant: 'primary' | 'secondary' | 'accent' | 'neutral' | 'base-100' | 'base-200' | 'base-300' | 'info' | 'success' | 'warning' | 'error';
                title: string;
                message: string;
            }>>([]);

            const addToast = (variant: 'primary' | 'secondary' | 'accent' | 'neutral' | 'base-100' | 'base-200' | 'base-300' | 'info' | 'success' | 'warning' | 'error') => {
                const messages = {
                    primary: { title: 'Primary', message: 'Primary brand notification' },
                    secondary: { title: 'Secondary', message: 'Secondary color notification' },
                    accent: { title: 'Accent', message: 'Accent color notification' },
                    neutral: { title: 'Neutral', message: 'This is a neutral message' },
                    'base-100': { title: 'Base 100', message: 'Base background notification' },
                    'base-200': { title: 'Base 200', message: 'Base 200 notification' },
                    'base-300': { title: 'Base 300', message: 'Base 300 notification' },
                    info: { title: 'Information', message: 'Here\'s some helpful information' },
                    success: { title: 'Success!', message: 'Operation completed successfully' },
                    warning: { title: 'Warning', message: 'Please check your input' },
                    error: { title: 'Error', message: 'Something went wrong' },
                };

                const newToast = {
                    id: Date.now(),
                    variant,
                    ...messages[variant],
                };

                setToasts(prev => [...prev, newToast]);
            };

            const removeToast = (id: number) => {
                setToasts(prev => prev.filter(toast => toast.id !== id));
            };

            return (
                <div className="relative h-screen">
                    <div className="p-8">
                        <Box className='max-w-xs'>
                            <h3 className="text-lg font-semibold">Interactive Toast Demo</h3>
                            <p className="text-base-300">Click the buttons below to show different toast notifications</p>
                            
                            <FlexBox direction='column' gap="3" wrap="wrap">
                                <Button
                                    variant="primary"
                                    onClick={() => addToast('primary')}
                                >
                                    Show Primary
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => addToast('secondary')}
                                >
                                    Show Secondary
                                </Button>
                                <Button
                                    variant="accent"
                                    onClick={() => addToast('accent')}
                                >
                                    Show Accent
                                </Button>
                                <Button
                                    variant="neutral"
                                    onClick={() => addToast('neutral')}
                                >
                                    Show Neutral
                                </Button>
                                <Button
                                    variant="base"
                                    onClick={() => addToast('base-200')}
                                >
                                    Show Base
                                </Button>
                                <Button
                                    variant="info"
                                    onClick={() => addToast('info')}
                                >
                                    Show Info
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => addToast('success')}
                                >
                                    Show Success
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => addToast('warning')}
                                >
                                    Show Warning
                                </Button>
                                <Button
                                    variant="error"
                                    onClick={() => addToast('error')}
                                >
                                    Show Error
                                </Button>
                            </FlexBox>
                        </Box>
                    </div>

                    {toasts.map((toast, index) => (
                        <Toast
                            key={toast.id}
                            variant={toast.variant}
                            position="top-right"
                            title={toast.title}
                            message={toast.message}
                            onClose={() => removeToast(toast.id)}
                            autoCloseDelay={4000}
                            style={{
                                top: `${16 + (index * 80)}px`,
                            }}
                        />
                    ))}
                </div>
            );
        };

        return <ToastDemo />;
    },
};

export const AutoDismiss: Story = {
    render: () => {
        const AutoDismissDemo = () => {
            const [isVisible, setIsVisible] = useState(true);

            const showToast = () => {
                setIsVisible(true);
            };

            return (
                <div className="relative h-screen">
                    <div className="p-8">
                        <Stack gap="4">
                            <h3 className="text-lg font-semibold">Auto-Dismiss Demo</h3>
                            <p className="text-base-300">This toast will automatically disappear after 3 seconds</p>
                            
                            <Button
                                variant="primary"
                                onClick={showToast}
                                disabled={isVisible}
                            >
                                {isVisible ? 'Toast is showing...' : 'Show Auto-Dismiss Toast'}
                            </Button>
                        </Stack>
                    </div>

                    {isVisible && (
                        <Toast
                            variant="success"
                            position="top-right"
                            title="Auto-Dismiss"
                            message="This toast will disappear automatically in 3 seconds"
                            onClose={() => setIsVisible(false)}
                            autoCloseDelay={3000}
                        />
                    )}
                </div>
            );
        };

        return <AutoDismissDemo />;
    },
};

export const Positioning: Story = {
    render: () => (
        <div className="relative h-screen">
            <Toast
                variant="info"
                position="top-left"
                message="Top Left"
                autoCloseDelay={0}
            />
            <Toast
                variant="success"
                position="top-center"
                message="Top Center"
                autoCloseDelay={0}
            />
            <Toast
                variant="warning"
                position="top-right"
                message="Top Right"
                autoCloseDelay={0}
            />
            <Toast
                variant="error"
                position="bottom-left"
                message="Bottom Left"
                autoCloseDelay={0}
            />
            <Toast
                variant="neutral"
                position="bottom-center"
                message="Bottom Center"
                autoCloseDelay={0}
            />
            <Toast
                variant="info"
                position="bottom-right"
                message="Bottom Right"
                autoCloseDelay={0}
            />
        </div>
    ),
};

export const ConsistentWidth: Story = {
    render: () => (
        <div className="relative h-screen">
            <Toast
                variant="info"
                position="top-left"
                title="Short"
                message="Hi!"
                autoCloseDelay={0}
            />
            <Toast
                variant="success"
                position="top-center"
                title="Medium Length Title"
                message="This is a medium length toast message that should maintain consistent width."
                autoCloseDelay={0}
            />
            <Toast
                variant="warning"
                position="top-right"
                title="Very Long Title That Could Wrap"
                message="This is a very long toast message that demonstrates how the component maintains consistent width regardless of content length. The text will wrap properly while keeping the toast width fixed and responsive."
                autoCloseDelay={0}
            />
        </div>
    ),
};
