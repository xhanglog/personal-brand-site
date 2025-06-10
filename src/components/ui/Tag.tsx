import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
}

export default function Tag({
  children,
  className,
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  ...props
}: TagProps) {
  // Variant styles
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800',
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded',
    md: 'text-sm px-2.5 py-0.5 rounded-md',
    lg: 'text-base px-3 py-1 rounded-lg',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          className={cn(
            'ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2',
            {
              'focus:ring-blue-500': variant === 'primary',
              'focus:ring-purple-500': variant === 'secondary',
              'focus:ring-green-500': variant === 'success',
              'focus:ring-red-500': variant === 'danger',
              'focus:ring-yellow-500': variant === 'warning',
              'focus:ring-cyan-500': variant === 'info',
              'focus:ring-gray-400': variant === 'default',
            }
          )}
          onClick={onRemove}
        >
          <svg
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
} 