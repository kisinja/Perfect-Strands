import * as dotenv from "dotenv";
import { createAgent } from "./agent.js";

dotenv.config(); // Load your OPENAI_API_KEY from .env

async function main() {
  try {
    const chain = await createAgent();

    const question = "What services does the business provide?";
    const result = await chain.invoke({ input: question });

    console.log("=== Question ===");
    console.log(question);

    console.log("\n=== Answer ===");
    console.log(result.answer ?? result); // Depending on output format
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
