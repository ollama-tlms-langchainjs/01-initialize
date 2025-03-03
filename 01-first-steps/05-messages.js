import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
})

let systemInstructions = `You are a helpful AI agent and an expert in the Star Trek domain. 
Answer questions to the best of your ability, 
first using the provided context which takes precedence over your current knowledge.`

let context = `CONTEXT: 
Jean-Luc Picard is a fictional character in the Star Trek franchise. 
He is the captain of the starship USS Enterprise-D and later the USS Enterprise-E in the television series Star Trek: 
The Next Generation (1987-1994), its subsequent films, 
and the series Star Trek: Picard (2020-2023).

Jean-Luc Picard's closest friends include:

1. William Riker - His First Officer and trusted confidant
2. Beverly Crusher - The ship's doctor and occasional romantic interest
3. Guinan - The Enterprise's bartender who offers wisdom and perspective
4. Data - The android officer with whom Picard develops a mentor-like friendship
5. Deanna Troi - The ship's counselor who shares a professional bond with Picard
6. Geordi La Forge - The chief engineer who respects Picard deeply
7. Worf - The Klingon security officer who values Picard's leadership
`

let userQuestion = `Who is Jean-Luc Picard?`

var messages = [
    ["system", systemInstructions],
    ["system", context],
    ["user", userQuestion]
]

var answer = ""
var stream = await llm.stream(messages)
for await (const chunk of stream) {
    answer += chunk.content
    process.stdout.write(chunk.content)
}

console.log("\n\n-----------------------------------\n")

let newUserQuestion = `Who is his best friend?`

messages.push(
    ["assistant", answer],
    ["user", newUserQuestion]
)

stream = await llm.stream(messages)
for await (const chunk of stream) {
    answer += chunk.content
    process.stdout.write(chunk.content)
}