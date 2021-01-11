import { InputType, Field, ID } from '@nestjs/graphql';
import { Id } from 'src/types';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: '用户名' })
  username: string;

  @Field(() => String, { nullable: true, description: '昵称' })
  nickname?: string;

  @Field(() => String, { nullable: true, description: '密码' })
  password: string;

  @Field(() => [String], { nullable: true, description: '角色ID列表' })
  roles?: Id[];
  @Field(() => ID, { nullable: true })
  createBy?: Id;
}
