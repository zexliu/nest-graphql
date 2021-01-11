import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Min(0, { message: "offset can't be less than 0" })
  @Field(() => Int, { defaultValue: 0, description: '分页偏移量' })
  offset?: number;
  @Min(1, { message: "limit can't be less than 1" })
  @Field(() => Int, { nullable: true, description: '数据长度限制' })
  limit?: number;
  @Field(() => Boolean, { description: '是否查询数量', defaultValue: false })
  isSearchCount?: boolean;

  @Field(() => [String], {
    description: '排序数组 [field1,asc,field2,desc...]',
  })
  sort?: [string];
}

export interface IPaginatedResponse {
  total?: number;
  records: Array<any>;
}

export function PaginatedType<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponse implements IPaginatedResponse {
    @Field(() => Int, { nullable: true })
    total?: number;
    @Field(() => [TClass])
    records: [T];
  }
  return PaginatedResponse;
}
