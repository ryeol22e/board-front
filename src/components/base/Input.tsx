'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name, label, className, error, ...props }, ref) => {
    const inputId = props.id || name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[#4E5968] mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          name={name}
          ref={ref}
          className={`block w-full px-4 py-3.5 bg-[#F2F4F6] border border-transparent rounded-xl text-[#191F28] placeholder-[#B0B8C1] focus:outline-none focus:bg-white focus:border-[#3182F6] focus:ring-2 focus:ring-[#3182F6]/20 transition-all duration-200 sm:text-[15px] ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
