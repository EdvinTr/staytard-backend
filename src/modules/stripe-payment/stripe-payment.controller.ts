import { Body, Controller, Post } from '@nestjs/common';
import { CreateStripeSessionDto } from './dto/create-stripe-session.dto';
import { StripePaymentService } from './stripe-payment.service';

@Controller('stripe')
export class StripePaymentController {
  constructor(private readonly stripePaymentService: StripePaymentService) {}

  @Post('create-session')
  async createSession(@Body() body: CreateStripeSessionDto) {
    const session = await this.stripePaymentService.createSession(body);
    return session;
  }
}
