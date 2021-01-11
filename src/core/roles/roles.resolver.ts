import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RoleService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Id } from 'src/types';
import { UserService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.save(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.roleService.findList();
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => ID }) id: Id) {
    return this.roleService.findById(id);
  }

  @Mutation(() => Role)
  updateRole(
    @Args('id', { type: () => ID }) id: Id,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    return this.roleService.updateById(id, updateRoleInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => ID }) id: Id) {
    return this.roleService.deleteById(id);
  }

  @ResolveField(() => [User])
  users(@Parent() role: Role) {
    return this.userService.findByRoleId(role._id);
  }
}
