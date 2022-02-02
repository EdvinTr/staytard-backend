import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../product/entities/product.entity';
import { ProductAttributeService } from '../../product/product-attribute.service';
import { ProductService } from '../../product/product.service';
import { CustomerOrderService } from '../customer-order.service';
import { CustomerOrderStatus } from '../entities/customer-order-status.entity';
import { CustomerOrder } from '../entities/customer-order.entity';
import { ORDER_STATUS } from '../typings/order-status.enum';
import { mockCustomerOrder } from './mock-customer-order.mock';
describe('CustomerOrderService', () => {
  let customerOrderService: CustomerOrderService;
  let productService: ProductService;
  let mockCustomerOrderRepository = {
    create: jest.fn().mockImplementation((args) => ({ ...args })),
    save: jest.fn().mockResolvedValue({
      id: Math.floor(Math.random() * 100),
      ...mockCustomerOrder,
    }),
  };
  let mockProductAttributeService = {
    find: jest.fn(),
  };
  let mockOrderStatusRepository = {
    findOne: jest.fn().mockResolvedValue({ status: ORDER_STATUS.PENDING }),
  };
  beforeEach(async () => {
    jest.restoreAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerOrderService,
        ProductService,
        ProductAttributeService,
        {
          provide: getRepositoryToken(CustomerOrder),
          useValue: mockCustomerOrderRepository,
        },
        {
          provide: getRepositoryToken(CustomerOrderStatus),
          useValue: mockOrderStatusRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
        {
          provide: ProductAttributeService,
          useValue: mockProductAttributeService,
        },
      ],
    }).compile();
    customerOrderService =
      module.get<CustomerOrderService>(CustomerOrderService);
    productService = module.get<ProductService>(ProductService);
  });

  // TODO: Testing:
  // 3. Test that it is possible to create an order when products are in stock.
  // 4. Test that when payment type is "SEK" that the total price of the order is multiplied by 10..
  // 5. Test that the order status of a newly created order is "PENDING".
  // 7. Test that when an order is created, an email is sent through the email service.
  describe('when creating a customer order', () => {
    describe('and not all SKUs can be found', () => {
      beforeEach(() => {
        mockProductAttributeService.find = jest.fn().mockResolvedValue([]);
      });
      it('should throw an error', async () => {
        await expect(
          customerOrderService.create(
            {
              ...mockCustomerOrder,
            },
            'userUUID',
          ),
        ).rejects.toThrowError();
      });
    });
    describe('and products are not in stock', () => {
      beforeEach(() => {
        mockProductAttributeService.find = jest.fn().mockResolvedValue([
          { productId: 823, sku: 'PAPN-WHI-L4', quantity: 0 },
          { productId: 487, sku: 'JSHJ-WHI-S5', quantity: 1 },
        ]);
      });
      it('should throw an error', async () => {
        await expect(
          customerOrderService.create(
            {
              ...mockCustomerOrder,
            },
            'userUUID',
          ),
        ).rejects.toThrowError();
      });
    });
    describe('and products are available in stock', () => {
      beforeEach(() => {
        mockProductAttributeService.find = jest.fn().mockResolvedValue([
          { productId: 823, sku: 'PAPN-WHI-L4', quantity: 100 },
          { productId: 487, sku: 'JSHJ-WHI-S5', quantity: 100 },
        ]);
      });
      it('create an order and return it', async () => {
        const customerOrder = await customerOrderService.create(
          {
            ...mockCustomerOrder,
          },
          'userUUID',
        );
        expect(customerOrder).toEqual({
          id: expect.any(Number),
          ...mockCustomerOrder,
        });
      });
    });
  });
});
