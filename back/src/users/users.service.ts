import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    // check if user exist by email(email is unique)
    const _user = await User.findOne({ email: createUserInput.email });
    if (_user) {
      const _error = { email: 'email is already exists' };
      throw new HttpException({ message: 'Input data validation falied', _error }, HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.username = createUserInput.username;
    user.email = createUserInput.email;
    user.password = createUserInput.password;
    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  async findAll() {
    const users = await User.find();
    return users;
  }

  async findOne(username: string) {
    const user = await User.findOne({ username: username });
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await User.findOne(id);
    user.username = updateUserInput.username;
    user.email = updateUserInput.email;
    user.password = updateUserInput.password;
    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  async remove(id: number) {
    const user = await User.findOne(id);
    if (!user) {
      const _error = { id: `User(${id}) does not exist.` };
      throw new HttpException({ message: 'Wrong ID', _error }, HttpStatus.BAD_REQUEST);
    }
    return await User.remove(user);
  }
}
