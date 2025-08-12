import Text, { TextVariants } from '@/components/Text/Text';
import type { InputHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const radio = tv({
    base: 'peer appearance-none rounded-full border bg-base-100 text-base-content disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
    variants: {
        size: {
            sm: 'w-4 h-4',
            md: 'w-5 h-5',
            lg: 'w-6 h-6',
        },
        color: {
            base: 'border-base-300 checked:border-base-300 checked:bg-base-300',
            primary: 'border-primary checked:border-primary checked:bg-primary',
            secondary: 'border-secondary checked:border-secondary checked:bg-secondary',
            accent: 'border-accent checked:border-accent checked:bg-accent',
            neutral: 'border-neutral checked:border-neutral checked:bg-neutral',
            info: 'border-info checked:border-info checked:bg-info',
            success: 'border-success checked:border-success checked:bg-success',
            warning: 'border-warning checked:border-warning checked:bg-warning',
            error: 'border-error checked:border-error checked:bg-error',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'neutral',
    },
});

export type RadioVariants = VariantProps<typeof radio>;

type OmitHTMLInputSize = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
export type RadioProps = OmitHTMLInputSize & RadioVariants & {
    children?: React.ReactNode;
    text?: string;
};

export default function Radio({ className, size, color, children, text, ...props }: RadioProps) {
    const textSize: Record<'sm' | 'md' | 'lg', TextVariants['size']> = {
        sm: 'xs',
        md: 'md',
        lg: 'lg',
    };

    return (
        <label className="flex items-center space-x-2">
            <span className="relative inline-flex w-min">
                <input
                    type="radio"
                    className={radio({ size, color, className })}
                    {...props}
                />
                <span
                    className="pointer-events-none absolute hidden peer-checked:block top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-base-100"
                />
            </span>
            {children && <span>{children}</span>}
            {text && <Text size={textSize[size || 'md']}>{text}</Text>}
        </label>
    );
}

