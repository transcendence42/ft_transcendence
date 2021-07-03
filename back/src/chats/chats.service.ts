import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  create(createChatInput: CreateChatInput) {
    return 'This action adds a new chat';
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
