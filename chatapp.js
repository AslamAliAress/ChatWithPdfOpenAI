import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import 'dotenv/config'; 
import { ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import readline from 'readline';

// Load the PDF document
const loader = new PDFLoader("C:/Users/aslam.ali/Downloads/samplePdf.pdf");
const docs = await loader.load();

// Log the length of the loaded PDF document
console.log("Number of Pages in Pdf: "+docs.length);

// Log the first 100 characters of the content of the first page and its metadata
// console.log(docs[0].pageContent.slice(0, 100));
// console.log(docs[0].metadata);

// Initialize the OpenAI model with specific parameters
const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY
});

// Split the document into smaller chunks for processing
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const splits = await textSplitter.splitDocuments(docs);

// Create an in-memory vector store from the document chunks
const vectorstore = await MemoryVectorStore.fromDocuments(
  splits,
  new OpenAIEmbeddings()
);

// Use the vector store as a retriever for relevant document chunks
const retriever = vectorstore.asRetriever();

// Define the system prompt template for the assistant
const systemTemplate = [
  `You are an assistant for question-answering tasks. `,
  `Use the following pieces of retrieved context to answer `,
  `the question. If you don't know the answer, say that you `,
  `don't know. Use three sentences maximum and keep the `,
  `answer concise.`,
  `\n\n`,
  `{context}`,
].join("");

// Create a chat prompt template with system and human messages
const prompt = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["human", "{input}"],
]);

// Initialize the ChatOpenAI model for language generation
const llm = new ChatOpenAI();

// Create a chain to combine retrieved documents for answering questions
const questionAnswerChain = await createStuffDocumentsChain({ llm, prompt });

// Create a retrieval chain that uses the retriever and the question-answer chain
const ragChain = await createRetrievalChain({
  retriever,
  combineDocsChain: questionAnswerChain,
});

// Set up the readline interface for interactive input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to handle question-answer loop
const questionAnswerLoop = async () => {
  rl.question('Ask a question (or type "e" to exit): ', async (input) => {
    if (input.toLowerCase() === 'e') {
      rl.close();
      console.log("Exiting the question-answer.");
      return;
    }

    const results = await ragChain.invoke({
      input: input,
    });

    console.log("Answer:", results);

    rl.question('Do you want to ask another question? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'n') {
        rl.close();
        console.log("Exiting the question-answer.");
      } else {
        questionAnswerLoop();
      }
    });
  });
};

// Start the question-answer loop
questionAnswerLoop();
