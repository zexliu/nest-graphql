import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/core/users/entities/user.entity';
import { Id, Ref } from 'src/types';
export type RoleDocument = Role & Document;

@Schema()
@ObjectType()
export class Role {
  @Field(() => ID, { description: '唯一标识' })
  readonly _id: Id;

  @Field(() => String, { description: '角色名称' })
  @Prop()
  roleName: string;

  @Field(() => String, { description: '角色编码' })
  @Prop()
  roleCode: string;

  @Field(() => [User], { description: '用户列表' })
  users?: Ref<User>[];
}
export const RoleSchema = SchemaFactory.createForClass(Role);
