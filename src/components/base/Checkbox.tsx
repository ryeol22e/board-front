'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, name, ...props }, ref) => {
  const checkboxId = props.id || name;

  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input id={checkboxId} name={name} type="checkbox" ref={ref} className="h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" {...props} />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={checkboxId} className="font-medium text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
