'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface RadioButtonProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, name, ...props }, ref) => {
    const radioId = props.id || `${name}-${label.replace(/\s+/g, '-')}`;

    return (
      <div className="flex items-center">
        <input
          id={radioId}
          name={name}
          type="radio"
          ref={ref}
          className="h-5 w-5 border-gray-300 text-[#3182F6] focus:ring-[#3182F6]"
          {...props}
        />
        <label
          htmlFor={radioId}
          className="ml-3 block text-[15px] font-medium leading-6 text-[#333D4B]"
        >
          {label}
        </label>
      </div>
    );
  },
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;
