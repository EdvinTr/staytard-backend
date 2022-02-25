/* @InputType()
export class OrderItemInput {
  @Field()
  @IsNumber()
  @IsPositive()
  public readonly productId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  public readonly quantity: number;
}
@InputType()
export class CreateCustomerOrderInput {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(36)
  @Transform(({ value }) => capitalize(value))
  @Field()
  public readonly deliveryAddress: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => capitalize(value))
  @Field()
  public readonly city: string;

  @IsPostalCode('any')
  @Field()
  public readonly postalCode: string;

  @ValidateNested()
  @ArrayDistinct('productId')
  @Type(() => OrderItemInput)
  @Field(() => [OrderItemInput])
  public readonly orderItems: OrderItemInput[];
} */

export class OrderItemInput {
  productId: number;
  quantity: number;
  sku: string;
}
export class CreateCustomerOrderInput {
  deliveryAddress: string;
  city: string;
  postalCode: string;
  orderItems: OrderItemInput[];
  totalAmount: number;
  paymentType: string;
  orderNumber: string;
  purchaseCurrency: string;
  stripeSessionId?: string;
}
