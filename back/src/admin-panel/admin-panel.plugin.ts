import { INestApplication } from '@nestjs/common';
import { Database, Resource } from 'admin-bro-typeorm';
import AdminBro from 'admin-bro';
import * as AdminBroExpress from 'admin-bro-expressjs';
import UserResource from './resources/user.resource';
import AlarmResource from './resources/alarm.resource';
import ChatResource from './resources/chat.resource';
import ChatLogResource from './resources/chatLog.resource';
import FollowResource from './resources/follow.resource';
import GameResource from './resources/game.resource';

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  /**
   * Register TypeORM adapter for using
   */
  AdminBro.registerAdapter({ Database, Resource });

  /** Create adminBro instance */
  const adminBro = new AdminBro({
    resources: [UserResource, AlarmResource, ChatResource, ChatLogResource, FollowResource, GameResource], // Here we will put resources
    rootPath: '/admin', // Define path for the admin panel
  });

  const adminUserInfo = {
    email: 'admin@admin.com',
    password: 'admin'
  };

  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      if (adminUserInfo.email === email && adminUserInfo.password === password) {
        return adminUserInfo
      }
      return null
    },
    cookieName: 'adminBro',
    cookiePassword: 'testtest'
  })

  /** Create router */
  // const router = AdminBroExpress.buildRouter(adminBro);

  /** Bind routing */
  app.use(adminBro.options.rootPath, router);
}
