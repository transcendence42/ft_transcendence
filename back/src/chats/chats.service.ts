import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';
import { validate } from 'class-validator';

@Injectable()
export class ChatsService {
  private checkPasswordValidation(type: string, password: string) {
    if (type === 'private') {
      if (password === '' || password === undefined) {
        const error = { password: `Private chat must set password.` };
        throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
      } else if (password.search(/[^\d]/g) !== -1) {
        const error = { password: `Password must be number.` };
        throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
      }
    } else {
      // public
      if (!(password === '' || password === undefined)) {
        const error = { password: `Public chat can't set password.` };
        throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async create(createChatInput: CreateChatInput) {
    const chat = new Chat();
    chat.name = createChatInput.name;
    chat.password = createChatInput.password;
    chat.type = createChatInput.type;
    chat.ownerID = createChatInput.ownerID;
    this.checkPasswordValidation(createChatInput.type, createChatInput.password);

    //class-validator
    const validate_error = await validate(chat);
    if (validate_error.length > 0) {
      throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
    } else {
      return await Chat.save(chat);
    }
  }

  async findAll() {
    const chats = await Chat.find();
    return chats;
  }

  async findOne(uuid: string) {
    const chat = await Chat.findOneOrFail({
      where: {
        uuid: uuid,
      },
    }).catch(() => {
      const error = { uuid: `chat with uuid(${uuid}) does not exist` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    });
    return chat;
  }

  async update(uuid: string, updateChatInput: UpdateChatInput) {
    const chat = await Chat.findOneOrFail({
      where: {
        uuid: uuid,
      },
    }).catch(() => {
      const error = { uuid: `chat with uuid(${uuid}) does not exist` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    });
    chat.isAlive = updateChatInput.isAlive ? updateChatInput.isAlive : chat.isAlive;
    chat.adminID = updateChatInput.adminID ? updateChatInput.adminID : chat.adminID;
    chat.userID = updateChatInput.userID ? updateChatInput.userID : chat.userID;
    const validate_error = await validate(chat);
    if (validate_error.length > 0) {
      throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
    } else {
      return await Chat.save(chat);
    }
  }

  async remove(uuid: string) {
    const chat = await Chat.findOneOrFail({
      where: {
        uuid: uuid,
      },
    }).catch(() => {
      const error = { uuid: `chat with uuid(${uuid}) does not exist` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    });
    return await Chat.remove(chat);
  }

  async getTotalCount() {
    return await Chat.count();
  }

  // chat 페이지 채팅 리스트 확인용 쿼리
  async findAliveChats({
    type,
    page = 0,
    pageSize = 3,
  }: {
    type: 'public' | 'private' | undefined;
    page: number;
    pageSize: number;
  }) {
    const where = { isAlive: true };
    if (type !== undefined) {
      where['type'] = type;
    }
    const chats = await Chat.find({
      where: where,
      skip: page * pageSize,
      take: pageSize,
    });
    return chats;
  }
}
