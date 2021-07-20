import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DefaultAdminModule],
  import { AuthModule } from 'src/auth/auth.module';
  import { AlarmsModule } from 'src/alarms/alarms.module';
  import { FollowsModule } from 'src/follows/follows.module';

@Module({
    imports: [forwardRef(() => AlarmsModule), forwardRef(() => AuthModule), forwardRef(() => FollowsModule)],
    providers: [UsersResolver, UsersService],
    exports: [TypeOrmModule, UsersService],
  })
export class UsersModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    // Register the User entity under the "User" section
    adminSite.register('User', User);
  }
}
