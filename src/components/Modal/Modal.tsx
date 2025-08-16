import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { useEffect } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const modalOverlay = tv({
    base: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm',
    variants: {
        show: {
            true: 'opacity-100 pointer-events-auto',
            false: 'opacity-0 pointer-events-none',
        },
    },
    defaultVariants: {
        show: false,
    },
});

const modalContent = tv({
    base: 'relative w-full max-h-[90vh] overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 ease-out flex flex-col',
    variants: {
        size: {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            full: 'max-w-full h-full',
        },
        bgColor: {
            'base-100': 'bg-base-100',
            'base-200': 'bg-base-200',
            'base-300': 'bg-base-300',
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            accent: 'bg-accent',
            neutral: 'bg-neutral',
            info: 'bg-info',
            success: 'bg-success',
            warning: 'bg-warning',
            error: 'bg-error',
        },
        show: {
            true: 'scale-100 opacity-100',
            false: 'scale-95 opacity-0',
        },
    },
    defaultVariants: {
        size: 'md',
        bgColor: 'base-100',
        show: false,
    },
});

const modalSection = tv({
    base: 'relative',
    variants: {
        padding: {
            '0': 'p-0',
            '2': 'p-2',
            '3': 'p-3',
            '4': 'p-4',
            '6': 'p-6',
            '8': 'p-8',
        },
        divider: {
            true: 'border-b border-base-300',
        },
        scrollable: {
            true: 'overflow-y-auto flex-1 min-h-0',
        },
        section: {
            header: 'flex-shrink-0',
            body: 'flex-1 min-h-0',
            footer: 'flex-shrink-0',
        },
    },
    defaultVariants: {
        padding: '6',
    },
});

const closeButton = tv({
    base: 'absolute top-4 right-4 p-1 rounded-full bg-base-200/80 hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors z-10',
});

export type ModalVariants = VariantProps<typeof modalContent>;
export type ModalSectionVariants = VariantProps<typeof modalSection>;

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    children: ReactNode;
} & ModalVariants &
    Omit<ComponentPropsWithRef<'div'>, keyof ModalVariants | 'children'>;

export type ModalSectionProps<T extends ElementType = 'div'> = {
    as?: T;
} & ModalSectionVariants &
    Omit<ComponentPropsWithRef<T>, keyof ModalSectionVariants | 'as'>;

function ModalRoot({
    isOpen,
    onClose,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    size,
    bgColor,
    className,
    children,
    ...props
}: ModalProps) {
    // Handle escape key
    useEffect(() => {
        if (!closeOnEscape || !isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [closeOnEscape, isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={modalOverlay({ show: isOpen })}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className={modalContent({ size, bgColor, show: isOpen, className })}
                {...props}
            >
                {showCloseButton && (
                    <button
                        className={closeButton()}
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
                {children}
            </div>
        </div>
    );
}

function ModalHeader<T extends ElementType = 'div'>({
    as,
    padding = '6',
    divider = true,
    scrollable,
    className,
    ...props
}: ModalSectionProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={modalSection({ padding, divider, scrollable, section: 'header', className })}
            {...props}
        />
    );
}

function ModalBody<T extends ElementType = 'div'>({
    as,
    padding = '6',
    divider,
    scrollable = true,
    className,
    ...props
}: ModalSectionProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={modalSection({ padding, divider, scrollable, section: 'body', className })}
            {...props}
        />
    );
}

function ModalFooter<T extends ElementType = 'div'>({
    as,
    padding = '6',
    divider = true,
    scrollable,
    className,
    ...props
}: ModalSectionProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={modalSection({ padding, divider, scrollable, section: 'footer', className })}
            {...props}
        />
    );
}

// Compound component pattern
const Modal = Object.assign(ModalRoot, {
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
});

export default Modal;
