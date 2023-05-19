import ChatInput from "@/app/components/ChatInput";
import ChatSession from "@/app/components/ChatSession";

function ChatPage(props: { params: { id: string; searchParams: {} } }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ChatSession chatId={props.params.id} />
      <ChatInput chatId={props.params.id} />
    </div>
  );
}

export default ChatPage;
