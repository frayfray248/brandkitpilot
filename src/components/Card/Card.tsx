import type { ComponentPropsWithRef, ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const card = tv({
    base: 'rounded-lg overflow-hidden',
    variants: {
        variant: {
            elevated: 'border border-base-300 shadow-sm',
            outlined: 'border border-base-300',
            filled: '',
            ghost: 'bg-transparent',
        },
        bgColor: {
            "base-100": 'bg-base-100',
            "base-200": 'bg-base-200',
            "base-300": 'bg-base-300',
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            accent: 'bg-accent',
            neutral: 'bg-neutral',
            info: 'bg-info',
            success: 'bg-success',
            warning: 'bg-warning',
            error: 'bg-error',
        },
        padding: {
            '0': 'p-0',
            '2': 'p-2',
            '3': 'p-3',
            '4': 'p-4',
            '6': 'p-6',
            '8': 'p-8',
        },
        interactive: {
            true: 'cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        },
    },
    defaultVariants: {
        variant: 'elevated',
        bgColor: 'base-100',
        padding: '0',
    },
    compoundVariants: [
        {
            variant: 'ghost',
            className: 'bg-transparent',
        },
        {
            variant: 'filled',
            bgColor: undefined,
            className: 'bg-base-200',
        },
        {
            variant: ['elevated', 'outlined'],
            bgColor: undefined,
            className: 'bg-base-100',
        },
        // Interactive hover states for each background color
        {
            bgColor: 'base-100',
            interactive: true,
            className: 'hover:bg-neutral/10',
        },
        {
            bgColor: 'base-200',
            interactive: true,
            className: 'hover:bg-neutral/10',
        },
        {
            bgColor: 'base-300',
            interactive: true,
            className: 'hover:bg-neutral/10',
        },
        {
            bgColor: 'primary',
            interactive: true,
            className: 'hover:bg-primary/50',
        },
        {
            bgColor: 'secondary',
            interactive: true,
            className: 'hover:bg-secondary/50',
        },
        {
            bgColor: 'accent',
            interactive: true,
            className: 'hover:bg-accent/50',
        },
        {
            bgColor: 'neutral',
            interactive: true,
            className: 'hover:bg-neutral/50',
        },
        {
            bgColor: 'info',
            interactive: true,
            className: 'hover:bg-info/50',
        },
        {
            bgColor: 'success',
            interactive: true,
            className: 'hover:bg-success/50',
        },
        {
            bgColor: 'warning',
            interactive: true,
            className: 'hover:bg-warning/50',
        },
        {
            bgColor: 'error',
            interactive: true,
            className: 'hover:bg-error/50',
        },
        {
            variant: 'ghost',
            interactive: true,
            className: 'hover:bg-base-100/50',
        },
    ],
});

const cardSection = tv({
    base: '',
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
            true: 'border-t border-base-300',
        },
    },
    defaultVariants: {
        padding: '4',
    },
});

export type CardVariants = VariantProps<typeof card>;
export type CardSectionVariants = VariantProps<typeof cardSection>;

export type CardProps<T extends ElementType = 'div'> = {
    as?: T;
} & CardVariants &
    Omit<ComponentPropsWithRef<T>, keyof CardVariants | 'as'>;

export type CardSectionProps<T extends ElementType = 'div'> = {
    as?: T;
} & CardSectionVariants &
    Omit<ComponentPropsWithRef<T>, keyof CardSectionVariants | 'as'>;

function CardRoot<T extends ElementType = 'div'>({
    as,
    variant,
    bgColor,
    padding,
    interactive,
    className,
    ...props
}: CardProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={card({ variant, bgColor, padding, interactive, className })}
            tabIndex={interactive ? 0 : undefined}
            {...props}
        />
    );
}

function CardHeader<T extends ElementType = 'div'>({
    as,
    padding = '4',
    divider,
    className,
    ...props
}: CardSectionProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={cardSection({ padding, divider, className })}
            {...props}
        />
    );
}

function CardBody<T extends ElementType = 'div'>({
    as,
    padding = '4',
    divider,
    className,
    ...props
}: CardSectionProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={cardSection({ padding, divider, className })}
            {...props}
        />
    );
}

function CardFooter<T extends ElementType = 'div'>({
    as,
    padding = '4',
    divider = true,
    className,
    ...props
}: CardSectionProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={cardSection({ padding, divider, className })}
            {...props}
        />
    );
}

// Compound component pattern
const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter,
});

export default Card;
