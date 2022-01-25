import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export default function ArrayDistinct(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: Record<any, any>, propertyName: string): void => {
    registerDecorator({
      name: 'ArrayDistinct',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          if (Array.isArray(value)) {
            const distinct = [
              ...new Set(value.map((v): Record<any, any> => v[property])),
            ];
            return distinct.length === value.length;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must not contain duplicate entry for ${args.constraints[0]}`;
        },
      },
    });
  };
}
