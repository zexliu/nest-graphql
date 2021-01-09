import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';

const mongoModule = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
@Module({
  imports: [mongoModule, forwardRef(() => RolesModule)],
  providers: [UsersResolver, UsersService, RolesService],
  exports: [UsersService, mongoModule],
})
export class UsersModule {}
