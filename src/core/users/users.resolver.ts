import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  ID,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserPaginated } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Id } from 'src/types';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';

import { Inject } from '@nestjs/common';
import { LOGGER } from 'src/commen/logger/logger.constants';
import { Logger } from 'src/commen/logger/logger.classes';
import { PaginationArgs } from 'src/commen/pagination/pagination-type';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly roleService: RolesService,
    @Inject(LOGGER) private readonly logger: Logger,
  ) {}
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
  @Query(() => UserPaginated)
  userPagination(@Args() args: PaginationArgs) {
    return this.usersService.findPagination(args);
  }
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: Id) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: Id,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: Id) {
    return this.usersService.remove(id);
  }

  // @ResolveField(() => String)
  // password() {
  //   return '******';
  // }

  @ResolveField(() => [Role])
  roles(@Parent() user: User) {
    return this.roleService.findRolesByIds(user.roles as Id[]);
  }
}
