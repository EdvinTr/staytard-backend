import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InitKlarnaSessionInput } from './dto/init-klarna-session.input';
import { AuthorizeKlarnaResponse } from './typings/authorize-klarna-response';
import { KlarnaSessionResponse } from './typings/klarna-session-response';

@Injectable()
export class KlarnaPaymentService {
  constructor(private readonly httpService: HttpService) {}

  public async authorize(
    input: InitKlarnaSessionInput,
    authorizationToken: string,
  ) {
    try {
      const response = await this.httpService
        .post<AuthorizeKlarnaResponse>(
          `https://api.playground.klarna.com/payments/v1/authorizations/${authorizationToken}/order`,
          {
            ...input,
            merchant_urls: {
              confirmation: `${process.env.FRONTEND_URL}/confirmation/${authorizationToken}`,
            },
          },
          {
            auth: {
              username: process.env.KLARNA_API_USERNAME,
              password: process.env.KLARNA_API_PASSWORD,
            },
          },
        )
        .toPromise();

      if (!response || !response.data) {
        throw new Error();
      }
      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response?.status === 400) {
        throw new BadRequestException(err.response.data.message);
      }
      throw new InternalServerErrorException(
        'Could not authorize Klarna payment',
      );
    }
  }
  public async initializeKlarnaSession(input: InitKlarnaSessionInput) {
    try {
      const sessionEndpoint =
        'https://api.playground.klarna.com/payments/v1/sessions';
      const response = await this.httpService
        .post<KlarnaSessionResponse>(
          sessionEndpoint,
          { ...input },
          {
            auth: {
              username: process.env.KLARNA_API_USERNAME,
              password: process.env.KLARNA_API_PASSWORD,
            },
          },
        )
        .toPromise();
      if (!response || !response.data) {
        throw new Error();
      }
      const { client_token, payment_method_categories, session_id } =
        response.data;

      return {
        client_token,
        payment_method_categories,
        session_id,
      };
    } catch (err: any) {
      console.log(err);
      if (err?.response?.status === 400) {
        throw new BadRequestException(err.response.data.message);
      }
      throw new InternalServerErrorException(
        'Could not establish a credit session with Klarna',
      );
    }
  }
}
