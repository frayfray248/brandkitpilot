import type { ComponentPropsWithRef, ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const box = tv({
    base: '',
    variants: {
        padding: {
            '0': 'p-0',
            '1': 'p-1',
            '2': 'p-2',
            '3': 'p-3',
            '4': 'p-4',
            '5': 'p-5',
            '6': 'p-6',
            '8': 'p-8',
            '10': 'p-10',
            '12': 'p-12',
            '16': 'p-16',
            '20': 'p-20',
            '24': 'p-24',
        },
        margin: {
            '0': 'm-0',
            '1': 'm-1',
            '2': 'm-2',
            '3': 'm-3',
            '4': 'm-4',
            '5': 'm-5',
            '6': 'm-6',
            '8': 'm-8',
            '10': 'm-10',
            '12': 'm-12',
            '16': 'm-16',
            '20': 'm-20',
            '24': 'm-24',
        },
        bgColor: {
            base: 'bg-base-100',
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            accent: 'bg-accent',
            neutral: 'bg-neutral',
            info: 'bg-info',
            success: 'bg-success',
            warning: 'bg-warning',
            error: 'bg-error',
        },
    },
    defaultVariants: {
        padding: '0',
        margin: '0',
        bgColor: 'base',
    },
});

export type BoxVariants = VariantProps<typeof box>;

export type BoxProps<T extends ElementType = 'div'> = {
    as?: T;
} & BoxVariants &
    Omit<ComponentPropsWithRef<T>, keyof BoxVariants | 'as'>;

export default function Box<T extends ElementType = 'div'>({
    as,
    padding,
    margin,
    bgColor,
    className,
    ...props
}: BoxProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={box({ padding, margin, bgColor, className })}
            {...props}
        />
    );
}

