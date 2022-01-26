import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InitKlarnaSessionInput } from './dto/init-klarna-session.input';
import { KlarnaSessionResponse } from './typings/klarna-session-response';

@Injectable()
export class KlarnaPaymentService {
  constructor(private readonly httpService: HttpService) {}

  public async placeOrderWithKlarna(authorizationToken: string) {
    try {
      // cart, billing and shipping information must be the same as in the authorization call made in the frontend
      const response = this.httpService.post(
        `https://api.playground.klarna.com/payments/v1/authorizations/${authorizationToken}/order`,
      );
    } catch (err) {}
  }
  public async initializeKlarnaSession(input: InitKlarnaSessionInput) {
    // TODO:
    // 1. refactor to Klarna module
    // 2. Should receive this body as argument
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

      console.log(payment_method_categories);

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
