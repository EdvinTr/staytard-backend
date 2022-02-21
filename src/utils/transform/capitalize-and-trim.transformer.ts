import { Transform } from 'class-transformer';
import { capitalize } from 'lodash';

export function CapitalizeAndTrim() {
  return Transform(({ value }) => capitalize(value.trim()));
}
