"use client";

import { db } from "@/firebase";
import { doc } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { useDocument } from "react-firebase-hooks/firestore";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import MessageBubble from "./MessageBubble";

function ChatSession({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const [value, loading, error] = useDocument(
    session && doc(db, "users", session?.user?.email!, "chats", chatId)
  );
  const messages: [Message] = value?.data()?.messages;
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {session && (
        <>
          {(!messages || !messages.length) && (
            <>
              <p className="mt-10 text-center text-white">
                {loading ? "Loading..." : "Type a prompt in below to get start"}
              </p>
              {!loading && (
                <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
              )}
            </>
          )}
          {messages &&
            messages.map((msg: Message, index: number) => (
              <MessageBubble key={index} message={msg} />
            ))}
        </>
      )}
    </div>
  );
}

export default ChatSession;
