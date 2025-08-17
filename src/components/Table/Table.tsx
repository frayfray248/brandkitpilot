import type { ComponentPropsWithRef, ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';



const table = tv({
    base: 'w-full text-left border-collapse',
    variants: {
        variant: {
            bordered: '',
            lined: '',
            minimal: '',
        },
        zebra: {
            true: '',
        },
        size: {
            xs: 'text-xs [&_td]:py-1 [&_td]:px-1 [&_th]:py-1 [&_th]:px-1',
            sm: 'text-sm [&_td]:py-2 [&_td]:px-2 [&_th]:py-2 [&_th]:px-2',
            md: 'text-base [&_td]:py-3 [&_td]:px-3 [&_th]:py-3 [&_th]:px-3',
            lg: 'text-lg [&_td]:py-4 [&_td]:px-4 [&_th]:py-4 [&_th]:px-4',
        },
        color: {
            base: '',
            primary: '',
            secondary: '',
            accent: '',
            neutral: '',
            info: '',
            success: '',
            warning: '',
            error: '',
        },
    },
    compoundVariants: [
        // Base color variants
        {
            variant: 'bordered',
            color: 'base',
            className: 'border border-base-300 [&_td]:border [&_td]:border-base-300 [&_th]:border [&_th]:border-base-300 [&>thead]:bg-base-300',
        },
        {
            variant: 'lined',
            color: 'base',
            className: '[&_td]:border-b [&_td]:border-base-300 [&_th]:border-b [&_th]:border-base-300',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'base',
            className: '[&>thead]:bg-base-300',
        },
        {
            zebra: true,
            color: 'base',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-base-100 [&>tbody]:[&>tr:nth-child(even)]:bg-base-200',
        },
        
        // Primary color variants
        {
            variant: 'bordered',
            color: 'primary',
            className: 'border border-primary [&_td]:border [&_td]:border-primary [&_th]:border [&_th]:border-primary [&>thead]:bg-primary/20',
        },
        {
            variant: 'lined',
            color: 'primary',
            className: '[&_td]:border-b [&_td]:border-primary [&_th]:border-b [&_th]:border-primary',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'primary',
            className: '[&>thead]:bg-primary/20',
        },
        {
            zebra: true,
            color: 'primary',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-primary/5 [&>tbody]:[&>tr:nth-child(even)]:bg-primary/10',
        },
        
        // Secondary color variants
        {
            variant: 'bordered',
            color: 'secondary',
            className: 'border border-secondary [&_td]:border [&_td]:border-secondary [&_th]:border [&_th]:border-secondary [&>thead]:bg-secondary/20',
        },
        {
            variant: 'lined',
            color: 'secondary',
            className: '[&_td]:border-b [&_td]:border-secondary [&_th]:border-b [&_th]:border-secondary',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'secondary',
            className: '[&>thead]:bg-secondary/20',
        },
        {
            zebra: true,
            color: 'secondary',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-secondary/5 [&>tbody]:[&>tr:nth-child(even)]:bg-secondary/10',
        },
        
        // Accent color variants
        {
            variant: 'bordered',
            color: 'accent',
            className: 'border border-accent [&_td]:border [&_td]:border-accent [&_th]:border [&_th]:border-accent [&>thead]:bg-accent/20',
        },
        {
            variant: 'lined',
            color: 'accent',
            className: '[&_td]:border-b [&_td]:border-accent [&_th]:border-b [&_th]:border-accent',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'accent',
            className: '[&>thead]:bg-accent/20',
        },
        {
            zebra: true,
            color: 'accent',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-accent/5 [&>tbody]:[&>tr:nth-child(even)]:bg-accent/10',
        },
        
        // Neutral color variants
        {
            variant: 'bordered',
            color: 'neutral',
            className: 'border border-neutral [&_td]:border [&_td]:border-neutral [&_th]:border [&_th]:border-neutral [&>thead]:bg-neutral/20',
        },
        {
            variant: 'lined',
            color: 'neutral',
            className: '[&_td]:border-b [&_td]:border-neutral [&_th]:border-b [&_th]:border-neutral',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'neutral',
            className: '[&>thead]:bg-neutral/20',
        },
        {
            zebra: true,
            color: 'neutral',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-neutral/5 [&>tbody]:[&>tr:nth-child(even)]:bg-neutral/10',
        },
        
        // Info color variants
        {
            variant: 'bordered',
            color: 'info',
            className: 'border border-info [&_td]:border [&_td]:border-info [&_th]:border [&_th]:border-info [&>thead]:bg-info/20',
        },
        {
            variant: 'lined',
            color: 'info',
            className: '[&_td]:border-b [&_td]:border-info [&_th]:border-b [&_th]:border-info',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'info',
            className: '[&>thead]:bg-info/20',
        },
        {
            zebra: true,
            color: 'info',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-info/5 [&>tbody]:[&>tr:nth-child(even)]:bg-info/10',
        },
        
        // Success color variants
        {
            variant: 'bordered',
            color: 'success',
            className: 'border border-success [&_td]:border [&_td]:border-success [&_th]:border [&_th]:border-success [&>thead]:bg-success/20',
        },
        {
            variant: 'lined',
            color: 'success',
            className: '[&_td]:border-b [&_td]:border-success [&_th]:border-b [&_th]:border-success',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'success',
            className: '[&>thead]:bg-success/20',
        },
        {
            zebra: true,
            color: 'success',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-success/5 [&>tbody]:[&>tr:nth-child(even)]:bg-success/10',
        },
        
        // Warning color variants
        {
            variant: 'bordered',
            color: 'warning',
            className: 'border border-warning [&_td]:border [&_td]:border-warning [&_th]:border [&_th]:border-warning [&>thead]:bg-warning/20',
        },
        {
            variant: 'lined',
            color: 'warning',
            className: '[&_td]:border-b [&_td]:border-warning [&_th]:border-b [&_th]:border-warning',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'warning',
            className: '[&>thead]:bg-warning/20',
        },
        {
            zebra: true,
            color: 'warning',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-warning/5 [&>tbody]:[&>tr:nth-child(even)]:bg-warning/10',
        },
        
        // Error color variants
        {
            variant: 'bordered',
            color: 'error',
            className: 'border border-error [&_td]:border [&_td]:border-error [&_th]:border [&_th]:border-error [&>thead]:bg-error/20',
        },
        {
            variant: 'lined',
            color: 'error',
            className: '[&_td]:border-b [&_td]:border-error [&_th]:border-b [&_th]:border-error',
        },
        {
            variant: ['minimal', 'lined'],
            zebra: true,
            color: 'error',
            className: '[&>thead]:bg-error/20',
        },
        {
            zebra: true,
            color: 'error',
            className: '[&>tbody]:[&>tr:nth-child(odd)]:bg-error/5 [&>tbody]:[&>tr:nth-child(even)]:bg-error/10',
        },
    ],
    defaultVariants: {
        variant: 'minimal',
        size: 'md',
        color: 'base',
    },
});

export type TableVariants = VariantProps<typeof table>;

export type TableProps<T extends ElementType = 'table'> = {
    as?: T;
} & TableVariants &
    Omit<ComponentPropsWithRef<T>, keyof TableVariants | 'as'>;

function Table<T extends ElementType = 'table'>({
    as,
    variant,
    size,
    zebra,
    color,
    className,
    ...props
}: TableProps<T>) {
    const Component = as ?? 'table';

    return (
        <Component
            className={table({ variant, size, zebra, color, className })}
            {...props}
        />
    );
}

export default Table;
