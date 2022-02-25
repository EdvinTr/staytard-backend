import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateStripeOrderDto } from './dto/create-stripe-order.dto';
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

  @Post('create-order')
  async createOrder(@Body() body: CreateStripeOrderDto) {
    const order = await this.stripePaymentService.createOrGetCustomerOrder(
      body.stripeSessionId,
      body.userId,
    );
    return order;
  }

  @Get('/order/success')
  async retrieveSessionDetails(@Req() req: Request) {
    return await this.stripePaymentService.retrieveSessionDetails(
      req.query.session_id as string,
    );
  }
}
