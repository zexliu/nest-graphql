import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/commen/base/base.service';

import { Id } from 'src/types';
import { Role, RoleDocument } from './entities/role.entity';

@Injectable()
export class RoleService extends BaseService<RoleDocument> {
  constructor(@InjectModel(Role.name) model: Model<RoleDocument>) {
    super(model);
  }
  findRolesByIds(ids: [Id]) {
    return this.model.find({ _id: { $in: ids } }).exec();
  }
}
