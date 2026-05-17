import { Handler } from '@netlify/functions'
import OpenAI from 'openai'

const KNOWLEDGE_BASE = `
You are Gourav's portfolio AI assistant. Answer questions about Gourav Kumar Upadhyay
based ONLY on the information below. Be concise, technical, and confident.
If asked something not in this knowledge base, say "I don't have that info — reach out to Gourav directly."

## IDENTITY
Name: Gourav Kumar Upadhyay
Role: Full Stack Engineer × AI/ML Systems Builder
Location: New Delhi, India
Status: Available for AI/ML roles
Email: gaurav.upadhyay.vasudeva@gmail.com
GitHub: github.com/Poi5eN
LinkedIn: linkedin.com/in/gourav-kumar-upadhyay-0731b41b4
Education: B.Tech Computer Science, GNIT (2018–2022)

## CURRENT ROLE
Company: India Accelerator, Gurugram
Period: Jul 2025 – Present
Impact: Built AI-powered vehicle claim platform with OpenAI Vision API.
        Reduced manual claim assessment by ~40%.
        Architected enterprise platforms: vehicle claims, legal-tech APIs, coworking automation.
        Stack: NestJS, Next.js, PostgreSQL, Redis, GCP, TurboRepo, OpenAI Vision

## PAST EXPERIENCE
DoubleKlick Designs (Dec 2024 – Jul 2025, New Delhi):
  - Unified 5+ challan provider APIs with Redis caching: 10min → <3sec
  - Served 10K+ monthly requests
  - CI/CD on AWS (EC2, S3, Lambda): ↓25% deployment errors
  - Stack: Next.js, NestJS, Prisma, MongoDB, AWS

Corplyx Technologies (Jun 2023 – Nov 2024, Noida):
  - ↓30% page load times on core product modules
  - React + Redux + Node.js + Express + MongoDB
  
Infotech Software Solutions (Sept 2022 – Jun 2023, Noida):
  - Backend microservices, ↑15% system response time

## FLAGSHIP PROJECT: NEXUS (SAAR AI Platform)
URL: https://saarlabs.in
Description: Laboratory-grade multi-persona AI Agent Platform
Architecture: Custom ReAct agent loop, SSE streaming, sandboxed code execution, hybrid RAG
Stack: React 18, Vite, Tailwind v4, Bun.js, TypeScript, Hono, SQLite, Supabase pgvector,
       OpenRouter (Gemini 2.0 Flash + DeepSeek v3 + Llama 3.3 70B), Tavily, HuggingFace FLUX
Metrics: 10 agent personas, ↑35% task accuracy, ↓40% perceived latency, 0% rate-limit failures
10 Agents: Voyage Architect, Stock Broker, Deep Search, Vision Canvas, Legal Helper,
           Cinephile Expert, Support Desk, Academic Tutor, Medical Assistant, Nexus Assistant
Key Engineering: 
  - Native TypeScript ReAct loop with parallel tool execution
  - Dynamic LLM rotation (Gemini → DeepSeek → Llama fallback)
  - SSE streaming: tool_start, tool_result, thinking, token, done events
  - Bun.spawn sandboxed Python + JavaScript execution
  - SQLite for session memory + Supabase pgvector for RAG

## ALL PROJECTS
1. Paramount (https://sage.paramountservices.co.in/) — AI vehicle claim platform, OpenAI Vision
2. ChallanPay/Lawyered (https://lawyered.in/) — API gateway, 5 providers, Redis, 10K+/mo
3. Bhraman Together (https://www.bhramantogether.com/) — Travel booking, MongoDB geospatial
4. RAG Knowledge Base (https://rag-knowledge-basev2.streamlit.app/) — Python, LangChain, ChromaDB
5. IA Spaces (https://iaspaces.co/) — Coworking automation, WiFi provisioning
6. RukiyeZara (https://www.rukiyezara.com/) — Property booking, <2s load, Supabase
7. Digital Vidya Saarthi (https://www.digitalvidyasaarthi.in/) — School ERP, MERN

## TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, SQL, GraphQL, C++
Frontend: React.js, Next.js, Redux, Tailwind CSS, Shadcn/UI, Material UI
Backend: Node.js, NestJS, Express.js, Prisma ORM, REST, GraphQL, WebSockets, Redis, BullMQ
AI/ML: LangChain, OpenAI API, RAG Pipelines, Vector DBs (Pinecone, ChromaDB), 
       Prompt Engineering, Hugging Face, OpenAI Vision, ReAct Agents, SSE Streaming
Cloud: AWS (EC2, S3, Lambda, RDS), GCP, Docker, Kubernetes, CI/CD, Nginx, TurboRepo
DBs: PostgreSQL, MongoDB, MySQL, Redis, Firebase, Supabase, Pinecone, SQLite

## CERTIFICATIONS
- Software Engineering — FreeCodeCamp
- Intro to Machine Learning — Kaggle
- The AI Engineer Path — Scrimba
`

// Simple keyword simulator for resilient offline mode
function getSimulatedResponse(message: string): string {
  const query = message.toLowerCase()

  if (query.includes('nexus') || query.includes('saar')) {
    return `NEXUS (saarlabs.in) is Gourav's flagship project. It is a laboratory-grade multi-persona AI Agent Platform running a custom ReAct (Reasoning + Action) loop. Key details:
• 10 specialized persona agents (Voyage, Stock Broker, Deep Search, Vision, Legal, etc.)
• Parallel tool execution with an LLM rotation pool (Gemini 2.0 Flash → DeepSeek v3 → Llama 3.3 70B fallback)
• SSE streaming of tool_start, tool_result, and thinking tokens
• Sandboxed Python & JS runtimes via Bun.spawn
• SQLite for session memory + Supabase pgvector for RAG similarity searches.
Metrics: ↑35% task accuracy, ↓40% perceived latency, 0% rate-limit failures.`
  }

  if (query.includes('react') && query.includes('loop')) {
    return `The ReAct loop in NEXUS represents "Reasoning + Action". Instead of just sending a prompt to an LLM, NEXUS implements an active planning cycle:
1. Thought: Agent plans what to do next.
2. Action: Agent chooses a tool (e.g. SQLite query, web search, code sandbox execution).
3. Observation: The system returns the tool output.
This cycle repeats autonomously up to 9 times in parallel before synthesizing the final output, streaming all intermediate logs to the client via SSE.`
  }

  if (query.includes('experience') || query.includes('work') || query.includes('job')) {
    return `Gourav's professional experience spans over 3 years:
1. Full Stack Developer @ India Accelerator (2025-Present): Built an AI vehicle claim platform (OpenAI Vision) reducing manual claim assessment times by 40%.
2. Full Stack Developer @ DoubleKlick Designs (2024-2025): Optimized a unified 5-in-1 challan API gateway, improving response times from 10 minutes to sub-3 seconds using Redis caching.
3. Software Engineer @ Corplyx Technologies (2023-2024): Reduced page load times by 30% using React, Redux, Node.js, and MongoDB.
4. Software Developer @ Infotech Software Solutions (2022-2023): Worked on microservices and backend optimizations.`
  }

  if (query.includes('skill') || query.includes('stack') || query.includes('technologies')) {
    return `Gourav has a dual-track expertise spectrum:
• Track A (Engineering): React.js, Next.js, Redux, Tailwind, Node.js, NestJS, Prisma ORM, Redis, Docker, PostgreSQL, MongoDB, AWS, GCP.
• Track B (AI/ML): LangChain, OpenAI APIs (Vision/Assistant), RAG Pipelines, Vector Databases (Supabase pgvector, Pinecone, ChromaDB), Prompt Engineering, ReAct Agent loops, SSE Streaming.`
  }

  if (query.includes('project')) {
    return `Gourav's major projects include:
1. NEXUS (saarlabs.in) [Flagship]: Multi-agent ReAct platform with sandboxed execution.
2. Paramount: AI Vehicle Claim platform using computer vision.
3. ChallanPay (Lawyered): Unified API Gateway processing 10K+ monthly requests.
4. Bhraman Together: Geolocation-powered travel platform.
5. RAG Knowledge Base: Semantic search pipeline using LangChain.
6. IA Spaces Coworking: Booking SaaS with automated WiFi provisioning.
7. RukiyeZara: Property booking optimized for sub-2s load.
8. Digital Vidya Saarthi: ERP school management portal.`
  }

  if (query.includes('who') || query.includes('about') || query.includes('status')) {
    return `Gourav Kumar Upadhyay is a Full Stack Engineer & AI/ML Systems Builder based in New Delhi, India. He holds an MCA and BCA from IGNOU. He is currently a Full Stack Developer at India Accelerator and is actively available for advanced AI/ML and engineering roles.`
  }

  return `I am Gourav's portfolio AI assistant. I can answer questions about his flagship project NEXUS (saarlabs.in), his engineering or AI skills, work history at India Accelerator, or all 8 of his production projects. What would you like to know?`
}

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { messages } = JSON.parse(event.body || '{}')

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid or missing messages array' }),
      }
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    const latestMessage = messages[messages.length - 1]?.content || ''

    // Offline / Simulator Fallback if API Key is not configured
    if (!apiKey || apiKey === 'sk-or-v1-your-key-here') {
      console.warn('OPENROUTER_API_KEY not configured. Falling back to keyword-based simulator.')
      const simulatedText = getSimulatedResponse(latestMessage)
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          choices: [{ message: { content: simulatedText } }],
          simulated: true,
        }),
      }
    }

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': 'https://itsgauravhere.netlify.app',
        'X-Title': "Gourav's Portfolio AI",
      },
    })

    // Slice history to last 6 messages to protect context token count
    const conversationHistory = messages.slice(-6).map((m: any) => ({
      role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
      content: m.content,
    }))

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-exp:free',
      messages: [
        {
          role: 'system',
          content: KNOWLEDGE_BASE,
        },
        ...conversationHistory,
      ],
      max_tokens: 600,
    })

    const assistantText = completion.choices[0]?.message?.content || "I wasn't able to process that request."

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        choices: [{ message: { content: assistantText } }],
      }),
    }

  } catch (error: any) {
    console.error('AI Lab API Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Failed to communicate with OpenRouter' }),
    }
  }
}
