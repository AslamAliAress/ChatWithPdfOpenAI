# PDF Question Answering Assistant

This project is a Node.js application that allows you to ask questions about a PDF document. It uses the `langchain` library to process and retrieve relevant parts of the document to answer your questions. The PDF is split into chunks and stored in an in-memory vector store for efficient retrieval.

## Prerequisites

Ensure you have Node.js installed. You can check this by running:

```bash
node -v
```

If Node.js is not installed, download and install it from here. https://nodejs.org/en

## Setup

1. Initialize the project
Open your terminal and run the following command to create a new Node.js project:

```bash
npm init -y
```
2. Install the necessary dependencies
Run the following commands to install the required libraries:

```bash
npm install langchain 
npm install pdf-parse
npm install @langchain/community
npm install @langchain/openai 
npm install dotenv
```
3. Set up the environment variables
Create a .env file in the root directory of your project and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```
## Running the Application
1. Load a PDF Document
Make sure to specify the path to the PDF document in the PDFLoader line in the code:

```bash
const loader = new PDFLoader("C:/Users/aslam.ali/Downloads/samplePdf.pdf");
```
2. Run the application
Use the following command to start the application:

```bash
node index.js
```
3. Interact with the application
The application will prompt you to ask a question related to the PDF document. You can continue to ask questions or type "e" to exit.

## Output
![Untitled](https://github.com/user-attachments/assets/ddceb288-5a94-467c-ab04-93a962c51e5d)


## Features
- PDF Loading: Load and process PDF documents.
- Chunking: Split the PDF into smaller chunks for efficient processing.
- Question Answering: Ask questions and get concise answers based on - the document content.
- Interactive CLI: Simple command-line interface for easy interaction.

## Notes
- Ensure the PDF path is correct and accessible.
- The OpenAI API key is required for generating embeddings and answering questions.
- The application uses the langchain library's in-memory vector store for storing and retrieving document chunks.


