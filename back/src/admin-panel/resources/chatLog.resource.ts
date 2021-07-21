import { ResourceWithOptions } from 'admin-bro';
import { ChatLog } from 'src/chat-logs/entities/chat-log.entity';

const ChatLogResource: ResourceWithOptions = {
  resource: ChatLog,
  options: {},
};

export default ChatLogResource;
