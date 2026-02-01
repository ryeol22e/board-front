'use client';

import { forwardRef } from 'react';
import Input, { type InputProps } from './Input';

export interface TextInputProps extends Omit<InputProps, 'type'> {}

const Text = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <Input type="text" autoComplete="off" ref={ref} {...props} />;
});

Text.displayName = 'Text';

export default Text;
