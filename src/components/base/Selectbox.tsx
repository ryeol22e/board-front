'use client';

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

export interface SelectboxProps extends ComponentPropsWithoutRef<'select'> {
  label?: string;
  children: ReactNode;
}

const Selectbox = forwardRef<HTMLSelectElement, SelectboxProps>(({ label, name, children, className, ...props }, ref) => {
  const selectId = props.id || name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        ref={ref}
        className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-shadow ${className}`}
        {...props}>
        {children}
      </select>
    </div>
  );
});

Selectbox.displayName = 'Selectbox';

export default Selectbox;
