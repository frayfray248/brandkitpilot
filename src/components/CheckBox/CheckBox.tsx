import Text, { TextVariants } from '@/components/Text/Text';
import type { ComponentPropsWithRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const checkbox = tv({
    base: 'peer appearance-none rounded border bg-base-100 text-base-content disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
    variants: {
        size: {
            sm: 'w-4 h-4',
            md: 'w-5 h-5',
            lg: 'w-6 h-6',
        },
        color: {
            base: 'border-base-300 checked:bg-base-200',
            primary: 'border-primary checked:bg-primary',
            secondary: 'border-secondary checked:bg-secondary',
            accent: 'border-accent checked:bg-accent',
            neutral: 'border-neutral checked:bg-neutral',
            info: 'border-info checked:bg-info',
            success: 'border-success checked:bg-success',
            warning: 'border-warning checked:bg-warning',
            error: 'border-error checked:bg-error',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'neutral',
    },
});

export type CheckBoxVariants = VariantProps<typeof checkbox>;

type OmitHTMLInputSize = Omit<ComponentPropsWithRef<'input'>, 'size'>;

export type CheckBoxProps = OmitHTMLInputSize & CheckBoxVariants & {
    children?: React.ReactNode;
    text?: string;
}

export default function CheckBox({ className, size, color, children, text, ...props }: CheckBoxProps) {

    const textSize: Record<'sm' | 'md' | 'lg', TextVariants['size']> = {
        sm: 'xs',
        md: 'md',
        lg: 'lg',
    };

    return (
        <label className='flex items-center space-x-2'>
            <span className="relative inline-flex w-min">
                <input
                    type="checkbox"
                    className={checkbox({ size, color, className })}
                    {...props}
                />
                {/* Checkmark */}
                <span
                    className={`
                        pointer-events-none absolute
                        hidden peer-checked:inline-block
                        w-full h-full
                    `}
                >
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        className="w-full h-full"
                    >
                        <polyline points="4,10 6,12 12,6" />
                    </svg>
                </span>
            </span>

            {children && <span>{children}</span>}
            {text && <Text size={textSize[size || 'md']} >{text}</Text>}
        </label>
    );
}

