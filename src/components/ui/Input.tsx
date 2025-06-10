import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  fullWidth?: boolean;
  helper?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, fullWidth = false, helper, id, ...props }, ref) => {
    // Generate a unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            className={cn(
              'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:ring-red-500',
              fullWidth && 'w-full',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {helper && !error && (
          <p className="text-sm text-gray-500">{helper}</p>
        )}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 