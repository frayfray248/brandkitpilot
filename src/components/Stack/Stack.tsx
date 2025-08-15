import type { ReactNode } from 'react';
import FlexBox, { FlexBoxProps, type FlexBoxVariants } from '../FlexBox/FlexBox';

export type StackProps = {
    direction?: FlexBoxVariants['direction'];
    gap?: FlexBoxVariants['gap'];
    className?: string;
    children?: ReactNode;
    ref?: FlexBoxProps['ref'];
};

export default function Stack({
    direction = 'column',
    gap = '0',
    className,
    children,
    ref,
}: StackProps) {
    return (
        <FlexBox direction={direction} gap={gap} className={className} ref={ref}>
            {children}
        </FlexBox>
    );
}

