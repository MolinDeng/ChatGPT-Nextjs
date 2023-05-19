"use client";
import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

function ChatRow({ id }: { id: string }) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  // * query chatlog of this chat-session
  const [value] = useDocument(
    session && doc(db, "users", session?.user?.email!, "chats", id)
  );
  const messages: [Message] = value?.data()?.messages;
  // * Check if this chat session is active based on path
  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(id));
  }, [pathName]);

  // * delete
  const deleteChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chat-row ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className=" w-5 h-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {(messages && messages[messages.length - 1]?.text) || "New Chat"}
      </p>
      <TrashIcon onClick={deleteChat} className="w-5 h-5 hover:text-red-500" />
    </Link>
  );
}

export default ChatRow;
