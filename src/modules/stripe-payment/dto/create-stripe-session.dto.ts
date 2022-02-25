import Stripe from 'stripe';

export class CreateStripeSessionDto {
  orderLines: StripeOrderLine[];
}

export class StripeOrderLine {
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: string[];
      metadata: StripeOrderLineMetadata;
    };
  };
}

interface StripeOrderLineMetadata extends Stripe.MetadataParam {
  sku: string;
  productId: number;
}
