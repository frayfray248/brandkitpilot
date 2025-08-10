'use client';

import type { InputHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const checkbox = tv({
    base: 'rounded border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 disabled:opacity-50 disabled:cursor-not-allowed',
    variants: {
        size: {
            sm: 'w-4 h-4',
            md: 'w-5 h-5',
            lg: 'w-6 h-6',
        },
        color: {
            base: 'accent-base-300',
            primary: 'accent-primary',
            secondary: 'accent-secondary',
            accent: 'accent-accent',
            neutral: 'accent-neutral',
            info: 'accent-info',
            success: 'accent-success',
            warning: 'accent-warning',
            error: 'accent-error',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'base',
    },
});

export type CheckBoxVariants = VariantProps<typeof checkbox>;

export type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & CheckBoxVariants;

export default function CheckBox({ className, size, color, ...props }: CheckBoxProps) {
    return (
        <input
            type="checkbox"
            className={checkbox({ size, color, className })}
            {...props}
        />
    );
}

