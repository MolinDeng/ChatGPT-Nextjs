"use client";

import { db } from "@/firebase";
import { Timestamp, addDoc, collection } from "@firebase/firestore";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function NewChat() {
  const router = useRouter();

  const { data: session } = useSession();

  const createNewChat = async () => {
    const docRef = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createAt: Timestamp.now(),
      }
    );

    router.push(`/chat/${docRef.id}`);
  };

  return (
    <div onClick={createNewChat} className=" border-gray-700 border chat-row">
      <PlusIcon className=" h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
