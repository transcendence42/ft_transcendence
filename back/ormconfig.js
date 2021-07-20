const AdminUser = require('nestjs-admin').AdminUserEntity
module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "user",
    "password": "password",
    "database": "database",
    "entities": [
      "dist/**/*.entity{.ts,.js}",
      AdminUser
    ],
    "synchronize": true
  }
  