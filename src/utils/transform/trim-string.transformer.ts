import { Transform } from 'class-transformer';

export function TrimString() {
  return Transform(({ value }) => value.trim());
}
