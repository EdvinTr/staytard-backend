namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    FRONTEND_URL: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;
    JWT_ACCESS_TOKEN_COOKIE_NAME: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
    JWT_REFRESH_TOKEN_COOKIE_NAME: string;
  }
}
