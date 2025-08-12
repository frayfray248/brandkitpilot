import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const text = tv({
    base: '',
    variants: {
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
            '5xl': 'text-5xl',
            '6xl': 'text-6xl',
            '7xl': 'text-7xl',
            '8xl': 'text-8xl',
            '9xl': 'text-9xl',
        },
        color: {
            'base-100': 'text-base-100',
            'base-200': 'text-base-200',
            'base-300': 'text-base-300',
            surface: 'text-surface',
            'base-content': 'text-base-content',
            primary: 'text-primary',
            'primary-content': 'text-primary-content',
            secondary: 'text-secondary',
            'secondary-content': 'text-secondary-content',
            accent: 'text-accent',
            'accent-content': 'text-accent-content',
            neutral: 'text-neutral',
            'neutral-content': 'text-neutral-content',
            info: 'text-info',
            'info-content': 'text-info-content',
            success: 'text-success',
            'success-content': 'text-success-content',
            warning: 'text-warning',
            'warning-content': 'text-warning-content',
            error: 'text-error',
            'error-content': 'text-error-content',
        },
        bold: {
            true: 'font-bold',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'base-content',
    },
});

export type TextVariants = VariantProps<typeof text>;

export type TextProps<T extends ElementType = 'p'> = {
    as?: T;
} & TextVariants &
    Omit<ComponentPropsWithoutRef<T>, keyof TextVariants | 'as'>;

export default function Text<T extends ElementType = 'p'>({
    as,
    size,
    color,
    bold,
    className,
    ...props
}: TextProps<T>) {
    const Component = as ?? 'p';

    return (
        <Component className={text({ size, color, bold, className })} {...props} />
    );
}

