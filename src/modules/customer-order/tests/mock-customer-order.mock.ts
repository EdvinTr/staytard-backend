import { CreateCustomerOrderInput } from '../dto/input/create-customer-order.input';

export const mockCustomerOrder: CreateCustomerOrderInput = {
  city: 'Stockholm',
  deliveryAddress: 'Kungsgatan 42',
  orderNumber: 'jdshaiej23231',
  orderItems: [
    { productId: 823, sku: 'PAPN-WHI-L4', quantity: 3 },
    { productId: 487, sku: 'JSHJ-WHI-S5', quantity: 22 },
  ],
  paymentType: 'card',
  postalCode: '11122',
  totalAmount: 2000,
  purchaseCurrency: 'SEK',
};
