'use client';

import Text from '@/components/typography/Text/Text';
import { tv, type VariantProps } from 'tailwind-variants';

const formGroup = tv({
    base: 'space-y-1',
    variants: {
        size: {
            sm: 'space-y-1',
            md: 'space-y-2',
            lg: 'space-y-3',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const label = tv({
    base: 'block font-medium',
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
        },
        required: {
            true: "after:content-['*'] after:text-error after:ml-1",
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const legend = tv({
    base: 'block font-medium',
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
        },
        required: {
            true: "after:content-['*'] after:text-error after:ml-1",
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export type FormGroupVariants = VariantProps<typeof formGroup>;

export type FormGroupProps = {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
    /**
     * Set to true when wrapping multiple form controls (like checkboxes/radios)
     * This will use fieldset + legend instead of label
     */
    fieldset?: boolean;
} & FormGroupVariants;

export default function FormGroup({
    label: labelText,
    helperText,
    errorMessage,
    required = false,
    size,
    children,
    className,
    fieldset = false,
}: FormGroupProps) {
    const hasError = Boolean(errorMessage);

    if (fieldset) {
        return (
            <fieldset className={formGroup({ size, className })}>
                {labelText && (
                    <legend className={legend({ size, required })}>
                        {labelText}
                    </legend>
                )}
                
                {children}
                
                {helperText && !hasError && (
                    <Text 
                        size={size === 'lg' ? 'sm' : 'xs'} 
                        color="base-300"
                        className="mt-1"
                    >
                        {helperText}
                    </Text>
                )}
                
                {errorMessage && (
                    <Text 
                        size={size === 'lg' ? 'sm' : 'xs'} 
                        color="error"
                        className="mt-1"
                    >
                        {errorMessage}
                    </Text>
                )}
            </fieldset>
        );
    }

    return (
        <div className={formGroup({ size, className })}>
            {labelText && (
                <label className={label({ size, required })}>
                    {labelText}
                </label>
            )}
            
            {children}
            
            {helperText && !hasError && (
                <Text 
                    size={size === 'lg' ? 'sm' : 'xs'} 
                    color="base-300"
                    className="mt-1"
                >
                    {helperText}
                </Text>
            )}
            
            {errorMessage && (
                <Text 
                    size={size === 'lg' ? 'sm' : 'xs'} 
                    color="error"
                    className="mt-1"
                >
                    {errorMessage}
                </Text>
            )}
        </div>
    );
}
