import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => String, { description: '角色名称' })
  roleName: string;

  @Field(() => String, { description: '角色编码' })
  roleCode: string;
}
