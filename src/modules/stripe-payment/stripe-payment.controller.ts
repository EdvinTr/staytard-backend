import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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

  @Get('/order/success')
  async retrieveSessionDetails(@Req() req: Request) {
    return await this.stripePaymentService.retrieveSessionDetails(
      req.query.session_id as string,
    );
  }
}
