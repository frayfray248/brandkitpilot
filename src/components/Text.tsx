'use client';

import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const text = tv({
  base: '',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    color: {
      base: 'text-base-content',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
    bold: {
      true: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'base',
  },
});

type TextVariants = VariantProps<typeof text>;

export type TextProps<T extends ElementType = 'p'> = {
  as?: T;
} & TextVariants &
  Omit<ComponentPropsWithoutRef<T>, keyof TextVariants | 'as'>;

export default function Text<T extends ElementType = 'p'>({
  as,
  size,
  color,
  bold,
  className,
  ...props
}: TextProps<T>) {
  const Component = as ?? 'p';

  return (
    <Component className={text({ size, color, bold, className })} {...props} />
  );
}

