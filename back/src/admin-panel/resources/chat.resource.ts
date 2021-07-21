import { ResourceWithOptions } from 'admin-bro';
import { Chat } from 'src/chats/entities/chat.entity';

const ChatResource: ResourceWithOptions = {
  resource: Chat,
  options: {},
};

export default ChatResource;
