import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import { BaseService } from 'src/commen/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Id } from 'src/types';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }
  findByRoleId(id: Id) {
    return this.model.find({ roles: { $in: [id] } });
  }
}
