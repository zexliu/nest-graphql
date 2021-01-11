import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Ref } from 'src/types';
import { Role } from 'src/core/roles/entities/role.entity';
import { PaginatedType } from 'src/commen/pagination/pagination-type';
import { BaseModel } from 'src/commen/base/base.model';

export type UserDocument = User & mongoose.Document;
@Schema()
@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { description: '用户名' })
  @Prop({ required: true, unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Prop()
  nickname?: string;

  @Prop({ required: true })
  @HideField()
  password: string;

  @Field(() => [Role], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Role' })
  roles?: Ref<Role>[];
}

@ObjectType()
export class UserPaginated extends PaginatedType(User) {}

export const UserSchema = SchemaFactory.createForClass(User);
