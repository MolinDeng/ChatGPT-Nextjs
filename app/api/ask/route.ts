import query from "@/lib/query";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

export async function POST(req: NextRequest) {
  const { prompt, chatId, model, session } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { answer: "Please provide a prompt!" },
      { status: 400 }
    );
  }
  if (!chatId) {
    return NextResponse.json(
      { answer: "Chat session invalid!" },
      { status: 400 }
    );
  }
  // ChatGPT query
  const response = await query(prompt, chatId, model);
  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    createAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };
  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .update({
      messages: admin.firestore.FieldValue.arrayUnion(message),
    });
  return NextResponse.json({ answer: message.text });
}
