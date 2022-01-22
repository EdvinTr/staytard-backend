import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { ProductReview } from './entities/product-review.entity';
import {NOTFOUND} from "dns";


@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: Repository<ProductReview>,
  ) {}
  create(input: CreateProductReviewInput) {
    const review = this.productReviewRepository.create(input);
    // TODO:
    // 1. Should create product review
    // 2. Should save it to the database
    // 3. Should return the saved product review
    return this.productReviewRepository.save(review);
  }

  async publish(id:number){
    try {
      const property = await this.productReviewRepository.findOne({
        where: { id }
      });
      if(!property){
        return new NotFoundException(`Review with id ${id} was not found`);
      }
      return this.productReviewRepository.save({

        ...property, // existing fields
        isPublished:true,published:new Date()
      });
    }catch (error){
      console.log(error)
    }



  }
}
