import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import { capitalize } from 'lodash';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as path from 'path';
import { CustomerOrderItem } from '../customer-order/entities/customer-order-item.entity';
import { CustomerOrder } from '../customer-order/entities/customer-order.entity';
import { Product } from '../product/entities/product.entity';
import { UserService } from '../user/user.service';
import { SendEmailDto } from './dto/send-email.dto';

interface ReceiptOrderLine {
  name: string;
  currentPrice: number;
  originalPrice: number;
  quantity: number;
  color: string;
  size: string;
  imageUrl: string;
  brandName: string;
  productId: number;
  hasDiscount: boolean;
}
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
      secure: true,
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
  async sendProductOrderConfirmationEmail(
    userId: string,
    orderItems: CustomerOrderItem[],
    customerOrder: CustomerOrder,
    products: Product[],
  ) {
    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
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

      // Order line content
      const receiptOrderLines: ReceiptOrderLine[] = products.map((product) => {
        return {
          quantity:
            orderItems.find((item) => item.productId === product.id)
              ?.quantity || 0,
          name: product.name,
          currentPrice: product.currentPrice,
          originalPrice: product.originalPrice,
          color: product.attributes[0].color.value,
          size: product.attributes[0].size.value,
          brandName: product.brand.name,
          imageUrl: product.images[0].imageUrl.replace('{size}', '186'),
          productId: product.id,
          hasDiscount: product.currentPrice !== product.originalPrice,
          // TODO: last item should not apply border bottom on order line
        };
      });
      await this.nodemailerTransport.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Thanks for your order!',

        html: template({
          user,
          frontEndUrl: process.env.FRONTEND_URL,
          orderLines: receiptOrderLines,
          order: customerOrder,
          paymentMethod: capitalize(customerOrder.paymentType),
          grandTotal: customerOrder.totalAmount + customerOrder.shippingCost,
          purchaseCurrency: customerOrder.purchaseCurrency.toUpperCase(),
          orderCreationDate: new Date(customerOrder.createdAt).toLocaleString(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }
}
