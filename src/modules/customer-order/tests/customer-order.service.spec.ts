import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmailService } from '../../email/email.service';
import { ProductImage } from '../../product/entities/product-image.entity';
import { Product } from '../../product/entities/product.entity';
import { ProductAttributeService } from '../../product/product-attribute.service';
import { ProductService } from '../../product/product.service';
import { UserService } from '../../user/user.service';
import { CustomerOrderService } from '../customer-order.service';
import { CustomerOrderStatus } from '../entities/customer-order-status.entity';
import { CustomerOrder } from '../entities/customer-order.entity';
import { ORDER_STATUS } from '../typings/order-status.enum';
import { mockCustomerOrder } from './mock-customer-order.mock';
describe('CustomerOrderService', () => {
  let customerOrderService: CustomerOrderService;
  let productService: ProductService;
  const mockCustomerOrderRepository = {
    create: jest.fn().mockImplementation((args) => ({ ...args })),
    save: jest.fn().mockResolvedValue({
      id: Math.floor(Math.random() * 100),
      ...mockCustomerOrder,
    }),
  };
  const mockProductAttributeService = {
    find: jest.fn(),
    update: jest.fn().mockImplementation(() => {}),
  };
  const mockOrderStatusRepository = {
    findOne: jest.fn().mockResolvedValue({ status: ORDER_STATUS.PENDING }),
  };
  const mockEmailService = {
    sendProductOrderConfirmationEmail: jest.fn(),
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
          provide: getRepositoryToken(ProductImage),
          useValue: {},
        },
        { provide: EmailService, useValue: mockEmailService },
        { provide: UserService, useValue: {} },
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

  // TODO: fix testing for errors.
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
        productService.findBySkus = jest.fn().mockResolvedValue([]); // add this to avoid crashing the test (find by skus is only related to emails)
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
