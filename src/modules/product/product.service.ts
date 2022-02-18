import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, FindOneOptions, Like, Repository } from 'typeorm';
import { getOffset, paginate } from '../../utils/paginate.util';
import { CreateProductInput } from './dto/create-product.input';
import { FindProductsBySkusInput } from './dto/find-products-by-skus.input';
import { FindProductsDto } from './dto/find-products.dto';
import { FindProductsInput } from './dto/find-products.input';
import { QueryProductsOutput } from './dto/query-products.output';
import { SearchProductsInput } from './dto/search-products.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductImage } from './entities/product-image.entity';
import { Product } from './entities/product.entity';
import { ProductAttributeService } from './product-attribute.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly imageRepository: Repository<ProductImage>,
    private readonly attributeService: ProductAttributeService,
  ) {}

  public async findOne(id: number, options?: FindOneOptions<Product>) {
    const prod = await this.productRepository.findOne(id, options);
    return prod;
  }

  public async findByIds(ids: number[]) {
    return this.productRepository.findByIds(ids);
  }

  public async delete(id: number) {
    try {
      await this.attributeService.deleteByProductId(id); // delete attributes
      await this.productRepository.delete(id); // delete product
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async findBySkus({
    limit,
    offset,
    skus,
  }: FindProductsBySkusInput): Promise<QueryProductsOutput> {
    try {
      const attributeQueryBuilder = createQueryBuilder(
        'product_attribute',
        'attribute',
      );
      const attributes = (await attributeQueryBuilder
        .innerJoinAndSelect('attribute.product', 'product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.images', 'images')
        .innerJoinAndSelect('attribute.color', 'color')
        .innerJoinAndSelect('attribute.size', 'size')
        .where('attribute.sku IN (:...skus)', { skus })
        .take(limit)
        .skip(offset)
        .getMany()) as ProductAttribute[]; // Joining from product_attribute to enable TypeORM to fetch multiple of the same product where only attributes differ
      const products = attributes.map(({ product, ...attribute }) => {
        return {
          ...product,
          attributes: [attribute],
        };
      }) as Product[];
      return {
        items: products,
        totalCount: products.length,
        hasMore: products.length - offset > limit,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Something went wrong when loading products',
      );
    }
  }

  public async searchByNameOrCategory({
    resultLimit,
    searchTerm,
  }: SearchProductsInput): Promise<Product[]> {
    const formattedSearchTerm = `%${searchTerm.toLowerCase()}%`;
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    const result = await queryBuilder
      .where('LOWER(product.name) LIKE :searchTerm', {
        searchTerm: formattedSearchTerm,
      })
      .take(resultLimit)
      .getMany();
    return result;
  }

  public async restFindAll({
    page,
    limit,
    categoryPath,
    sortBy,
    sortDirection,
    q,
  }: FindProductsDto) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    try {
      const offset = getOffset(page, limit); // get offset for pagination
      let query = queryBuilder
        .innerJoin('product.category', 'category')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.images', 'images')
        .innerJoinAndSelect('product.attributes', 'attributes')
        .innerJoinAndSelect('attributes.color', 'color')
        .innerJoinAndSelect('attributes.size', 'size')
        .take(limit)
        .skip(offset)
        .where('category.path LIKE :path', { path: `%${categoryPath}%` });
      if (q) {
        query = query.andWhere(`LOWER(product.name) LIKE :q`, {
          q: `%${q.toLowerCase()}%`,
        });
      }
      const [products, totalCount] = await query
        .select([
          'product.id',
          'product.name',
          'product.isDiscontinued',
          'product.currentPrice',
          'product.originalPrice',
          'images',
          'brand',
          'attributes',
          'color',
          'size',
        ])
        .orderBy(`${sortBy ? `product.${sortBy}` : ''}`, sortDirection)
        .cache(60000)
        .getManyAndCount();
      const pagination = paginate(page, totalCount, limit); // create pagination
      return {
        pagination,
        products,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Something went wrong when loading products',
      );
    }
  }

  public async update({
    attributes,
    currentPrice,
    description,
    imageUrls,
    isDiscontinued,
    name,
    productId,
  }: UpdateProductInput) {
    try {
      const product = await this.productRepository.findOne(productId);
      if (!product) {
        throw new NotFoundException(
          'Product could not be updated because it could not be found',
        );
      }
      await this.imageRepository.delete({ product: { id: productId } }); // delete all old images
      await this.attributeService.deleteByProductId(productId); // delete all old attributes

      // create new attributes
      const newAttributes = await this.attributeService.create(
        [...attributes],
        product,
      );
      // resave product
      await this.productRepository.save({
        ...product,
        name,
        description,
        isDiscontinued,
        currentPrice,
        attributes: newAttributes,
        images: [...imageUrls.map((url) => ({ imageUrl: url, product }))],
      });

      return this.findOne(productId, { relations: ['brand'] });
    } catch (err) {
      throw err;
    }
  }

  public async gqlFindAll({
    limit,
    offset,
    categoryPath,
    sortBy,
    sortDirection,
  }: FindProductsInput): Promise<QueryProductsOutput> {
    const orderBy: Record<string, string> = {};
    if (sortBy && sortDirection) {
      orderBy[sortBy] = sortDirection;
    }
    const [products, totalCount] = await this.productRepository.findAndCount({
      take: limit,
      skip: offset,
      where: {
        category: {
          path: Like(`%${categoryPath}%`),
        },
      },
      relations: ['category', 'brand'],
      cache: {
        id: `${categoryPath}-${limit}-${offset}`,
        milliseconds: 60000, // 60 seconds
      },
      order: {
        ...orderBy,
      },
    });
    return {
      items: products,
      totalCount,
      hasMore: totalCount - offset > limit,
    };
  }
  public async create(input: CreateProductInput) {
    try {
      const { attributes, price, ...rest } = input;
      const product = this.productRepository.create({
        ...rest,
        originalPrice: price,
        currentPrice: price,
        images: [
          ...input.imageUrls.map((url) => {
            return {
              imageUrl: url,
            };
          }),
        ],
        category: {
          id: input.categoryId,
        },
        brand: {
          id: input.brandId,
        },
      });
      const attributeObjects = await this.attributeService.create(
        attributes,
        product,
      );
      product.attributes = attributeObjects;
      return this.productRepository.save(product);
    } catch (err) {
      console.log(err);
    }
  }
}
