import { createAgent } from "@/lib/langchain/agent";
import { getMemory, saveMemory } from "@/lib/langchain/memory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question, sessionId } = await req.json();

  console.log("➡️ Incoming question:", question);
  console.log("🧠 Session ID:", sessionId);

  const chain = await createAgent();
  const pastMessages = getMemory(sessionId);
  const context = pastMessages.join("\n");

  console.log("🧾 Past messages:\n", context);

  const result = await chain.invoke({
    input: question,
    context,
  });

  console.log("🤖 Raw result:", result);

  saveMemory(sessionId, `User: ${question}`);
  saveMemory(sessionId, `Bot: ${result.answer || result.output}`);

  return NextResponse.json({ answer: result.answer || result.output });
}
