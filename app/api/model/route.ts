import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/chatgpt";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOption: Option[];
};

export async function GET(req: NextRequest) {
  const models = await openai.listModels().then((res) => res.data.data);

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  return NextResponse.json({ modelOptions });
}
