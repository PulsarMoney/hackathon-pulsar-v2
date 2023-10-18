import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { NoSQLDatabaseModule } from 'src/common/database/nosql.module';

@Module({
  imports: [NoSQLDatabaseModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
