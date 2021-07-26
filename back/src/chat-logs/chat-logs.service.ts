import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatLogInput } from './dto/create-chat-log.input';
import { UpdateChatLogInput } from './dto/update-chat-log.input';
import { ChatLog } from '../chat-logs/entities/chat-log.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChatLogsService {
  async create(createChatLogInput: CreateChatLogInput) {
    const chat = await Chat.findOneOrFail({
      where: {
        uuid: createChatLogInput.chatUUID,
        isAlive: true,
      },
    }).catch(() => {
      const error = { uuid: `chat with uuid(${createChatLogInput.chatUUID}) does not exist.` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    });
    const user = await User.findOne({
      where: {
        userID: createChatLogInput.userID,
      },
    }).catch(() => {
      const error = { userID: `user(ID: ${createChatLogInput.userID}) does not exist.` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    });
    //음소거 된 유저가 메세지를 보낼 경우
    if (createChatLogInput.type === 'message' && chat.muteID.includes(user.userID)) {
      throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
    }
    const chatLog = new ChatLog();
    chatLog.chatUUID = chat.uuid;
    chatLog.message = createChatLogInput.message;
    chatLog.userID = user.userID;
    chatLog.type = createChatLogInput.type;
    return await ChatLog.save(chatLog);
  }

  async findAll() {
    const chatLogs = await ChatLog.find();
    return chatLogs;
  }

  async findOne(index: number) {
    const chatLog = await ChatLog.findOneOrFail(index);
    return chatLog;
  }

  async findChatLogsFromChat(uuid: string) {
    const chatLogs = await ChatLog.find({
      where: {
        chatUUID: uuid,
      },
      order: {
        createdAt: 'ASC',
      },
    });
    return chatLogs;
  }

  async update(index: number, updateChatLogInput: UpdateChatLogInput) {
    const chatLog = await ChatLog.findOne(index);
    return chatLog;
  }

  async remove(index: number) {
    const chatLog = await ChatLog.findOne(index);
    return await ChatLog.remove(chatLog);
  }
}
