import ChatInput from "@/app/components/ChatInput";
import ChatSession from "@/app/components/ChatSession";

function ChatPage({ id }: { id: string }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ChatSession Chatid={id} />
      <ChatInput Chatid={id} />
    </div>
  );
}

export default ChatPage;
