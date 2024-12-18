// hooks/use-chat.ts
import { useState } from 'react';

const useChat = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  return { messages, sendMessage };
};

export default useChat;
