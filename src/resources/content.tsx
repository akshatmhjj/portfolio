import { About, Blog, Gallery, Newsletter, Person, Social, Work } from "@/types";
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
        Full Stack and iOS Developer specializing in building scalable, high-performance web and mobile applications. With expertise in React, Node.js, Express, MongoDB, Swift, and UIKit, helps delivering clean architecture, efficient backend systems, and intuitive user experiences. Approach combines strong technical execution with a focus on usability, performance, and maintainable code.
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
        role: "iOS Application Developer Intern",
        achievements: [
          <>
          Delivered production-ready iOS features using Swift, UIKit, and SwiftUI, focusing on scalability, maintainability, and high-quality user experience.          </>,
          <>
          Designed reusable UI components and shared utilities that accelerated feature development while ensuring consistency across multiple application modules.
          </>,
          <>
          Integrated networking layers and backend APIs to support dynamic content, asynchronous data loading, and responsive user interactions.
          </>,
          <>
          Improved application reliability by debugging complex UI and lifecycle issues, optimizing existing implementations, and reducing technical debt through systematic refactoring.
          </>,
          <>
          Worked within an Agile team, collaborating with product managers, designers, QA, and senior engineers to ship customer-facing enhancements on schedule.</>,
          <>
          Adopted modern iOS architectural patterns (MVVM) and clean coding practices through code reviews, technical discussions, and continuous learning.
          </>,
        ],
        images: [],
      },
      {
        company: "Itigai Technologies",
        timeframe: "Aug 2025 - Oct 2025",
        role: "Frontend Software Developer Intern",
        achievements: [
          <>
            Developed responsive web applications using React.js, Node.js, Express.js, and MongoDB, delivering scalable and user-centric solutions.
          </>,
          <>
            Built reusable UI components and modular architecture, improving development efficiency and long-term maintainability.
          </>,
          <>
            Integrated RESTful APIs and machine learning services to develop a real-time resale price prediction chatbot.
          </>,
          <>
            Enhanced application performance through optimized rendering, efficient state management, and responsive design practices.
          </>,
          <>
            Collaborated with designers and backend developers to deliver intuitive, production-ready user interfaces.
          </>,
          <>
            Developed and deployed WordPress websites by customizing themes, plugins, and backend configurations.
          </>,
          <>
            Maintained code quality through Git-based version control, collaborative workflows, and clean coding practices.
          </>
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
          <>Proficient in modern programming and markup languages for full-stack and application development.</>
        ),
        tags: [
          { name: "HTML", icon: "" },
          { name: "JSX", icon: "" },
          { name: "JavaScript", icon: "" },
          { name: "CSS", icon: "" },
          { name: "SCSS", icon: "" },
          { name: "C", icon: "" },
          { name: "SQL", icon: "" },
          { name: "Swift", icon: "" },
        ],
        images: [],
      },
      {
        title: "Frameworks & Libraries",
        description: (
          <>Building scalable web applications using modern frontend and backend frameworks.</>
        ),
        tags: [
          { name: "React", icon: "" },
          { name: "Node.js", icon: "" },
          { name: "Express.js", icon: "" },
          { name: "Tailwind CSS", icon: "" },
          { name: "MongoDB", icon: "" },
          { name: "Mongoose", icon: "" },
          { name: "UIKit", icon: "" },
          { name: "Swift UI", icon: "" },
        ],
        images: [],
      },
      {
        title: "Tools & Platforms",
        description: (
          <>Experienced with development, deployment, and version control tools for efficient workflows.</>
        ),
        tags: [
          { name: "Vercel", icon: "" },
          { name: "Git", icon: "" },
          { name: "npm", icon: "" },
          { name: "Node", icon: "" },
          { name: "VS Code", icon: "" },
          { name: "Postman", icon: "" },
          { name: "Figma", icon: "" },
          { name: "Render", icon: "" },
          { name: "XCode", icon: "" },
          { name: "AntiGravity", icon:"" }
        ],
        images: [],
      },
      {
        title: "Core Concepts",
        description: (
          <>Strong understanding of software development principles and system design fundamentals.</>
        ),
        tags: [
          { name: "RESTful APIs", icon: "" },
          { name: "Responsive Design", icon: "" },
          { name: "UI/UX", icon: "" },
          { name: "State Management", icon: "" },
          { name: "Data Structures & Algorithms", icon: "" },
          { name: "MVVM", icon: "" }
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
