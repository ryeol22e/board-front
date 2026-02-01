'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface RadioButtonProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(({ label, name, ...props }, ref) => {
  const radioId = props.id || `${name}-${label.replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-center">
      <input id={radioId} name={name} type="radio" ref={ref} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" {...props} />
      <label htmlFor={radioId} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

export default RadioButton;
