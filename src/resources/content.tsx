import { About, Blog, Gallery, Newsletter, Person, Social, Work } from "@/types";
// `Home` and the Once UI helpers were previously used by the
// now-commented-out `home` object; keeping the imports could trigger
// unused‑symbol warnings so they've been removed. Re-add if you bring
// `home` back.

const person: Person = {
  firstName: "Akshat",
  lastName: "Mahajan",
  name: `Akshat Mahajan`,
  role: "Full Stack & iOS Engineer",
  avatar: "/images/avatar.jpg",
  email: "akshatmahajan32@gmail.com",
  location: "Indore, India",
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
    link: "https://www.linkedin.com/in/akshat-mahajan-601a5a223/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/akshatmahjn/",
    essential: true,
  },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  //   essential: false,
  // },
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
  title: `About – ${person.name}`,
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
        I build full-stack web applications and iOS products with a focus on performance, maintainability, and clear user experience. My recent work has centered on scaling frontend systems, reducing API latency, improving app stability, and shipping reliable features with measurable impact.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "DigiValet",
        timeframe: "Jan 2026 - Jun 2026",
        role: "iOS Software Engineer",
        achievements: [
          <>
            Architected a modular iOS SDK using MVVM and dependency injection, creating a reusable foundation for 5+ production screens and reducing feature integration time by 20%.
          </>,
          <>
            Reduced API latency by 45% (800 ms to 440 ms) through async/await networking, request batching, and intelligent caching.
          </>,
          <>
            Improved app stability by 25% (0.8% to 0.6% crash rate) through memory leak fixes, retain cycle elimination, and state management improvements.
          </>,
          <>
            Built a reusable SwiftUI component library with 15+ components to standardize UI patterns and accelerate feature delivery.
          </>,
        ],
        images: [],
      },
      {
        company: "Itigai Technologies",
        timeframe: "Aug 2025 - Oct 2025",
        role: "Frontend Software Engineer",
        achievements: [
          <>
            Led frontend performance optimization that reduced initial page load time by 25% (FCP 3.2 s to 2.4 s) through component restructuring, render tuning, and React memoization.
          </>,
          <>
            Built a real-time chatbot interface that handled concurrent sessions with under 500 ms latency using WebSocket-based state synchronization.
          </>,
          <>
            Implemented Redux-based state management and memoization patterns that reduced redundant API calls by 60% and supported horizontal scaling for the frontend.
          </>,
          <>
            Worked across frontend and backend integration to ship responsive, production-ready interfaces for a live product experience.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Shree Vaishnav Vidhyapeeth Vishwavidyalaya",
        description: <>Bachelor Of Technology [CSE IBM-FSDB]</>,
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
        description: (
          <>Core languages used for frontend, backend, and mobile development.</>
        ),
        tags: [
          { name: "Swift", icon: "" },
          { name: "JavaScript", icon: "" },
          { name: "TypeScript", icon: "" },
          { name: "HTML", icon: "" },
          { name: "CSS", icon: "" },
          { name: "SQL", icon: "" },
          { name: "C", icon: "" },
        ],
        images: [],
      },
      {
        title: "Frameworks & Libraries",
        description: (
          <>Modern tools used to build responsive web and iOS applications.</>
        ),
        tags: [
          { name: "React.js", icon: "" },
          { name: "Redux", icon: "" },
          { name: "Node.js", icon: "" },
          { name: "Express.js", icon: "" },
          { name: "SwiftUI", icon: "" },
          { name: "UIKit", icon: "" },
          { name: "Tailwind CSS", icon: "" },
          { name: "MongoDB", icon: "" },
        ],
        images: [],
      },
      {
        title: "Tools & Platforms",
        description: (
          <>Development, deployment, and collaboration tools used in delivery.</>
        ),
        tags: [
          { name: "Git / GitHub", icon: "" },
          { name: "Xcode", icon: "" },
          { name: "VS Code", icon: "" },
          { name: "Docker", icon: "" },
          { name: "CI / CD", icon: "" },
          { name: "Postman", icon: "" },
          { name: "Vercel", icon: "" },
          { name: "Render", icon: "" },
        ],
        images: [],
      },
      {
        title: "Core Concepts",
        description: (
          <>Practices and architectural patterns applied across product and platform work.</>
        ),
        tags: [
          { name: "System Design", icon: "" },
          { name: "REST APIs", icon: "" },
          { name: "MVVM", icon: "" },
          { name: "Performance Optimization", icon: "" },
          { name: "Caching Strategies", icon: "" },
          { name: "Responsive Design", icon: "" },
          { name: "State Management", icon: "" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects by ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, about, blog, work, gallery };
