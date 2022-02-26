import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as path from 'path';
import { CustomerOrderItem } from '../customer-order/entities/customer-order-item.entity';
import { CustomerOrder } from '../customer-order/entities/customer-order.entity';
import { Product } from '../product/entities/product.entity';
import { UserService } from '../user/user.service';
import { SendEmailDto } from './dto/send-email.dto';
@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.nodemailerTransport = createTransport({
      name: 'smtp.gmail.com',
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(input: SendEmailDto, options?: Mail.Options) {
    try {
      await this.nodemailerTransport.sendMail({
        to: input.to,
        text: input.text,
        subject: input.subject,
        ...options,
      });
      return true;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException("Couldn't send email");
    }
  }

  async sendTestMail(userId: string) {
    const source = fs.readFileSync(
      path.join(
        process.cwd(),
        'src',
        'templates',
        'customer-order-receipt-template.hbs',
      ),
      'utf8',
    );
    // Create email generator
    const template = Handlebars.compile(source);
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found'); // User should always be defined though if called from order service.
    }
    await this.nodemailerTransport.sendMail({
      to: user.email,
      subject: 'Thanks for your order!',
      text: '',
      html: template({
        userFirstName: user.firstName,
      }),
    });
  }

  async sendProductOrderConfirmationEmail(
    userId: string,
    orderItems: CustomerOrderItem[],
    customerOrder: CustomerOrder,
    products: Product[],
  ) {
    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found'); // User should always be defined though if called from order service.
      }

      await this.sendMail(
        {
          to: user.email,
          subject: 'Thanks for your order!',
          text: '',
        },
        {
          html: `
        <div style={text-align: center;}>
          ${orderItems.map((item) => {
            return `<div>
                <h2>${item.quantity} x ${
              products.find((product) => product.id === item.productId)?.name
            }</h2>
              </div>`;
          })}
            <h3>Total: ${
              customerOrder.shippingCost + customerOrder.totalAmount
            } EUR</h3>
        </div>
      `,
        },
      );
    } catch (err) {
      throw err;
    }
  }
}
