import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
})

var question = "Who is Jean-Luc Picard?"

var stream = await llm.stream(question)
for await (const chunk of stream) {
    process.stdout.write(chunk.content)
}

console.log("\n\n-----------------------------------\n")

question = "Who is his best friend?"

stream = await llm.stream(question)
for await (const chunk of stream) {
    process.stdout.write(chunk.content)
}
