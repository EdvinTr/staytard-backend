import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
export const passwordValidationRegex = new RegExp(
  /^((?=.*[a-zA-ZåäöæøÅÄÖÆØ])(?=.*[0-9]))[\S]{8,}$/,
);
export default function IsValidPassword(
  property: string,
  validationOptions?: ValidationOptions,
) {
  let message: string;
  const validate = (
    value: any,
    validationArgs: ValidationArguments,
  ): boolean => {
    if (typeof value !== 'string') {
      return false;
    }
    if (
      value.length < PASSWORD_MIN_LENGTH ||
      value.length > PASSWORD_MAX_LENGTH
    ) {
      message = `${validationArgs.property} must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long`;
      return false;
    }
    if (!passwordValidationRegex.test(value)) {
      message = `${validationArgs.property} must contain at least one letter and one number`;
      return false;
    }
    return true;
  };
  const defaultMessage = () => {
    return message;
  };
  return (object: Record<any, any>, propertyName: string): void => {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate,
        defaultMessage,
      },
    });
  };
}
