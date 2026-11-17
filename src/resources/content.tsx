import { About, Newsletter, Person, Social, Work } from "@/types";
// `Home` and the Once UI helpers were previously used by the
// now-commented-out `home` object; keeping the imports could trigger
// unused‑symbol warnings so they've been removed. Re-add if you bring
// `home` back.

const person: Person = {
  firstName: "Akshat",
  lastName: "Mahajan",
  name: `Akshat Mahajan`,
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "akshatmahajan32@gmail.com",
  location: "Bengaluru, India",
  languages: ["Hindi", "English", "French"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/akshatmhjj",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/akshatmhjj/",
    essential: true,
  },
  // {
  //   name: "Instagram",
  //   icon: "instagram",
  //   link: "https://www.instagram.com/akshatmahjn/",
  //   essential: true,
  // },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  //   essential: false,
  // },
  {
    name: "Code Journey",
    icon: "codeJourney",
    link: "https://www.codejourney.space/u/akshatmhjj",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

// the `home` object is no longer used anywhere in the project; it was
// previously exported from this file but we switched to using the about
// page as the primary entrypoint. the definition is retained below in case
// you want to re-enable it later.
/*
const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
    I'm Selene, a design engineer at <Text as="span" size="xl" weight="strong">ONCE UI</Text>, where I craft intuitive <br /> user experiences. After hours, I build my own projects.
</>
  ),
};
*/

const about: About = {
  path: "/",
  label: "About",
  title: `${person.name} – ${person.role}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <strong>Open to full-time roles and relocation.</strong>
        <br />
        <br />
        I build fast, secure web and iOS products, plus grounded AI tools. Currently a Software
        Engineer at MLock Innovations.
      </>
    ),
  },
  impact: {
    display: true,
    items: [
      {
        value: "45%",
        label: "lower API latency at DigiValet",
      },
      {
        value: "200+",
        label: "automated tests at MLock Innovations",
      },
      {
        value: "10",
        label: "career roles mapped on Code Journey",
        href: "/work/code-journey",
      },
      {
        value: "92.9%",
        label: "correct refusals on unanswerable questions in Grounded",
        href: "/work/rag-chatbot",
      },
    ],
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "MLock Innovations",
        timeframe: "Sep 2026 - Present",
        role: "Software Engineer",
        achievements: [
          <>
            <strong>80+ REST endpoints</strong> across a multi-tenant IoT self-service platform: three Next.js and TypeScript apps on a Node.js, Express and PostgreSQL backend, architected end to end.
          </>,
          <>
            <strong>Secured payments</strong> with server-side pricing, HMAC-verified Razorpay webhooks and idempotent capture, closing price-tampering and duplicate-charge paths across every checkout.
          </>,
          <>
            <strong>Concurrency-safe device job queue</strong> with PostgreSQL row-level locking and real-time WebSocket status, backed by JWT/RBAC tenant isolation and <strong>200+ automated tests</strong>.
          </>,
        ],
        images: [],
      },
      {
        company: "DigiValet",
        timeframe: "Jan 2026 - Jun 2026",
        role: "Software Engineer Intern",
        achievements: [
          <>
            <strong>25% better application stability</strong> by reproducing intermittent runtime failures and shipping root-cause fixes from performance profiling.
          </>,
          <>
            <strong>45% lower end-to-end API latency</strong> (800 ms to 440 ms) with Swift concurrency, request batching and caching.
          </>,
          <>
            <strong>20% faster partner integration</strong> and <strong>30% less code duplication</strong> from a modular client SDK with MVVM, dependency injection and reusable service layers.
          </>,
        ],
        images: [],
      },
      {
        company: "Itigai Technologies",
        timeframe: "Aug 2025 - Oct 2025",
        role: "Frontend Developer Intern",
        achievements: [
          <>
            <strong>25% faster page loads</strong> (FCP 3.2 s to 2.4 s) by restructuring React.js components with memoization and code splitting.
          </>,
          <>
            <strong>60% fewer redundant API calls</strong> and <strong>40% lower backend load</strong> with centralized state management, API caching and request deduplication.
          </>,
          <>
            <strong>Under 500 ms</strong> response latency for a real-time WebSocket chatbot on an event-driven architecture, handling concurrent sessions.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Shri Vaishnav Vidhyapeeth Vishwavidyalaya, Indore",
        description: <>B.Tech in Computer Science Engineering, Aug 2022 – Jun 2026</>,
      },
      {
        name: "St. Arnold's Senior Secondary School",
        description: <>Schooling</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Languages",
        tags: [
          { name: "TypeScript", icon: "" },
          { name: "JavaScript", icon: "" },
          { name: "Python", icon: "" },
          { name: "Swift", icon: "" },
          { name: "SQL", icon: "" },
        ],
        images: [],
      },
      {
        title: "Frontend & Mobile",
        tags: [
          { name: "React.js", icon: "" },
          { name: "Next.js", icon: "" },
          { name: "Redux", icon: "" },
          { name: "SwiftUI", icon: "" },
          { name: "Tailwind CSS", icon: "" },
        ],
        images: [],
      },
      {
        title: "Backend & Data",
        tags: [
          { name: "Node.js", icon: "" },
          { name: "Express.js", icon: "" },
          { name: "PostgreSQL", icon: "" },
          { name: "Redis", icon: "" },
          { name: "Docker", icon: "" },
          { name: "REST APIs", icon: "" },
          { name: "WebSocket", icon: "" },
          { name: "JWT", icon: "" },
          { name: "RBAC", icon: "" },
          { name: "Multi-tenancy", icon: "" },
          { name: "Razorpay", icon: "" },
          { name: "Webhooks", icon: "" },
          { name: "MongoDB", icon: "" },
          { name: "Supabase (pgvector)", icon: "" },
          { name: "Caching", icon: "" },
          { name: "Rate limiting", icon: "" },
          { name: "Structured logging", icon: "" },
        ],
        images: [],
      },
      {
        title: "AI & LLMs",
        tags: [
          { name: "RAG", icon: "" },
          { name: "Vector Search", icon: "" },
          { name: "LLM APIs", icon: "" },
          { name: "Ollama", icon: "" },
          { name: "Evaluation Harnesses", icon: "" },
          { name: "Chroma", icon: "" },
          { name: "Embeddings", icon: "" },
          { name: "Tool calling", icon: "" },
          { name: "Structured outputs", icon: "" },
        ],
        images: [],
      },
      {
        title: "Tools & Platforms",
        tags: [
          { name: "Git / GitHub", icon: "" },
          { name: "Xcode", icon: "" },
          { name: "VS Code", icon: "" },
          { name: "Docker", icon: "" },
          { name: "CI / CD", icon: "" },
          { name: "Postman", icon: "" },
          { name: "Vercel", icon: "" },
          { name: "Render", icon: "" },
          { name: "AWS S3", icon: "" },
          { name: "Jest", icon: "" },
          { name: "GitHub Actions", icon: "" },
          { name: "Supertest", icon: "" },
        ],
        images: [],
      },
    ],
  },
  certifications: {
    display: true,
    title: "Certifications",
    items: [
      {
        name: "RDBMS [IBM]",
        link: "https://courses.svvv.skillsnetwork.site/certificates/c1af0898561045808fa96afb65744472",
      },
      {
        name: "Microservices architecture and implementation [IBM]",
        link: "https://courses.svvv.skillsnetwork.site/certificates/b8aa7f007cc74c8d93a710743657696c",
      },
      {
        name: "Introduction to Python [IBM]",
        link: "https://courses.svvv.skillsnetwork.site/certificates/a77891b4e4b0489caa1770ec2e15058d",
      },
      {
        name: "Java Fundamentals [IBM]",
        link: "https://courses.svvv.skillsnetwork.site/certificates/e1d30d7a294a4aa3b4065bb3ca0a4908",
      },
      {
        name: "Cloud Application Developer [IBM]",
        link: "https://courses.svvv.skillsnetwork.site/certificates/005762eaf3294695acae0b6595fe1b57",
      },
      {
        name: "Data Science 101 [IBM]",
        link: "https://courses.svvv.skillsnetwork.site/certificates/45a2df94eae547bb9c5654ba323d9245",
      },
      {
        name: "Reactive Architecture: Reactive Microservices [Cognitive Class]",
        link: "https://courses.cognitiveclass.ai/certificates/59017f74c71d44559b0440973a4cd80a",
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /work route
};

export { person, social, newsletter, about, work };