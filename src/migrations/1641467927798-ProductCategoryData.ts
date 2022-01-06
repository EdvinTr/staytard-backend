import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProductCategory } from '../modules/product-category/entities/product-category.entity';
export class ProductCategoryData1641467927798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const clothes = {
      name: 'Clothes',
      slug: '/clothes',
      path: '/clothes',
      description:
        "Among the more than 250 brands we offer, you will find giants such as GANT, Morris, Calvin Klein, Peak Performance and many, many more. Our men's clothes are carefully selected to follow the latest trends and at the same time be both high quality and affordable. A good wardrobe, just like a web shop, needs to have both width and depth to be ready for everything. Nothing consciously says anything as well as a perfect shirt or pair of really nice jeans bras. Choose and wreck among pants, shorts, jackets, suits, sweaters, underwear and everything else that a modern man's wardrobe needs to be equipped with. Order your clothes for men from Stayhard - we help you take your style to a whole new level",
      children: [
        {
          name: 'Sweaters',
          slug: '/sweaters',
          path: '/clothes/sweaters',
          description:
            "Sweaters say a lot about a man's style as it is a garment that has the potential to both capture attention and give the wearer a neutral style. Some shirts are used to spread messages with prints and texts, others are solid color and without any major details. Your style and taste determine what is right for you, but a rule of thumb is that the more stylish the model is, the easier it is to match. Solid-colored sweaters in simple cuts are therefore also best suited for work and for more formal occasions, even if they also work at home. In your free time and at the gym, you just have to go all out with colors and prints - here you set the limits yourself. For spring and summer, cool, light sweaters are needed that keep you warm on cold evenings. For winter and autumn, you should invest in warm, knitted models - preferably with a slightly looser fit so that you can hold a few layers underneath.",
        },
        {
          name: 'T-shirts & polo shirts',
          description: 'any',
          path: '/clothes/t-shirts-polo-shirts',
          slug: '/t-shirts-polo-shirts',
          children: [
            {
              name: 'Solid color T-Shirts',
              description: 'ok mate',
              path: '/clothes/t-shirts-polo-shirts/solid-color-t-shirts',
              slug: '/solid-color-t-shirts',
            },
          ],
        },
      ],
    };
    await ProductCategory.create(clothes).save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM product_category`);
  }
}
