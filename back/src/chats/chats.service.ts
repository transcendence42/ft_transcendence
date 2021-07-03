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
    const chat = await Chat.findOne({
      where: {
        uuid: uuid,
      },
    });
    return chat;
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
