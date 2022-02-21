import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

const MIN_LENGTH = 2;
const MAX_LENGTH = 100;
export default function IsValidName(
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
    const trimmedValue = value.trim();
    if (trimmedValue.length < MIN_LENGTH || trimmedValue.length > MAX_LENGTH) {
      message = `${validationArgs.property} must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters long`;
      return false;
    }
    return true;
  };
  const defaultMessage = () => {
    return message;
  };
  return (object: Record<any, any>, propertyName: string): void => {
    registerDecorator({
      name: 'IsValidName',
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
