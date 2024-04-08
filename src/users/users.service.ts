import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schema/user.schema';

import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async getUserByUsername(username: string) {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  async registerUser(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);

    const user = await this.getUserByUsername(createUser.username); // check if user exists
    if (user) {
      throw new BadRequestException();
    }

    // Hash Password
    createUser.password = await this.hashService.hashPassword(
      createUser.password,
    );

    return createUser.save();
  }
}
