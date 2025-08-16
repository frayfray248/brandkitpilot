import type { ComponentPropsWithRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const badge = tv({
    base: 'inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap',
    variants: {
        variant: {
            primary:
                'bg-primary text-primary-content',
            secondary:
                'bg-secondary text-secondary-content',
            accent:
                'bg-accent text-accent-content',
            neutral:
                'bg-neutral text-neutral-content',
            'base-100':
                'bg-base-100 text-base-content',
            'base-200':
                'bg-base-200 text-base-content',
            'base-300':
                'bg-base-300 text-base-content',
            info: 'bg-info text-info-content',
            success:
                'bg-success text-success-content',
            warning:
                'bg-warning text-warning-content',
            error:
                'bg-error text-error-content',
            outline:
                'border border-base-300 bg-base-100 text-base-content',
        },
        size: {
            sm: 'px-2 py-0.5 text-xs min-h-[16px]',
            md: 'px-2.5 py-1 text-sm min-h-[20px]',
            lg: 'px-3 py-1.5 text-base min-h-[24px]',
        },
        dot: {
            true: 'w-2 h-2 p-0 min-h-0',
        },
    },
    defaultVariants: {
        variant: 'base-200',
        size: 'md',
    },
    compoundVariants: [
        {
            dot: true,
            size: 'sm',
            className: 'w-2 h-2',
        },
        {
            dot: true,
            size: 'md',
            className: 'w-3 h-3',
        },
        {
            dot: true,
            size: 'lg',
            className: 'w-4 h-4',
        },
    ],
});

export type BadgeVariants = VariantProps<typeof badge>;

export type BadgeProps = ComponentPropsWithRef<'span'> &
    BadgeVariants;

export default function Badge({
    className,
    variant,
    size,
    dot,
    children,
    ...props
}: BadgeProps) {
    return (
        <span className={badge({ variant, size, dot, className })} {...props}>
            {!dot && children}
        </span>
    );
}
