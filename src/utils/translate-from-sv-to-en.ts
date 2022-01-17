import * as translate from '@vitalets/google-translate-api';
export const translateFromSvToEn = async (str: string) => {
  const res = await translate(str, { to: 'en', from: 'sv' });
  return res.text.replace('.', '');
};
