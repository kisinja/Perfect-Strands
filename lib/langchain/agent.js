import { ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config();

export async function createAgent() {
  console.log("[Agent] Starting to create AI agent...");

  const loader = new TextLoader(
    path.join(process.cwd(), "public/business-info.txt")
  );
  const docs = await loader.load();
  console.log(`[Agent] Loaded ${docs.length} document(s).`);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
  );
  console.log("[Agent] Vector store created.");

  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log("[Agent] ChatOpenAI model initialized.");

  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question based on the following context:\n\n{context}\n\nUser: {input}`
  );

  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  const retriever = vectorStore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    retriever,
    combineDocsChain,
  });

  console.log("[Agent] AI Agent successfully created.");
  return retrievalChain;
}
