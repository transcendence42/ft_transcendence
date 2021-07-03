import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';
import { validate } from 'class-validator';

@Injectable()
export class ChatsService {
  async create(createChatInput: CreateChatInput) {
    const chat = new Chat();
    chat.name = createChatInput.name;
    chat.password = createChatInput.password;
    chat.type = createChatInput.type;
    chat.ownerID = createChatInput.ownerID;
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
      throw new HttpException({ message: `chat with uuid(${uuid}) does not exist` }, HttpStatus.BAD_REQUEST);
    });
    return chat;
  }

  async update(uuid: string, updateChatInput: UpdateChatInput) {
    const chat = await Chat.findOneOrFail({
      where: {
        uuid: uuid,
      },
    }).catch(() => {
      throw new HttpException({ message: `chat with uuid(${uuid}) does not exist` }, HttpStatus.BAD_REQUEST);
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

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
