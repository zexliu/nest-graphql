import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RoleResolver } from './roles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';
import { UsersModule } from '../users/users.module';
const mongoModule = MongooseModule.forFeature([
  { name: Role.name, schema: RoleSchema },
]);

@Module({
  imports: [mongoModule, forwardRef(() => UsersModule)],
  providers: [RoleResolver, RoleService],
  exports: [RoleService, mongoModule],
})
export class RolesModule {}
