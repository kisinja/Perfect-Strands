import { ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Document } from "langchain/document";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config();

async function fetchProductsFromDB() {
  const res = await fetch("https://perfect-strands.vercel.app/api/products"); // Change if deployed
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return await res.json();
}

export async function createAgent() {
  console.log("[Agent] Starting to create AI agent...");

  // Load business info text
  const loader = new TextLoader(
    path.join(process.cwd(), "public/business-info.txt")
  );
  const businessDocs = await loader.load();
  console.log(`[Agent] Loaded ${businessDocs.length} business document(s).`);

  // Fetch product data and convert to Documents
  console.log("[Agent] Fetching products from DB...");
  const products = await fetchProductsFromDB();
  const productDocs = products.map(
    (p) =>
      new Document({
        pageContent: `**Product Name:** ${p.name}
**Description:** ${p.description}
**Price:** $${p.price}
**Link:** [View Product](${p.productLink})
${p.imageUrl ? `**Image:** ![](${p.imageUrl})` : ""}
**Ribbon:** ${p.ribbon || "None"}
**Created At:** ${p.createdAt}`,
        metadata: {
          id: p.id,
          type: "product",
          url: p.productLink,
          image: p.imageUrl,
        },
      })
  );

  console.log(`[Agent] Converted ${productDocs.length} products to documents.`);

  // logging the first product for debugging
  if (productDocs.length > 0) {
    console.log("[Agent] First product document:", productDocs[0].pageContent);
  } else {
    console.warn("[Agent] No product documents found.");
  }

  // Combine business and product docs
  const allDocs = [...businessDocs, ...productDocs];

  // Create vector store from combined docs
  const vectorStore = await MemoryVectorStore.fromDocuments(
    allDocs,
    new OpenAIEmbeddings()
  );
  console.log("[Agent] Vector store created.");

  // Initialize ChatOpenAI model
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log("[Agent] ChatOpenAI model initialized.");

  // Define prompt template
  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question based on the following context:\n\n{context}\n\nUser: {input}`
  );

  // Create combine documents chain
  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  // Create retriever from vector store
  const retriever = vectorStore.asRetriever();

  // Create retrieval chain
  const retrievalChain = await createRetrievalChain({
    retriever,
    combineDocsChain,
  });

  console.log("[Agent] AI Agent successfully created.");
  return retrievalChain;
}
