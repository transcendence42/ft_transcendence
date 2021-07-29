import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';
import { validate } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChatsService {
  private checkNameValication(name: string) {
    if (name === '' || name.search(/[^a-zA-Z0-9ㄱ-ㅎ가-힣]/g) !== -1) {
      const error = { password: `Chat name must be number, english, or korean.` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    }
  }

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
    chat.userID = createChatInput.userID;
    this.checkNameValication(chat.name);
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
    chat.isAlive = updateChatInput.isAlive !== undefined ? updateChatInput.isAlive : chat.isAlive;
    chat.adminID = updateChatInput.adminID ? updateChatInput.adminID : chat.adminID;
    chat.userID = updateChatInput.userID ? updateChatInput.userID : chat.userID;
    chat.muteID = updateChatInput.muteID ? updateChatInput.muteID : chat.muteID;
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

  //type 별로 전체 카운트를 반환하는 메소드.
  //userID가 있을 때 나의채팅방(type: undefined), 1:1채팅방(type: 'dm')으로 구분되고, 없으면 전체채팅방(type: undefined), 공개채팅방(type: 'public'), 비공개채팅방(type: 'private')으로 구분됨.
  async getCount({ type, userID }: { type: string; userID: string }) {
    const page = 0;
    const pageSize = 0;
    return await this.findAliveChats({ userID, type, page, pageSize }).then((res) => res.length);
  }

  //채팅방 리스트 쿼리(전체채팅방, 공개채팅방, 비공개채팅방, 나의채팅방, 1:1채팅방)
  async findAliveChats({
    userID,
    type,
    page = 0,
    pageSize = 3,
  }: {
    userID: string;
    type: string;
    page: number;
    pageSize: number;
  }) {
    page = page !== 0 ? page - 1 : page;
    let additionalWhereClause = ![undefined, null, ''].includes(type) ? ` AND "type"='${type}'` : ''; // type이 있을 때 추가되는 where절. 공개채팅방('public'), 비공개채팅방('private'), 1:1채팅방('dm'), 전체채팅방/나의채팅방(undefined, null, '')
    additionalWhereClause += ![undefined, null, ''].includes(userID)
      ? ` AND '${userID}'=ANY("userID")`
      : ` AND "type"!='dm'`; // userID가 있을 때 추가되는 where절. 나의채팅방, 1:1채팅방이 where절을 사용.
    const chatList = await Chat.getRepository()
      .createQueryBuilder()
      .where('"isAlive" = true' + additionalWhereClause)
      .skip(page * pageSize)
      .take(pageSize)
      .orderBy('"createdAt"')
      .getMany();
    return chatList;
  }

  //비공개 채팅방의 비밀번호가 맞는지 확인.
  async checkPassword(uuid: string, password: string) {
    const isMatchedPassword =
      (await Chat.getRepository()
        .createQueryBuilder()
        .where('uuid=:uuid', { uuid: uuid })
        .andWhere('password=:password', { password: password })
        .getCount()) > 0
        ? true
        : false;
    return isMatchedPassword;
  }

  //chat, user가 있는지 확인하고 user가 chat에 존재하는지 확인
  private async checkUserExistInChat(uuid: string, userID: string) {
    const chat = await Chat.findOneOrFail({
      where: {
        uuid: uuid,
      },
    }).catch(() => {
      const error = { uuid: `chat with uuid(${uuid}) does not exist` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    });
    const user = await User.findOneOrFail({
      where: {
        userID: userID,
      },
    }).catch(() => {
      const error = { uuid: `userID(${userID}) does not exist` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    });
    if (!chat.userID.includes(user.userID)) {
      const error = { uuid: `userID(${userID}) does not exist in chat` };
      throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST);
    }
    return { chat: chat, user: user };
  }

  //mute, unmute
  async toggleMute(uuid: string, userID: string) {
    const obj = await this.checkUserExistInChat(uuid, userID);
    obj.chat.muteID = obj.chat.muteID.includes(obj.user.userID)
      ? obj.chat.muteID.filter((item) => item !== obj.user.userID)
      : [...obj.chat.muteID, obj.user.userID];
    return await Chat.save(obj.chat);
  }

  //forced out
  async forcedOut(uuid: string, userID: string) {
    const obj = await this.checkUserExistInChat(uuid, userID);
    obj.chat.userID = obj.chat.userID.filter((item) => item !== obj.user.userID);
    return await Chat.save(obj.chat);
  }

  //admin 위임/해제
  async toggleAdmin(uuid: string, userID: string) {
    const obj = await this.checkUserExistInChat(uuid, userID);
    obj.chat.adminID = obj.chat.adminID.includes(obj.user.userID)
      ? obj.chat.adminID.filter((item) => item !== obj.user.userID)
      : [...obj.chat.adminID, obj.user.userID];
    return await Chat.save(obj.chat);
  }
}
