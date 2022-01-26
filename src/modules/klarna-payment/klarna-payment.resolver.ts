import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { CustomerOrder } from '../customer-order/entities/customer-order.entity';
import { InitKlarnaSessionInput } from './dto/init-klarna-session.input';
import { KlarnaPaymentService } from './klarna-payment.service';
import { KlarnaSessionResponse } from './typings/klarna-session-response';

@Resolver()
export class KlarnaPaymentResolver {
  constructor(private readonly klarnaPaymentService: KlarnaPaymentService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => KlarnaSessionResponse)
  initializeKlarnaSession(@Args('input') input: InitKlarnaSessionInput) {
    return this.klarnaPaymentService.initializeKlarnaSession(input);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => CustomerOrder)
  createOrderWithKlarna(
    @Args('input') input: InitKlarnaSessionInput,
    @Args('authorizationToken') authorizationToken: string,
    @Context() { req }: { req: RequestWithUser },
  ) {
    return this.klarnaPaymentService.createCustomerOrder(
      input,
      authorizationToken,
      req.user.id,
    );
  }
}
