"use client";
import { useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

function ChatInput({ Chatid }: { Chatid: string }) {
  const { register, handleSubmit } = useForm();
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form
        onSubmit={handleSubmit((formData) => {
          console.log(formData.prompt);
        })}
        className="p-5 space-x-5 flex"
      >
        <input
          type="text"
          className="bg-transparent focus:outline-none flex-1"
          {...register("prompt")}
          placeholder="Type your message here..."
          required
        />
        <button type="submit">
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div>{/* Model Selection */}</div>
    </div>
  );
}

export default ChatInput;
