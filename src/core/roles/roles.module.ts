import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';
import { UsersModule } from '../users/users.module';
const mongoModule = MongooseModule.forFeature([
  { name: Role.name, schema: RoleSchema },
]);

@Module({
  imports: [mongoModule, forwardRef(() => UsersModule)],
  providers: [RolesResolver, RolesService],
  exports: [RolesService, mongoModule],
})
export class RolesModule {}
