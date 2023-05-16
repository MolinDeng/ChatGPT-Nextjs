"use client";
import { useSession } from "next-auth/react";
import NewChat from "./NewChat";

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div>{/* Model Selection */}</div>
          {/* Map through Chatrows */}
        </div>
      </div>
      {session && <img src={session.user?.image!} alt="avatar" />}
    </div>
  );
}

export default Sidebar;
