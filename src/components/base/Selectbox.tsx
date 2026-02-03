'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

export interface SelectboxProps extends ComponentPropsWithoutRef<'select'> {
  label?: string;
  children: ReactNode;
}

const Selectbox = forwardRef<HTMLSelectElement, SelectboxProps>(
  ({ label, name, children, className, ...props }, ref) => {
    const selectId = props.id || name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold text-[#4E5968] mb-2"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          name={name}
          ref={ref}
          className={`block w-full rounded-xl border-transparent bg-[#F2F4F6] py-3.5 pl-4 pr-10 text-[15px] text-[#191F28] focus:bg-white focus:border-[#3182F6] focus:outline-none focus:ring-2 focus:ring-[#3182F6]/20 transition-all duration-200 ${className}`}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  },
);

Selectbox.displayName = 'Selectbox';

export default Selectbox;
