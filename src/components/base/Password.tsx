'use client';

import { forwardRef } from 'react';
import Input, { type InputProps } from './Input';

// 'type' prop is fixed to "password", so we omit it from the public props.
export interface PasswordInputProps extends Omit<InputProps, 'type'> {}

const Password = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  return <Input type="password" autoComplete="current-password" ref={ref} {...props} />;
});

Password.displayName = 'Password';

export default Password;
