'use client';

import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'base'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'sm' | 'md' | 'lg';
};

const baseClasses =
  'rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-primary-content hover:bg-primary/90 focus:ring-primary',
  secondary:
    'bg-secondary text-secondary-content hover:bg-secondary/90 focus:ring-secondary',
  accent:
    'bg-accent text-accent-content hover:bg-accent/90 focus:ring-accent',
  neutral:
    'bg-neutral text-neutral-content hover:bg-neutral/90 focus:ring-neutral',
  base:
    'bg-base-100 text-base-content hover:bg-base-200 focus:ring-base-100',
  info:
    'bg-info text-info-content hover:bg-info/90 focus:ring-info',
  success:
    'bg-success text-success-content hover:bg-success/90 focus:ring-success',
  warning:
    'bg-warning text-warning-content hover:bg-warning/90 focus:ring-warning',
  error:
    'bg-error text-error-content hover:bg-error/90 focus:ring-error',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
  return <button className={classes} {...props} />;
}

