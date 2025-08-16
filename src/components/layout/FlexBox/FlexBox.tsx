import type { ComponentPropsWithRef, ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const flexBox = tv({
    base: '',
    variants: {
        display: {
            flex: 'flex',
            inline: 'inline-flex',
        },
        direction: {
            row: 'flex-row',
            'row-reverse': 'flex-row-reverse',
            column: 'flex-col',
            'column-reverse': 'flex-col-reverse',
        },
        justify: {
            start: 'justify-start',
            end: 'justify-end',
            center: 'justify-center',
            between: 'justify-between',
            around: 'justify-around',
            evenly: 'justify-evenly',
        },
        items: {
            start: 'items-start',
            end: 'items-end',
            center: 'items-center',
            stretch: 'items-stretch',
            baseline: 'items-baseline',
        },
        wrap: {
            wrap: 'flex-wrap',
            'wrap-reverse': 'flex-wrap-reverse',
            nowrap: 'flex-nowrap',
        },
        gap: {
            '0': 'gap-0',
            '1': 'gap-1',
            '2': 'gap-2',
            '3': 'gap-3',
            '4': 'gap-4',
            '5': 'gap-5',
            '6': 'gap-6',
            '8': 'gap-8',
            '10': 'gap-10',
            '12': 'gap-12',
            '16': 'gap-16',
            '20': 'gap-20',
            '24': 'gap-24',
        },
    },
    defaultVariants: {
        display: 'flex',
        direction: 'row',
    },
});

export type FlexBoxVariants = VariantProps<typeof flexBox>;

export type FlexBoxProps<T extends ElementType = 'div'> = {
    as?: T;
} & FlexBoxVariants &
    Omit<ComponentPropsWithRef<T>, keyof FlexBoxVariants | 'as'>;

export default function FlexBox<T extends ElementType = 'div'>({
    as,
    display,
    direction,
    justify,
    items,
    wrap,
    gap,
    className,
    ...props
}: FlexBoxProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={flexBox({
                display,
                direction,
                justify,
                items,
                wrap,
                gap,
                className,
            })}
            {...props}
        />
    );
}

