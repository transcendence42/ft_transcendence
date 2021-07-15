import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DefaultAdminModule],
  providers: [UsersResolver, UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    // Register the User entity under the "User" section
    adminSite.register('User', User);
  }
}
