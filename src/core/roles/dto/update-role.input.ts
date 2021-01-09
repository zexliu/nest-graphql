import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput {
  @Field(() => String, { description: '角色名称' })
  roleName: string;
}
