import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InitKlarnaSessionInput } from './dto/init-klarna-session.input';
import { KlarnaPaymentService } from './klarna-payment.service';
import { KlarnaSessionResponse } from './typings/klarna-session-response';

@Resolver()
export class KlarnaPaymentResolver {
  constructor(private readonly klarnaPaymentService: KlarnaPaymentService) {}

  @Mutation(() => KlarnaSessionResponse)
  initializeKlarnaSession(@Args('input') input: InitKlarnaSessionInput) {
    return this.klarnaPaymentService.initializeKlarnaSession(input);
  }
}
