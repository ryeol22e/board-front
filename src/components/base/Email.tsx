'use client';

import { forwardRef } from 'react';
import Input, { type InputProps } from './Input';

// 'type' prop is fixed to "email", so we omit it from the public props.
export interface EmailInputProps extends Omit<InputProps, 'type'> {}

const Email = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  return <Input type="email" autoComplete="email" ref={ref} {...props} />;
});

Email.displayName = 'Email';

export default Email;
