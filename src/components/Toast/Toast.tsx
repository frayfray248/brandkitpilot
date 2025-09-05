import type { ComponentPropsWithRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const toast = tv({
    base: 'fixed z-50 rounded-lg shadow-lg border transition-all duration-300 ease-in-out transform flex items-start gap-3 p-4 w-80 sm:w-96',
    variants: {
        variant: {
            primary: 'bg-primary text-primary-content border-primary/20',
            secondary: 'bg-secondary text-secondary-content border-secondary/20',
            accent: 'bg-accent text-accent-content border-accent/20',
            neutral: 'bg-neutral text-neutral-content border-neutral/20',
            'base-100': 'bg-base-100 text-base-content border-base-300',
            'base-200': 'bg-base-200 text-base-content border-base-300',
            'base-300': 'bg-base-300 text-base-content border-base-content/20',
            info: 'bg-info text-info-content border-info/20',
            success: 'bg-success text-success-content border-success/20',
            warning: 'bg-warning text-warning-content border-warning/20',
            error: 'bg-error text-error-content border-error/20',
        },
        position: {
            'top-left': 'top-4 left-4 sm:left-4',
            'top-center': 'top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2',
            'top-right': 'top-4 right-4 sm:right-4',
            'bottom-left': 'bottom-4 left-4 sm:left-4',
            'bottom-center': 'bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2',
            'bottom-right': 'bottom-4 right-4 sm:right-4',
        },
    },
    defaultVariants: {
        variant: 'info',
        position: 'top-right',
    },
});

const toastIcon = tv({
    base: 'flex-shrink-0 w-5 h-5 mt-0.5',
    variants: {
        variant: {
            primary: 'text-primary-content',
            secondary: 'text-secondary-content',
            accent: 'text-accent-content',
            neutral: 'text-neutral-content',
            'base-100': 'text-base-content',
            'base-200': 'text-base-content',
            'base-300': 'text-base-content',
            info: 'text-info-content',
            success: 'text-success-content',
            warning: 'text-warning-content',
            error: 'text-error-content',
        },
    },
});

const toastCloseButton = tv({
    base: 'flex-shrink-0 ml-auto p-1 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
    variants: {
        variant: {
            primary: 'text-primary-content focus:ring-primary-content/20',
            secondary: 'text-secondary-content focus:ring-secondary-content/20',
            accent: 'text-accent-content focus:ring-accent-content/20',
            neutral: 'text-neutral-content focus:ring-neutral-content/20',
            'base-100': 'text-base-content focus:ring-base-content/20',
            'base-200': 'text-base-content focus:ring-base-content/20',
            'base-300': 'text-base-content focus:ring-base-content/20',
            info: 'text-info-content focus:ring-info-content/20',
            success: 'text-success-content focus:ring-success-content/20',
            warning: 'text-warning-content focus:ring-warning-content/20',
            error: 'text-error-content focus:ring-error-content/20',
        },
    },
});

// Icon components for different toast types
const InfoIcon = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
);

const SuccessIcon = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const WarningIcon = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const ErrorIcon = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

const NeutralIcon = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
);

const CloseIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export type ToastVariants = VariantProps<typeof toast>;

export interface ToastProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    /** Toast variant that determines color scheme and icon */
    variant?: ToastVariants['variant'];
    /** Position of the toast on screen */
    position?: ToastVariants['position'];
    /** Toast title */
    title?: string;
    /** Toast message content */
    message: string;
    /** Whether to show close button */
    showCloseButton?: boolean;
    /** Whether to show icon */
    showIcon?: boolean;
    /** Callback when close button is clicked */
    onClose?: () => void;
    /** Auto dismiss timeout in milliseconds. Set to 0 to disable auto dismiss */
    autoCloseDelay?: number;
}

export default function Toast({
    className,
    variant = 'info',
    position = 'top-right',
    title,
    message,
    showCloseButton = true,
    showIcon = true,
    onClose,
    autoCloseDelay = 4000,
    ...props
}: ToastProps) {
    // Auto close functionality
    if (autoCloseDelay > 0 && onClose) {
        setTimeout(() => {
            onClose();
        }, autoCloseDelay);
    }

    const getIcon = () => {
        if (!showIcon) return null;
        
        switch (variant) {
            case 'success':
                return <SuccessIcon />;
            case 'warning':
                return <WarningIcon />;
            case 'error':
                return <ErrorIcon />;
            case 'neutral':
                return <NeutralIcon />;
            case 'primary':
            case 'secondary':
            case 'accent':
            case 'base-100':
            case 'base-200':
            case 'base-300':
            case 'info':
            default:
                return <InfoIcon />;
        }
    };

    return (
        <div
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className={toast({ variant, position, className })}
            {...props}
        >
            {showIcon && (
                <div className={toastIcon({ variant })}>
                    {getIcon()}
                </div>
            )}
            
            <div className="flex-1 min-w-0">
                {title && (
                    <div className="font-semibold mb-1 break-words">
                        {title}
                    </div>
                )}
                <div className="break-words">
                    {message}
                </div>
            </div>

            {showCloseButton && onClose && (
                <button
                    type="button"
                    className={toastCloseButton({ variant })}
                    onClick={onClose}
                    aria-label="Close notification"
                >
                    <CloseIcon />
                </button>
            )}
        </div>
    );
}
