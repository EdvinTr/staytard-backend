export const isAlphanumericWithSpaces = (
  minLength: number,
  maxLength: number,
) => {
  const rgx = `/^[a-zA-ZåäöæøÅÄÖÆØ0-9\s]{${minLength},${maxLength}}$`;
  return new RegExp(rgx);
};
