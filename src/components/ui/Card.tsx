import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  bordered?: boolean;
}

export function Card({
  children,
  className,
  hover = false,
  bordered = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden',
        bordered && 'border border-gray-200',
        hover && 'transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn('text-xl font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Export all components
export default {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
}; 