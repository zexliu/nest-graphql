import {
  Resolver,
  Mutation,
  Args,
  Query,
  ID,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserService } from './users.service';
import { User, UserPaginated } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Id } from 'src/types';

import { Inject } from '@nestjs/common';
import { PaginationArgs } from 'src/commen/pagination/pagination-type';
import { RoleService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(UserService.name) private readonly userService: UserService,
    @Inject(RoleService.name) private readonly roleService: RoleService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.save(createUserInput);
  }
  @Query(() => UserPaginated)
  userPagination(@Args() args: PaginationArgs) {
    return this.userService.findPage(args);
  }
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findList();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: Id) {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: Id,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateById(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: Id) {
    return this.userService.deleteById(id);
  }

  @ResolveField(() => [Role])
  roles(@Parent() user: User) {
    console.log(user);
    return this.roleService.findRolesByIds(user.roles as [Id]);
  }
}
