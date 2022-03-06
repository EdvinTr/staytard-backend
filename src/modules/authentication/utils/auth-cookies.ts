import { Response } from 'express';

const sameSite = process.env.NODE_ENV === 'production' ? 'none' : 'lax';
const secure = process.env.NODE_ENV === 'production' ? true : false;
export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    maxAge: +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    sameSite,
    secure,
  });
  res.cookie(process.env.JWT_REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    maxAge: +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    sameSite,
    secure,
  });
};

export const removeAuthCookies = (res: Response) => {
  res.clearCookie(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME, {
    sameSite,
    secure,
  });
  res.clearCookie(process.env.JWT_REFRESH_TOKEN_COOKIE_NAME, {
    sameSite,
    secure,
  });
};
