// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

const meta: Meta<typeof Modal> = {
    component: Modal,
    args: {
        isOpen: false,
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
        },
        bgColor: {
            control: { type: 'select' },
            options: [
                'base-100',
                'base-200',
                'base-300',
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
        closeOnOverlayClick: {
            control: { type: 'boolean' },
        },
        closeOnEscape: {
            control: { type: 'boolean' },
        },
        showCloseButton: {
            control: { type: 'boolean' },
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

// Helper component for stories with state
function ModalStory(props: Partial<React.ComponentProps<typeof Modal>>) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                {...props}
            >
                <Modal.Header>
                    <h2 id="modal-title" className="text-xl font-semibold text-base-content">
                        Modal Title
                    </h2>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-base-content">
                        This is the modal content. It can contain any React components
                        or HTML elements. The modal will handle focus management and
                        accessibility features automatically.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-end space-x-2">
                        <Button variant="base" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setIsOpen(false)}>
                            Confirm
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export const Default: Story = {
    render: () => <ModalStory />,
};

export const SmallSize: Story = {
    render: () => <ModalStory size="sm" />,
};

export const LargeSize: Story = {
    render: () => <ModalStory size="lg" />,
};

export const NoCloseButton: Story = {
    render: () => <ModalStory showCloseButton={false} />,
};

export const NoOverlayClose: Story = {
    render: () => <ModalStory closeOnOverlayClick={false} />,
};

export const ConfirmationModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button variant="error" onClick={() => setIsOpen(true)}>
                    Delete Item
                </Button>
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    size="sm"
                >
                    <Modal.Header>
                        <h2 id="modal-title" className="text-xl font-semibold text-error">
                            Confirm Deletion
                        </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-base-content">
                            Are you sure you want to delete this item? This action cannot be undone.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="flex justify-end space-x-2">
                            <Button variant="base" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="error" onClick={() => setIsOpen(false)}>
                                Delete
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
        );
    },
};

export const FormModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Add User</Button>
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    size="md"
                >
                    <Modal.Header>
                        <h2 id="modal-title" className="text-xl font-semibold text-base-content">
                            Add New User
                        </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-base-content mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-base-content mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-base-content mb-1">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    className="w-full px-3 py-2 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Select a role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="flex justify-end space-x-2">
                            <Button variant="base" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => setIsOpen(false)}>
                                Add User
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
        );
    },
};

export const ScrollableContent: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    size="md"
                >
                    <Modal.Header>
                        <h2 id="modal-title" className="text-xl font-semibold text-base-content">
                            Terms and Conditions
                        </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-4">
                            {Array.from({ length: 20 }, (_, i) => (
                                <p key={i} className="text-base-content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                    nisi ut aliquip ex ea commodo consequat.
                                </p>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="flex justify-end space-x-2">
                            <Button variant="base" onClick={() => setIsOpen(false)}>
                                Decline
                            </Button>
                            <Button variant="primary" onClick={() => setIsOpen(false)}>
                                Accept
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
        );
    },
};

export const AllSizes: Story = {
    render: () => {
        const [openModals, setOpenModals] = useState<Record<string, boolean>>({});

        const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

        const openModal = (size: string) => {
            setOpenModals(prev => ({ ...prev, [size]: true }));
        };

        const closeModal = (size: string) => {
            setOpenModals(prev => ({ ...prev, [size]: false }));
        };

        return (
            <div className="space-x-2">
                {sizes.map((size) => (
                    <span key={size}>
                        <Button onClick={() => openModal(size)}>
                            {size.toUpperCase()}
                        </Button>
                        <Modal
                            isOpen={!!openModals[size]}
                            onClose={() => closeModal(size)}
                            size={size}
                        >
                            <Modal.Header>
                                <h2 id="modal-title" className="text-xl font-semibold text-base-content">
                                    {size.toUpperCase()} Modal
                                </h2>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="text-base-content">
                                    This is a {size} sized modal. You can see how different sizes 
                                    affect the modal&apos;s appearance and content area.
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => closeModal(size)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </span>
                ))}
            </div>
        );
    },
};
