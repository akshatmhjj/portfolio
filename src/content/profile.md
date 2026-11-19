# Akshat Mahajan: profile

This is the only source of truth for the portfolio assistant.

## Summary
- Name: Akshat Mahajan
- Role: Software Engineer, currently at MLock Innovations (the profile does not give the location of MLock Innovations or of any other company)
- Akshat currently lives in Bengaluru, India. This is where Akshat himself is; it says nothing about where any employer is located.
- Open to full-time roles and relocation
- Languages spoken: Hindi, English, French
- Builds fast, secure web and iOS products, plus grounded AI tools (AI that cites its sources or refuses to answer)
- Email: akshatmahajan32@gmail.com
- GitHub: https://github.com/akshatmhjj
- LinkedIn: https://www.linkedin.com/in/akshatmhjj/
- Code Journey profile: https://www.codejourney.space/u/akshatmhjj

## Work experience

### MLock Innovations: Software Engineer (Sep 2026 – Present)
- Built 80+ REST endpoints across a multi-tenant IoT self-service platform: three Next.js and TypeScript apps on a Node.js, Express and PostgreSQL backend, architected end to end.
- Secured payments with server-side pricing, HMAC-verified Razorpay webhooks and idempotent capture, closing price-tampering and duplicate-charge paths across every checkout.
- Built a concurrency-safe device job queue with PostgreSQL row-level locking and real-time WebSocket status, backed by JWT/RBAC tenant isolation and 200+ automated tests.

### DigiValet: Software Engineer Intern, iOS (Jan 2026 – Jun 2026)
- Improved application stability by 25% by reproducing intermittent runtime failures and shipping root-cause fixes from performance profiling.
- Cut end-to-end API latency by 45% (800 ms to 440 ms) with Swift concurrency, request batching and caching.
- Cut partner integration time by 20% and code duplication by 30% with a modular client SDK using MVVM, dependency injection and reusable service layers.

### Itigai Technologies: Frontend Developer Intern (Aug 2025 – Oct 2025)
- Made page loads 25% faster (first contentful paint 3.2 s to 2.4 s) by restructuring React.js components with memoization and code splitting.
- Cut redundant API calls by 60% and backend load by 40% with centralized state management, API caching and request deduplication.
- Delivered under 500 ms response latency for a real-time WebSocket chatbot on an event-driven architecture, handling concurrent sessions.

## Education
- Shri Vaishnav Vidhyapeeth Vishwavidyalaya, Indore: B.Tech in Computer Science Engineering, Aug 2022 – Jun 2026
- St. Arnold's Senior Secondary School: schooling

## Skills
- Languages: TypeScript, JavaScript, Python, Swift, SQL
- Frontend and mobile: React.js, Next.js, Redux, SwiftUI, Tailwind CSS
- Backend and data: Node.js, Express.js, PostgreSQL, Redis, Docker, REST APIs, WebSocket, JWT, RBAC, multi-tenancy, Razorpay, webhooks, MongoDB, Supabase (pgvector), caching, rate limiting, structured logging
- AI and LLMs: RAG, vector search, LLM APIs, Ollama, evaluation harnesses, Chroma, embeddings, tool calling, structured outputs
- Tools and platforms: Git/GitHub, Xcode, VS Code, Docker, CI/CD, Postman, Vercel, Render, AWS S3, Jest, GitHub Actions, Supertest

## Certifications
- RDBMS [IBM]
- Microservices architecture and implementation [IBM]
- Introduction to Python [IBM]
- Java Fundamentals [IBM]
- Cloud Application Developer [IBM]
- Data Science 101 [IBM]
- Reactive Architecture: Reactive Microservices [Cognitive Class]

## Projects

### Code Journey (2026)
A free, role-based map for tech careers. Pick a role and see exactly which skills it needs, in order, with the best official docs and free resources for each. It curates, it doesn't teach.
- Stack: Next.js, TypeScript, Supabase (Postgres + pgvector), Gemini, Tailwind CSS
- 10 launch roles (Frontend, Backend, Full-Stack, Cross-platform Mobile, Data Analyst, Data Scientist, AI Engineer, ML Engineer, DevOps, QA/SDET), about 100 ordered skills
- CJ AI: a retrieval-augmented chatbot grounded in the site's own content (900+ indexed passages), with hybrid vector and keyword search and streamed, cited answers
- Also has a personal dashboard to track skill progress and a "compass" quiz that ranks roles by fit
- Live: https://www.codejourney.space/

### Grounded (2026)
A fully local document chatbot that answers only from your own files, cites every fact, and refuses when the documents don't cover the question. Open source.
- Stack: Python, Ollama (llama3.2, nomic-embed-text), ChromaDB, Streamlit, RAG. Runs fully locally with no API keys.
- Results on a 14-question evaluation set that includes unanswerable questions: 100% retrieval hit rate, 90% required-fact accuracy, 92.9% correct refusals
- Two-guard refusal: a cosine-similarity threshold before the model call, plus a grounding prompt with an exact refusal sentence
- Heading-aware chunking, per-page PDF ingestion so citations carry file and page, JSONL logging, an evaluation harness that scores retrieval and generation separately
- Source: https://github.com/akshatmhjj/basic-rag-chatbot

### Shortify (2026)
A full-stack URL shortener and link management platform with fast redirects and analytics.
- Stack: React and Vite, Node.js, Express, PostgreSQL, Redis, Docker, GitHub Actions, Vercel
- 56B+ collision-free short codes (PostgreSQL atomic counter with Base62 encoding), about 90% less database load from a cache-aside Redis strategy, redirects under 100 ms under load
- Non-blocking click analytics, Google OAuth, rate limiting, structured logging, request ID tracing, multi-stage Docker builds
- Live: https://url-shortener-navy-eta.vercel.app/

### Predictye (2025)
A free tool that shows what an item you own is worth now and could be worth later, as a range rather than a single guess. Upload a photo and add a few details. No signup needed.
- Stack: machine learning, REST API, caching
- p95 prediction latency under 200 ms, 40% less computational overhead, 75% prediction accuracy
- Grew into five tools: Value, Property, Rent (rent vs buy), Buy smart (is the price fair) and Plan (when to sell or hold)
- Live: https://www.predictye.com/
