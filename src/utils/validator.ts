import { ValidatorType } from '@/types/base';

export const validator = () => {
  const validate = (validators: Array<ValidatorType>) =>
    validators.every((valid) =>
      typeof valid === 'function' ? valid() : valid.validate(),
    );

  return {
    validate,
  };
};
