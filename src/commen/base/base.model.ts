import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { User } from 'src/core/users/entities/user.entity';
import { Id, Ref } from 'src/types';
import * as mongoose from 'mongoose';
export interface IBaseModel {
  createAt: Date;
  createBy?: Ref<User>;
  updateAt?: Date;
  updateBy?: Ref<User>;
  _id: Id;
}

@ObjectType({ isAbstract: true })
export class BaseModel implements IBaseModel {
  @Field(() => ID, { description: '主键' })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: Id;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  createAt: Date;

  @Field(() => User, { nullable: true, description: '创建人' })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  })
  createBy?: Ref<User>;

  @Field(() => Date, { description: '更新时间', nullable: true })
  @Prop({
    required: false,
    type: Date,
  })
  updateAt?: Date;
  @Field(() => User, { nullable: true, description: '修改人' })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  })
  updateBy?: Ref<User>;
}
