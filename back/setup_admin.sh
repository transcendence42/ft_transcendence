#!/bin/bash

change_password_query="update 'adminUser' set password = '$2y$12$3aJx5ZzQqg9xlAhqzslmue3HQl55acfRZfYN6nGyke0HEZ0H4VxCe' where username = 'admin';"


npx ts-node node_modules/.bin/typeorm migration:generate -n "create-admin-user"
npx ts-node node_modules/.bin/typeorm migration:run
npx nestjs-admin createAdminUser 
