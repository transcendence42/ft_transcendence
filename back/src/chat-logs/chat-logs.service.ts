import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatLogInput } from './dto/create-chat-log.input';
import { UpdateChatLogInput } from './dto/update-chat-log.input';
import { ChatLog } from '../chat-logs/entities/chat-log.entity';
import { Chat } from 'src/chats/entities/chat.entity';
// import { User } from 'src/users/entities/user.entity';  //TODO: user resource 구현되면 주석 해제.

@Injectable()
export class ChatLogsService {
  async create(createChatLogInput: CreateChatLogInput) {
    const chat = await Chat.findOneOrFail({
      where: {
        uuid: createChatLogInput.chatID,
      },
    }).catch(() => {
      const error = { uuid: `chat with uuid(${createChatLogInput.chatID}) does not exist.` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    });
    //TODO: user resource 구현되면 아래 코드 주석 해제.
    // const user = await User.findOne({
    //   where: {
    //     userID: createChatLogInput.userID,
    //   }
    // }).catch(()=>{
    //   const error = { userID: `user(ID: ${createChatLogInput.userID}) does not exist.`};
    //   throw new HttpException({ message: 'Input data validation failed', error}, HttpStatus.BAD_REQUEST);
    // })
    const chatLog = new ChatLog();
    chatLog.chatID = chat.uuid;
    chatLog.message = createChatLogInput.message;
    chatLog.userID = Math.random() > 0.5 ? 'yshin' : 'holee'; // TODO: user resource 구현되면 아래 코드로 바꿀것.
    //chatLog.userID = user.userID;
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
        chatID: uuid,
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
