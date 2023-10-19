import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<User> {
    return (await this.userModel.create(user)).toObject();
  }

  async update(accountId: string, userDto: CreateUserDto) {
    // const existingUser = await this.findOne(accountId);
    // if (!existingUser) return;
    // const updatedUser = this.mapDtoToEntity(userDto);
    return await this.userModel.findOneAndUpdate(
      { _id: accountId },
      {
        $set: {
          firstName: userDto.firstName,
          lastName: userDto.lastName,
          description: userDto.description,
          imageUrl: userDto.imageUrl,
          linktree: userDto.linktree,
        },
      },
    );
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
