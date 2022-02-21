import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export default function IsAlphanumericWithSpaces(
  property: string,
  minLength: number,
  maxLength: number,
  validationOptions?: ValidationOptions,
) {
  let message: string;
  const regex = new RegExp(
    '^[a-zA-ZåäöæøÅÄÖÆØ0-9\\s]{' + minLength + ',' + maxLength + '}$',
  );
  const validate = (
    value: any,
    validationArgs: ValidationArguments,
  ): boolean => {
    message = `${validationArgs.property} must only consist of letters and numbers`;
    if (typeof value !== 'string') {
      return false;
    }
    const trimmedValue = value.trim();
    if (!regex.test(trimmedValue)) {
      return false;
    }
    return true;
  };
  const defaultMessage = () => {
    return message;
  };
  return (object: Record<any, any>, propertyName: string): void => {
    registerDecorator({
      name: 'IsAlphanumericWithSpaces',
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
