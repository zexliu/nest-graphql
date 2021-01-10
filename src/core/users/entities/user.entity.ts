import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Id, Ref } from 'src/types';
import { Role } from 'src/core/roles/entities/role.entity';
import { PaginatedType } from 'src/commen/pagination/pagination-type';

@Schema()
@ObjectType()
export class User {
  @Field(() => ID, { description: '唯一标识' })
  readonly _id: Id;

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
export class UserPaginated extends PaginatedType(User) { }

export const UserSchema = SchemaFactory.createForClass(User);
