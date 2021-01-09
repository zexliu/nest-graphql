import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Id } from 'src/types';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => ID }) id: Id) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(
    @Args('id', { type: () => ID }) id: Id,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    return this.rolesService.update(id, updateRoleInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => ID }) id: Id) {
    return this.rolesService.remove(id);
  }

  @ResolveField(() => [User])
  users(@Parent() role: Role) {
    return this.userService.findByRoleId(role._id);
  }
}
