// import { Inject } from '@nestjs/common';
// import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { ClassType } from 'class-transformer/ClassTransformer';
// import { LOGGER } from '../logger/logger.constants';
// import * as pluralize from 'pluralize';
// import { Id } from 'src/types';
// import { Logger } from '../logger/logger.classes';
// import { PaginationArgs } from '../pagination/pagination-type';
// export function BaseResolver<T, C, U, P, S extends IBaseService<T, C, U>>(
//   TClass: ClassType<T>,
//   CClass: ClassType<C>,
//   UClass: ClassType<U>,
//   PClass: ClassType<P>,
// ) {
//   const { name } = TClass;
//   const lowerName = name[0].toLowerCase() + name.substring(1);
//   const pluralName = pluralize.plural(lowerName);
//   console.log('name lowername pluralName', name, lowerName, pluralName);

//   @Resolver(() => TClass, { isAbstract: true })
//   abstract class BaseResolver {
//     constructor(
//       @Inject(LOGGER) protected readonly logger: Logger,
//       @Inject(`${name}Service`) protected readonly service: S,
//     ) {}

//     @Mutation(() => TClass, { name: `create${name}` })
//     create(@Args({ name: `create${name}Input`, type: () => CClass }) c: C) {
//       return this.service.create(c);
//     }
//     @Query(() => [TClass], { name: `${pluralName}` })
//     findAll() {
//       return this.service.findAll();
//     }
//     @Query(() => PClass)
//     userPagination(@Args() args: PaginationArgs) {
//       return this.service.findPagination(args);
//     }
//     @Query(() => [TClass], { name: `${lowerName}` })
//     findOne(@Args('id', { type: () => ID }) id: Id) {
//       return this.service.findById(id);
//     }

//     @Mutation(() => TClass)
//     update(
//       @Args('id', { type: () => ID }) id: Id,
//       @Args({ name: `update${name}Input`, type: () => UClass }) u: U,
//     ) {
//       return this.service.updateById(id, u);
//     }
//     @Mutation(() => TClass)
//     removeUser(@Args('id', { type: () => ID }) id: Id) {
//       return this.service.deleteById(id);
//     }
//   }
//   return BaseResolver;
// }
