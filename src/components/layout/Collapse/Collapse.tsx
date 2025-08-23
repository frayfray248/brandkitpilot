import type { ComponentPropsWithRef, ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { useId } from 'react';

const collapse = tv({
    base: '',
    variants: {
        breakpoint: {
            sm: 'sm:[&_.collapse-toggle]:hidden sm:[&_.collapse-content]:block max-sm:[&_.collapse-content]:hidden max-sm:[&_.collapse-toggle-label:checked~.collapse-content]:block',
            md: 'md:[&_.collapse-toggle]:hidden md:[&_.collapse-content]:block max-md:[&_.collapse-content]:hidden max-md:[&_.collapse-toggle-label:checked~.collapse-content]:block',
            lg: 'lg:[&_.collapse-toggle]:hidden lg:[&_.collapse-content]:block max-lg:[&_.collapse-content]:hidden max-lg:[&_.collapse-toggle-label:checked~.collapse-content]:block',
            xl: 'xl:[&_.collapse-toggle]:hidden xl:[&_.collapse-content]:block max-xl:[&_.collapse-content]:hidden max-xl:[&_.collapse-toggle-label:checked~.collapse-content]:block',
            '2xl': '2xl:[&_.collapse-toggle]:hidden 2xl:[&_.collapse-content]:block max-2xl:[&_.collapse-content]:hidden max-2xl:[&_.collapse-toggle-label:checked~.collapse-content]:block',
        },
    },
    defaultVariants: {
        breakpoint: 'md',
    },
});


export type CollapseVariants = VariantProps<typeof collapse>;

export type CollapseProps<T extends ElementType = 'div'> = {
    as?: T;
} & CollapseVariants &
    Omit<ComponentPropsWithRef<T>, keyof CollapseVariants | 'as'>;

export type CollapseToggleProps = Omit<ComponentPropsWithRef<'label'>, 'as'>;

export type CollapseContentProps<T extends ElementType = 'div'> = {
    as?: T;
} & Omit<ComponentPropsWithRef<T>, 'as'>;

function CollapseRoot<T extends ElementType = 'div'>({
    as,
    breakpoint,
    className,
    children,
    ...props
}: CollapseProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component className={collapse({ breakpoint, className })} {...props}>
            {children}
        </Component>
    );
}

function CollapseToggle({
    className,
    children,
    ...props
}: CollapseToggleProps) {
    const id = useId();

    const label = tv({
        base: "collapse-toggle cursor-pointer select-none"
    })

    return (
        <>
            <label
                htmlFor={id}
                className={label(className)}
                {...props}
            >
                {children}
            </label>
            <input
                id={id}
                className='collapse-toggle-label hidden'
                type="checkbox"
            />
        </>
    );
}

function CollapseContent<T extends ElementType = 'div'>({
    as,
    className,
    children,
    ...props
}: CollapseContentProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={`collapse-content ${className || ''}`}
            {...props}
        >
            {children}
        </Component>
    );
}

// Compound component pattern
const Collapse = Object.assign(CollapseRoot, {
    Toggle: CollapseToggle,
    Content: CollapseContent,
});

export default Collapse;