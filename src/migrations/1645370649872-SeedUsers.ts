import * as bcrypt from 'bcrypt';
import * as casual from 'casual';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../modules/user/entities/user.entity';

export class SeedUsers1645370649872 implements MigrationInterface {
  public async up(): Promise<void> {
    const userRepo = getRepository(User);
    for (let i = 0; i < 5000; i++) {
      const mobilePhoneNumber = `070${[...Array(7)]
        .map(() => casual.integer(1, 9))
        .join('')}`;
      const user = userRepo.create({
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email,
        address: {
          street: casual.street,
          city: casual.city,
          postalCode: casual.zip(5),
        },
        isEmailConfirmed: false,
        isRegisteredWithGoogle: false,
        password: await bcrypt.hash('123123123a', 10),
        mobilePhoneNumber: mobilePhoneNumber,
        permissions: [],
      });
      userRepo.save(user);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE public.user CASCADE;`);
    await queryRunner.query(`DELETE FROM user_address;`);
  }
}
