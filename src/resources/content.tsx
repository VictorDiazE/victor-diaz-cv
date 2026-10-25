import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Víctor",
  lastName: "Díaz Egurbide",
  name: "Víctor Díaz Egurbide",
  role: "Senior Full-Stack Engineer",
  avatar: "/images/avatar.jpg",
  email: "hi@vdiaz.dev",
  location: "Europe/Madrid", // IANA time zone, used for the local-time badge
  languages: ["Spanish", "English"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s newsletter</>,
  description: <>Notes on commerce engineering, cloud integrations and AI-assisted delivery</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/VictorDiazE",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/victor-diaz-egurbide",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: `/api/og/generate?title=${encodeURIComponent("Víctor Díaz Egurbide — Senior Full-Stack Engineer")}`,
  label: "Home",
  title: `${person.name} — ${person.role}`,
  description:
    "Senior Full-Stack Engineer in Barcelona. Python and AWS integrations, Shopify Plus, React/Next.js — production systems owned end to end.",
  headline: <>Production systems, owned end to end</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Python · AWS</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured case study
        </Text>
      </Row>
    ),
    href: "/work/multi-market-catalog-integrations",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()} and tech lead in Barcelona. I design and
      ship commerce platforms for enterprise brands — from{" "}
      <Text as="span" size="xl" weight="strong">
        Python/AWS
      </Text>{" "}
      data pipelines to Shopify Plus and React storefronts.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Barcelona`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a Barcelona-based full-stack engineer with 8+ years designing and owning production
        systems end to end. My work sits where commerce meets infrastructure: Python services on
        AWS that move catalog data across markets and languages, and the Shopify Plus and React
        front ends that sell it. I lead technical decisions across 30+ production projects for
        enterprise brands in the EU and MENA, and I hold a postgraduate degree in Artificial
        Intelligence with Deep Learning from UPC.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Rocket Digital",
        timeframe: "2021 – Present",
        role: "Senior Full-Stack Engineer / Tech Lead",
        achievements: [
          <>
            Architected and led 5 enterprise-scale system integrations — Python on AWS Lambda with
            SQS-based catalog and data processing pipelines — handling high-volume, multi-market,
            multi-language data flows in production.
          </>,
          <>
            Technical lead on 30+ production systems for enterprise brands across the EU and MENA,
            owning architecture decisions from cloud infrastructure to front-end delivery.
          </>,
          <>
            Own CI/CD pipelines (GitHub Actions), technical standards and code quality across the
            team's project base.
          </>,
          <>
            Built full-stack applications with React, Next.js and TypeScript on Node.js and Python
            back ends, including custom logic on transactional and payment flows.
          </>,
          <>
            Introduced AI-assisted engineering workflows (Cursor, MCP, n8n) into delivery, reducing
            repetitive engineering time across the team.
          </>,
        ],
        images: [],
      },
      {
        company: "Factoria Creativa",
        timeframe: "2021",
        role: "PHP Full Stack Developer",
        achievements: [
          <>Developed e-commerce sites, custom themes and plugins from scratch.</>,
          <>Owned client communication and project management through delivery.</>,
        ],
        images: [],
      },
      {
        company: "Slice Group",
        timeframe: "2017 – 2019",
        role: "PHP Developer",
        achievements: [
          <>Implemented and assessed technical SEO best practices across client sites.</>,
          <>
            Diagnosed and resolved platform issues, integrating new solutions into existing systems.
          </>,
          <>Developed WordPress sites, themes and plugins.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "UPC School — Universitat Politècnica de Catalunya",
        description: <>Postgraduate in Artificial Intelligence with Deep Learning (2024 – 2025).</>,
      },
      {
        name: "Universidad de Falcón",
        description: <>Electronic Engineering, Telecommunications (2015 – 2019).</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Backend & Cloud",
        description: (
          <>
            Python and Node.js services on AWS Lambda and SQS, FastAPI, Docker, REST and GraphQL
            APIs, CI/CD with GitHub Actions.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "AWS", icon: "aws" },
          { name: "Node.js", icon: "nodejs" },
          { name: "Docker", icon: "docker" },
        ],
        images: [],
      },
      {
        title: "Commerce platforms",
        description: (
          <>
            Shopify Plus end to end: Liquid, Checkout UI Extensions, Shopify Functions, Admin and
            Storefront APIs, and Hydrogen for headless builds.
          </>
        ),
        tags: [{ name: "Shopify Plus", icon: "shopify" }],
        images: [],
      },
      {
        title: "Frontend",
        description: <>React, Next.js and TypeScript, from headless storefronts to internal tools.</>,
        tags: [
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "TypeScript", icon: "typescript" },
        ],
        images: [],
      },
      {
        title: "AI & automation",
        description: (
          <>
            LangChain and PyTorch, plus AI-assisted engineering with Cursor, MCP and n8n in daily
            production delivery.
          </>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about engineering",
  description: `Notes and write-ups by ${person.name}`,
  // Add .mdx files to src/app/blog/posts and enable "/blog" in once-ui.config.ts
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Engineering projects and case studies by ${person.name}`,
  // Each .mdx file in src/app/work/projects becomes a project page
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
