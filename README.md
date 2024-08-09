PDF Question Answering Assistant
This project is a Node.js application that allows you to ask questions about a PDF document. It uses the langchain library to process and retrieve relevant parts of the document to answer your questions. The PDF is split into chunks and stored in an in-memory vector store for efficient retrieval.

Prerequisites
Ensure you have Node.js installed. You can check this by running:

bash
Copy code
node -v
npm -v
If Node.js is not installed, download and install it from here.

Setup
Initialize the project:
Open your terminal and run the following command to create a new Node.js project:

bash
Copy code
npm init -y
Install the necessary dependencies:
Run the following commands to install the required libraries:

bash
Copy code
npm install langchain 
npm install pdf-parse
npm install @langchain/community
npm install @langchain/openai 
npm install dotenv
Set up the environment variables:
Create a .env file in the root directory of your project and add your OpenAI API key:

env
Copy code
OPENAI_API_KEY=your_openai_api_key_here
Running the Application
Load a PDF Document:
Make sure to specify the path to the PDF document in the PDFLoader line in the code:

javascript
Copy code
const loader = new PDFLoader("C:/Users/aslam.ali/Downloads/samplePdf.pdf");
Run the application:
Use the following command to start the application:

bash
Copy code
node index.js
Interact with the application:
The application will prompt you to ask a question related to the PDF document. You can continue to ask questions or type "e" to exit.

Features
PDF Loading: Load and process PDF documents.
Chunking: Split the PDF into smaller chunks for efficient processing.
Question Answering: Ask questions and get concise answers based on the document content.
Interactive CLI: Simple command-line interface for easy interaction.
Notes
Ensure the PDF path is correct and accessible.
The OpenAI API key is required for generating embeddings and answering questions.
The application uses the langchain library's in-memory vector store for storing and retrieving document chunks.
