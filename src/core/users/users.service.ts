import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import MongoServiceType from 'src/commen/base/service.mongo';

@Injectable()
export class UsersService extends MongoServiceType<
  User,
  CreateUserInput,
  UpdateUserInput
>(User) {}
