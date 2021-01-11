import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { RoleService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';

const mongoModule = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
@Module({
  imports: [mongoModule, forwardRef(() => RolesModule)],
  providers: [UserResolver, UserService, RoleService],
  exports: [UserService, mongoModule],
})
export class UsersModule {}
