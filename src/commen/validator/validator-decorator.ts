/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function CanNotWithEvery(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'canNotWithEvery',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(value, args);

          const object = args.object as any;
          const result = args.constraints.every((propertyName) => {
            return object[propertyName] === undefined;
          });
          return result;
        },
      },
    });
  };
}

export function CanNotWithOutEvery(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'canNotWithOutEvery',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          const result = args.constraints.every((propertyName) => {
            return object[propertyName] !== undefined;
          });
          return result;
        },
      },
    });
  };
}
