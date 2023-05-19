"use client";
import { useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

function ChatInput({ chatId }: { chatId: string }) {
  const { register, handleSubmit, watch, reset } = useForm();
  const watchPropmt = watch("prompt");
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const onSubmit = handleSubmit(async (formData) => {
    const input = formData.prompt.trim();
    if (!input) {
      reset();
      return;
    }
    try {
      const message: Message = {
        text: input,
        createAt: Timestamp.now(),
        user: {
          _id: session?.user?.email!,
          name: session?.user?.name!,
          avatar:
            session?.user?.image! ||
            `https://ui-avatars.com/api/?name=${session?.user?.name}`,
        },
      };
      // ! may be wrong by papareact
      //   await addDoc(
      //     collection(
      //       db,
      //       "users",
      //       session?.user?.email!,
      //       "chats",
      //       chatId,
      //       "messages"
      //     ),
      //     message
      //   );

      reset();
      await updateDoc(
        doc(db, "users", session?.user?.email!, "chats", chatId),
        {
          messages: arrayUnion(message),
        }
      );

      //  * Toast notification to say loading
      const notification = toast.loading("ChatPGT is thinking...");

      // * generate GPT answer
      await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          chatId,
          model,
          session,
        }),
      }).then((respose) => {
        // * Toast notification to say successful
        toast.success("ChatGPT has responed!", {
          id: notification,
        });
      });
    } catch (err) {
      alert(err);
    }
  });
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm m-4">
      <form onSubmit={onSubmit} className="p-5 space-x-5 flex items-center">
        <input
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 resize-none"
          disabled={!session}
          {...register("prompt")}
          placeholder="Type your message here..."
          required
          contentEditable
        />
        <button
          className="bg-[#11A37F] hover:opacity-40 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300 max-h-8"
          type="submit"
          disabled={!watchPropmt || !session}
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
