import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
})

const question = "Who is Jean-Luc Picard?"

const response = await llm.invoke(question)
console.log(`Answer: ${response.content}`)
