import { InputType, Field } from '@nestjs/graphql';
import { Id } from 'src/types';
@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true, description: '昵称' })
  nickname?: string;

  @Field(() => [String], { nullable: true, description: '角色ID列表' })
  roles?: Id[];
}
