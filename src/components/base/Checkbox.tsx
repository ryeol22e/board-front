'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, name, ...props }, ref) => {
    const checkboxId = props.id || name;

    return (
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id={checkboxId}
            name={name}
            type="checkbox"
            ref={ref}
            className="h-5 w-5 shrink-0 rounded-md border-gray-300 text-[#3182F6] focus:ring-[#3182F6]"
            {...props}
          />
        </div>
        <div className="ml-3 text-[15px] leading-6">
          <label htmlFor={checkboxId} className="font-medium text-[#333D4B]">
            {label}
          </label>
        </div>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
