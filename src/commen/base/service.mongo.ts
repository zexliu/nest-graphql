import { Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Document, Model } from 'mongoose';
import { Id } from 'src/types';
import { LOGGER } from '../logger/logger.constants';
import { PaginationArgs } from '../pagination/pagination-type';

type PaginatedResult = {
  total?: number | undefined;
  records: Array<any>;
};
export interface IMongoService<T, CREATE, UPDATE> {
  create(input: CREATE): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: Id): Promise<T>;
  updateById(id: Id, input: UPDATE): Promise<T>;
  deleteById(id: Id): Promise<T>;
  findPagination(args: PaginationArgs): Promise<PaginatedResult>;
}

export function MongoServiceType<T, CREATE, UPDATE>(TClass: ClassType<T>) {
  type D = T & Document;
  const { name } = TClass;
  abstract class MongoService implements IMongoService<T, CREATE, UPDATE> {
    constructor(
      @Inject(LOGGER) protected readonly logger: Logger,
      @InjectModel(name) protected model: Model<D>,
    ) {
      this.logger.setContext(`${name}Service`);
    }

    create(input: CREATE): Promise<D> {
      const mModel = new this.model(input);
      return mModel.save();
    }

    findAll(): Promise<D[]> {
      return this.model.find().exec();
    }
    findById(id: Id): Promise<D> {
      return this.model.findById(id).exec();
    }
    updateById(id: Id, input: UPDATE): Promise<D> {
      return this.model.findByIdAndUpdate(id, input).exec();
    }
    deleteById(id: Id): Promise<D> {
      return this.model.findByIdAndDelete(id).exec();
    }

    async findPagination(args: PaginationArgs): Promise<PaginatedResult> {
      const { isSearchCount, limit, offset } = args;
      let count: undefined | number = undefined;
      if (isSearchCount) {
        count = await this.model.count();
      }
      let models: Array<T>;
      if (!isSearchCount || count >= offset) {
        models = await this.model.find().skip(offset).limit(limit).exec();
      } else {
        models = [];
      }
      return { records: models, total: count };
    }
  }
  return MongoService;
}
