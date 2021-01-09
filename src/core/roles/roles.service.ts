import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'src/commen/logger/logger.classes';
import { LOGGER } from 'src/commen/logger/logger.constants';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './entities/role.entity';
import { Model } from 'mongoose';
import { Id } from 'src/types';

@Injectable()
export class RolesService {
  constructor(
    @Inject(LOGGER) private readonly logger: Logger,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {
    this.logger.setContext('RoleService');
  }
  create(createRoleInput: CreateRoleInput): Promise<Role> {
    const roleModel = new this.roleModel(createRoleInput);
    return roleModel.save();
  }

  findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  findRolesByIds(ids: Id[]): Promise<Role[]> {
    if (ids) {
      return this.roleModel.find({ _id: { $in: ids } }).exec();
    }
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  findOne(id: Id): Promise<Role> {
    return this.roleModel.findById(id).exec();
  }

  update(id: Id, updateRoleInput: UpdateRoleInput): Promise<Role> {
    return this.roleModel.findOneAndUpdate({ _id: id }, updateRoleInput).exec();
  }

  remove(id: Id): Promise<Role> {
    return this.roleModel.findOneAndDelete({ _id: id }).exec();
  }
}
