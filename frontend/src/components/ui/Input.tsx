import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, startIcon, endIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-[#374151] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-gray-400">
              {startIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              'w-full bg-white border text-sm text-[#111827] rounded-lg transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              startIcon ? 'pl-9' : 'pl-3.5',
              endIcon ? 'pr-9' : 'pr-3.5',
              'py-2',
              error ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-[#E5E7EB]',
              className
            )}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 flex items-center text-gray-400">
              {endIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
