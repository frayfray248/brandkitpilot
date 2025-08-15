import type { ElementType } from 'react';
import FlexBox, { FlexBoxProps, type FlexBoxVariants } from '../FlexBox/FlexBox';

export type StackProps<T extends ElementType = 'div'> = {
    direction?: FlexBoxVariants['direction'];
    gap?: FlexBoxVariants['gap'];
    wrap?: FlexBoxVariants['wrap'];
} & Omit<FlexBoxProps<T>, keyof FlexBoxVariants>;

export default function Stack<T extends ElementType = 'div'>({
    direction = 'column',
    gap = '0',
    wrap = 'nowrap',
    ...props
}: StackProps<T>) {
    const flexBoxProps = {
        ...props,
        direction,
        gap,
        wrap,
    } as FlexBoxProps<T>;

    return <FlexBox<T> {...flexBoxProps} />;
}

