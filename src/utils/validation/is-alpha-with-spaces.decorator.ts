import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export default function IsAlphaWithSpaces(
  property: string,
  minLength: number,
  maxLength: number,
  validationOptions?: ValidationOptions,
) {
  let message: string;
  const regex = new RegExp(
    '^[a-zA-ZåäöæøÅÄÖÆØ\\s]{' + minLength + ',' + maxLength + '}$',
  );
  const validate = (
    value: any,
    validationArgs: ValidationArguments,
  ): boolean => {
    message = `${validationArgs.property} must only consist of letters`;
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
      name: 'IsAlphaWithSpaces',
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
