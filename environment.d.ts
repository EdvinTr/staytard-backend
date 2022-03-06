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
    GOOGLE_AUTH_CLIENT_ID: string;
    GOOGLE_AUTH_CLIENT_SECRET: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    EMAIL_SERVICE: string;
    STRIPE_SECRET_KEY: string;
    DATABASE_LOGGING: string;
  }
}
