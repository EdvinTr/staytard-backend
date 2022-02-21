import { Transform } from 'class-transformer';
import { capitalize } from 'lodash';

export function CapitalizeAndTrimTransform() {
  return Transform(({ value }) => capitalize(value.trim()));
}
