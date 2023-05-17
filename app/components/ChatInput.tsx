"use client";
import { useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

function ChatInput({ Chatid }: { Chatid: string }) {
  const { register, handleSubmit, watch, reset } = useForm();
  const watchPropmt = watch("prompt");
  const { data: session } = useSession();

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm mx-6">
      <form
        onSubmit={handleSubmit((formData) => {
          console.log(formData.prompt);
          reset();
        })}
        className="p-5 space-x-5 flex"
      >
        <input
          type="text"
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          {...register("prompt")}
          placeholder="Type your message here..."
          required
          contentEditable
        />
        <button
          className="bg-[#11A37F] hover:opacity-40 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
          type="submit"
          disabled={!watchPropmt || !session}
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div>{/* Model Selection */}</div>
    </div>
  );
}

export default ChatInput;
