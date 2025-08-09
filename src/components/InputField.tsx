'use client';

import type {
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const input = tv({
    base: 'rounded border bg-base-100 text-base-content placeholder:text-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 disabled:opacity-50 disabled:cursor-not-allowed',
    variants: {
        color: {
            base: 'border-base-300 focus:ring-base-300',
            primary: 'border-primary focus:ring-primary',
            secondary: 'border-secondary focus:ring-secondary',
            accent: 'border-accent focus:ring-accent',
            neutral: 'border-neutral focus:ring-neutral',
            info: 'border-info focus:ring-info',
            success: 'border-success focus:ring-success',
            warning: 'border-warning focus:ring-warning',
            error: 'border-error focus:ring-error',
        },
        size: {
            sm: 'px-2 py-1 text-sm',
            md: 'px-3 py-2 text-base',
            lg: 'px-4 py-3 text-lg',
        },
        fullWidth: {
            true: 'w-full',
        },
    },
    defaultVariants: {
        color: 'base',
        size: 'md',
    },
});

export type InputVariants = VariantProps<typeof input>;

type AllowedInputTypes = Exclude<
    HTMLInputTypeAttribute,
    'checkbox' | 'radio' | 'file' | 'range'
>;

type BaseProps = InputVariants & {
    className?: string;
};

export type TextInputProps = {
    type?: AllowedInputTypes;
} & BaseProps &
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | keyof InputVariants>;

export type TextAreaProps = {
    type: 'textarea';
} & BaseProps &
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'type' | keyof InputVariants>;

export type InputFieldProps = TextInputProps | TextAreaProps;

export default function InputField(props: InputFieldProps) {
    const { type = 'text', size, color, fullWidth, className, ...rest } = props;

    if (type === 'textarea') {
        return (
            <textarea
                className={input({ size, color, fullWidth, className })}
                {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
        );
    }

    return (
        <input
            type={type}
            className={input({ size, color, fullWidth, className })}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
    );
}

