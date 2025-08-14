import type { ReactNode } from 'react';
import FlexBox, { type FlexBoxVariants } from '../FlexBox/FlexBox';

export type StackProps = {
    direction?: FlexBoxVariants['direction'];
    gap?: FlexBoxVariants['gap'];
    className?: string;
    children?: ReactNode;
};

export default function Stack({
    direction = 'column',
    gap = '0',
    className,
    children,
}: StackProps) {
    return (
        <FlexBox direction={direction} gap={gap} className={className}>
            {children}
        </FlexBox>
    );
}

