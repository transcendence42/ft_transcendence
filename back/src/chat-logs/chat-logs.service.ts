import { Injectable } from '@nestjs/common';
import { CreateChatLogInput } from './dto/create-chat-log.input';
import { UpdateChatLogInput } from './dto/update-chat-log.input';

@Injectable()
export class ChatLogsService {
  create(createChatLogInput: CreateChatLogInput) {
    return 'This action adds a new chatLog';
  }

  findAll() {
    return `This action returns all chatLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatLog`;
  }

  update(id: number, updateChatLogInput: UpdateChatLogInput) {
    return `This action updates a #${id} chatLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatLog`;
  }
}
