export type ProjectData = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  link: string;
  source: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  year: number;
};

export type SocialLink = { name: string; link: string };

export type PersonData = {
  name: string;
  role: string;
  email: string;
  location: string;
  languages: string[];
  avatar: string;
};

export type AboutData = {
  experience: { company: string; role: string; timeframe: string; achievements: React.ReactNode[] }[];
  skills: { title: string; tags: string[] }[];
  education: { name: string; description: React.ReactNode }[];
  certifications: { name: string; link: string }[];
};

export type SiteProps = {
  person: PersonData;
  social: SocialLink[];
  projects: ProjectData[];
  resumeHref: string;
  about: AboutData;
};
