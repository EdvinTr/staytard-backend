import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InitKlarnaSessionInput } from './dto/init-klarna-session.input';
import { KlarnaPaymentService } from './klarna-payment.service';
import { AuthorizeKlarnaResponse } from './typings/authorize-klarna-response';
import { KlarnaSessionResponse } from './typings/klarna-session-response';

@Resolver()
export class KlarnaPaymentResolver {
  constructor(private readonly klarnaPaymentService: KlarnaPaymentService) {}

  @Mutation(() => KlarnaSessionResponse)
  initializeKlarnaSession(@Args('input') input: InitKlarnaSessionInput) {
    return this.klarnaPaymentService.initializeKlarnaSession(input);
  }

  @Mutation(() => AuthorizeKlarnaResponse)
  createOrderWithKlarna(
    @Args('input') input: InitKlarnaSessionInput,
    @Args('authorizationToken') authorizationToken: string,
  ) {
    return this.klarnaPaymentService.createCustomerOrder(
      input,
      authorizationToken,
    );
  }
}
