import { Response } from 'express';

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });
  res.cookie(process.env.JWT_REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });
};

export const removeAuthCookies = (res: Response) => {
  res.clearCookie(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME);
  res.clearCookie(process.env.JWT_REFRESH_TOKEN_COOKIE_NAME);
};
