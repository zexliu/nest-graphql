import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Id } from 'src/types';
import {
  PaginationArgs,
  IPaginatedResponse,
} from '../pagination/pagination-type';

export abstract class BaseService<T extends Document> {
  model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  //新增 保存
  save(input: any) {
    return this.model.create(input);
  }
  //批量新增保存
  saveBatch(inputs: [any]) {
    return this.model.insertMany(inputs);
  }
  //通过ID删除
  deleteById(id: Id) {
    return this.model.deleteOne({ _id: id }).exec();
  }
  //删除一条
  deleteOne(filter: FilterQuery<T>) {
    return this.model.deleteOne(filter).exec();
  }

  //删除一条
  findOneAndDelete(filter: FilterQuery<T>) {
    return this.model.findOneAndDelete(filter).exec();
  }
  //通过ID查找并删除
  findByIdAndDelete(id: Id) {
    return this.model.findByIdAndDelete(id).exec();
  }
  //通过Id批量删除
  deleteByIds(ids: [Id]) {
    return this.model.deleteMany({ _id: { $in: ids } }).exec();
  }
  //匹配删除
  delete(filter: FilterQuery<T>) {
    return this.model.deleteMany(filter).exec();
  }
  //  通过ID更新
  updateById(id: Id, update: UpdateQuery<T>) {
    const filter = ({ _id: id } as unknown) as FilterQuery<T>;
    return this.model.updateOne(filter, update).exec();
  }
  //更新一条
  updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>) {
    return this.model.updateOne(filter, update).exec();
  }
  //通过ID查找并更新
  findByIdAndUpdate(id: Id, update: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate({ _id: id }, update).exec();
  }
  //查找一条并更新
  findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>) {
    return this.model.findOneAndUpdate(filter, update).exec();
  }
  //查找一条并更新
  updateByIds(ids: [Id], update: UpdateQuery<T>) {
    const filter = ({ id: { $in: ids } } as unknown) as FilterQuery<T>;

    return this.model.updateMany(filter, update).exec();
  }
  //通过ids批量查找
  findListByIds(ids: [Id]) {
    const filter = ({ _id: { $in: ids } } as unknown) as FilterQuery<T>;
    return this.model.find(filter).exec();
  }
  findList(filter?: FilterQuery<T>) {
    return this.model.find(filter).exec();
  }
  findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter).exec();
  }
  findById(id: Id) {
    return this.model.findById(id).exec();
  }

  async findPage(
    args: PaginationArgs,
    filter?: FilterQuery<T>,
  ): Promise<IPaginatedResponse> {
    const { isSearchCount, limit, offset } = args;
    let count: undefined | number = undefined;
    if (isSearchCount) {
      count = await this.model.countDocuments(filter);
    }
    let models: Array<any>;
    if (!isSearchCount || count >= offset) {
      models = await this.model
        .find(filter)
        .skip(offset)
        .limit(limit)
        .sort(args.sort)
        .exec();
    } else {
      models = [];
    }
    return { records: models, total: count };
  }
}
