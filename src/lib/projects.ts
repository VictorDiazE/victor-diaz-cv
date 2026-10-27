import type { Lang } from "./i18n";

type T = Record<Lang, string>;

export type DiagramNode = { id: string; label: string; x: number; y: number; accent?: boolean };
export type MiniRow = { label: string; accent?: boolean }[];

export type Step = {
  /** Diagram node ids lit while this section is on screen. */
  highlight: string[];
  title: T;
  body: T;
};

export type Project = {
  slug: string;
  title: T;
  kicker: T;
  summary: T;
  tags: string[];
  /** Card visual: a screenshot or a small flow diagram. */
  visual: { kind: "shot"; src: string; alt: T } | { kind: "flow"; rows: MiniRow[]; aria: T };
  featured?: boolean;
  link?: string;
  caseStudy?: {
    role: T;
    context: T;
    scope: T;
    lede: T;
    nodes: DiagramNode[];
    edges: [string, string][];
    steps: Step[];
  };
};

export const projects: Project[] = [
  {
    slug: "catalog-integrations",
    featured: true,
    title: { en: "Multi-market catalog integrations", es: "Integraciones de catálogo multimercado" },
    kicker: { en: "Case study · Python on AWS", es: "Case study · Python en AWS" },
    summary: {
      en: "Five enterprise integrations in Python on Lambda, decoupled with SQS so catalog bursts never block the stores.",
      es: "Cinco integraciones enterprise en Python sobre Lambda, desacopladas con SQS para que los picos de catálogo nunca bloqueen las tiendas.",
    },
    tags: ["Python", "AWS Lambda", "SQS", "GitHub Actions"],
    visual: {
      kind: "flow",
      rows: [[{ label: "feeds" }, { label: "λ ingest" }, { label: "sqs" }, { label: "λ workers" }, { label: "stores", accent: true }]],
      aria: { en: "Feeds to ingest Lambda to SQS to worker Lambdas to stores", es: "Feeds a Lambda de ingesta, a SQS, a Lambdas worker y a las tiendas" },
    },
    caseStudy: {
      role: { en: "Architect and tech lead", es: "Arquitecto y tech lead" },
      context: { en: "Rocket Digital, enterprise clients", es: "Rocket Digital, clientes enterprise" },
      scope: { en: "5 integrations · EU and MENA", es: "5 integraciones · EU y MENA" },
      lede: {
        en: "Five enterprise integrations built in Python on AWS Lambda, with SQS-based pipelines processing high-volume catalog data across markets and languages.",
        es: "Cinco integraciones enterprise construidas en Python sobre AWS Lambda, con pipelines basados en SQS que procesan catálogos de alto volumen en varios mercados e idiomas.",
      },
      nodes: [
        { id: "feeds", label: "feeds", x: 70, y: 150 },
        { id: "ingest", label: "λ ingest", x: 210, y: 150 },
        { id: "sqs", label: "sqs", x: 350, y: 150 },
        { id: "w1", label: "λ w1", x: 490, y: 80 },
        { id: "w2", label: "λ w2", x: 490, y: 150 },
        { id: "w3", label: "λ w3", x: 490, y: 220 },
        { id: "eu", label: "eu", x: 620, y: 110, accent: true },
        { id: "mena", label: "mena", x: 620, y: 190, accent: true },
      ],
      edges: [
        ["feeds", "ingest"],
        ["ingest", "sqs"],
        ["sqs", "w1"],
        ["sqs", "w2"],
        ["sqs", "w3"],
        ["w1", "eu"],
        ["w2", "eu"],
        ["w2", "mena"],
        ["w3", "mena"],
      ],
      steps: [
        {
          highlight: ["feeds", "ingest"],
          title: { en: "The problem", es: "El problema" },
          body: {
            en: "Enterprise catalogs don't arrive clean or on schedule. Data comes in bursts, has to be transformed differently per market and language, and one failure can't block everything else. A script that does everything in one pass works for a single store and breaks the moment you add markets.",
            es: "Los catálogos enterprise no llegan limpios ni a su hora. Los datos entran a picos, hay que transformarlos distinto por mercado e idioma, y un fallo no puede bloquear todo lo demás. Un script que lo hace todo de una pasada funciona para una tienda y se rompe en cuanto añades mercados.",
          },
        },
        {
          highlight: ["sqs"],
          title: { en: "The decision", es: "La decisión" },
          body: {
            en: "Split ingest from processing with a queue. SQS absorbs bursts instead of overloading the stores, and a failed message is retried on its own without re-running the whole load.",
            es: "Separar la ingesta del procesado con una cola. SQS absorbe los picos en lugar de saturar las tiendas, y un mensaje fallido se reintenta solo, sin volver a lanzar toda la carga.",
          },
        },
        {
          highlight: ["w1", "w2", "w3"],
          title: { en: "Small workers, one job each", es: "Workers pequeños, un trabajo cada uno" },
          body: {
            en: "Workers stay small: each takes one message, applies the market and language mapping, and writes it out. Scaling is adding workers, not rewriting the pipeline.",
            es: "Los workers son pequeños: cada uno toma un mensaje, aplica el mapeo de mercado e idioma y lo escribe. Escalar es añadir workers, no reescribir el pipeline.",
          },
        },
        {
          highlight: ["eu", "mena"],
          title: { en: "One pattern, five integrations", es: "Un patrón, cinco integraciones" },
          body: {
            en: "The same architecture was reused across all five integrations for brands selling in the EU and MENA, which made them consistent to operate and faster to deliver.",
            es: "La misma arquitectura se reutilizó en las cinco integraciones para marcas que venden en EU y MENA, lo que las hizo coherentes de operar y más rápidas de entregar.",
          },
        },
        {
          highlight: ["feeds", "ingest", "sqs", "w1", "w2", "w3", "eu", "mena"],
          title: { en: "My role", es: "Mi rol" },
          body: {
            en: "I owned the architecture and the technical decisions, led delivery from design to production including CI/CD with GitHub Actions, and set the standards the team followed when extending the pipelines.",
            es: "Fui responsable de la arquitectura y las decisiones técnicas, lideré la entrega desde el diseño hasta producción, incluido el CI/CD con GitHub Actions, y definí los estándares que siguió el equipo al ampliar los pipelines.",
          },
        },
      ],
    },
  },
  {
    slug: "holafly-b2b",
    title: { en: "Holafly B2B", es: "Holafly B2B" },
    kicker: { en: "Headless · B2B", es: "Headless · B2B" },
    summary: {
      en: "Headless B2B storefront built on Shopify Hydrogen and deployed to Oxygen with CI.",
      es: "Storefront B2B headless construido con Shopify Hydrogen y desplegado en Oxygen con CI.",
    },
    tags: ["Hydrogen", "Oxygen", "React", "GitHub Actions"],
    visual: {
      kind: "flow",
      rows: [
        [{ label: "github" }, { label: "ci" }, { label: "oxygen", accent: true }],
        [{ label: "b2b buyer" }, { label: "hydrogen", accent: true }, { label: "storefront api" }],
      ],
      aria: {
        en: "Code goes from GitHub through CI to Oxygen; B2B buyers reach the Hydrogen storefront, which reads the Storefront API",
        es: "El código va de GitHub por CI a Oxygen; los compradores B2B llegan al storefront Hydrogen, que lee la Storefront API",
      },
    },
    caseStudy: {
      role: { en: "Full-stack engineer", es: "Ingeniero full-stack" },
      context: { en: "Rocket Digital, for Holafly", es: "Rocket Digital, para Holafly" },
      scope: { en: "B2B headless storefront", es: "Storefront B2B headless" },
      lede: {
        en: "A B2B storefront for Holafly built headless on Shopify Hydrogen, with automated deploys to Oxygen.",
        es: "Un storefront B2B para Holafly construido en headless con Shopify Hydrogen y despliegues automáticos a Oxygen.",
      },
      nodes: [
        { id: "github", label: "github", x: 90, y: 90 },
        { id: "ci", label: "ci", x: 300, y: 90 },
        { id: "oxygen", label: "oxygen", x: 510, y: 90, accent: true },
        { id: "buyer", label: "b2b buyer", x: 90, y: 210 },
        { id: "hydrogen", label: "hydrogen", x: 300, y: 210, accent: true },
        { id: "api", label: "storefront api", x: 510, y: 210 },
      ],
      edges: [
        ["github", "ci"],
        ["ci", "oxygen"],
        ["buyer", "hydrogen"],
        ["hydrogen", "api"],
      ],
      steps: [
        {
          highlight: ["buyer", "hydrogen", "api"],
          title: { en: "Headless on Hydrogen", es: "Headless con Hydrogen" },
          body: {
            en: "The storefront is a React app on Shopify Hydrogen that reads catalog data from the Storefront API, so the B2B experience isn't limited by a theme.",
            es: "El storefront es una app React sobre Shopify Hydrogen que lee el catálogo de la Storefront API, así la experiencia B2B no depende de un theme.",
          },
        },
        {
          highlight: ["github", "ci", "oxygen"],
          title: { en: "Deploys on every push", es: "Despliegue en cada push" },
          body: {
            en: "A GitHub Actions workflow builds each branch and deploys it to Oxygen, Shopify's hosting for Hydrogen, with a preview URL per pull request.",
            es: "Un workflow de GitHub Actions construye cada rama y la despliega en Oxygen, el hosting de Shopify para Hydrogen, con una URL de preview por pull request.",
          },
        },
      ],
    },
  },
  {
    slug: "logistics-app",
    title: { en: "Logistics app for Shopify", es: "App de logística para Shopify" },
    kicker: { en: "Shopify app · AWS", es: "App de Shopify · AWS" },
    summary: {
      en: "Public Shopify app for a logistics platform, with its back end deployed on AWS through CI.",
      es: "App pública de Shopify para una plataforma logística, con su back end desplegado en AWS mediante CI.",
    },
    tags: ["Shopify App", "AWS", "CI"],
    visual: {
      kind: "flow",
      rows: [
        [{ label: "shopify" }, { label: "webhooks" }, { label: "app · aws", accent: true }],
        [{ label: "admin ui" }, { label: "app api", accent: true }, { label: "logistics api" }],
      ],
      aria: {
        en: "Shopify store events reach the app's back end on AWS through webhooks, and the app talks to the logistics platform",
        es: "Los eventos de la tienda Shopify llegan al back end de la app en AWS por webhooks, y la app habla con la plataforma logística",
      },
    },
  },
  {
    slug: "gobik",
    title: { en: "Gobik", es: "Gobik" },
    kicker: { en: "Shopify Plus · theme", es: "Shopify Plus · theme" },
    summary: { en: "Storefront for a performance cycling apparel brand.", es: "Storefront para una marca de ropa técnica de ciclismo." },
    tags: ["Shopify", "Liquid"],
    visual: { kind: "shot", src: "/images/projects/gobik.webp", alt: { en: "Gobik storefront home page", es: "Home del storefront de Gobik" } },
    link: "https://gobik.com/",
  },
  {
    slug: "scalpers",
    title: { en: "Scalpers", es: "Scalpers" },
    kicker: { en: "Shopify Plus · theme", es: "Shopify Plus · theme" },
    summary: { en: "Theme work and GraphQL integrations for a Spanish fashion brand.", es: "Theme e integraciones GraphQL para una marca española de moda." },
    tags: ["Shopify", "GraphQL"],
    visual: { kind: "shot", src: "/images/projects/scalpers.webp", alt: { en: "Scalpers storefront home page", es: "Home del storefront de Scalpers" } },
    link: "https://scalperscompany.com/",
  },
  {
    slug: "outletpc",
    title: { en: "OutletPC", es: "OutletPC" },
    kicker: { en: "Headless · React", es: "Headless · React" },
    summary: { en: "React front end on top of Shopify, connected through GraphQL.", es: "Front end en React sobre Shopify, conectado por GraphQL." },
    tags: ["React", "Shopify"],
    visual: { kind: "shot", src: "/images/projects/outletpc.webp", alt: { en: "OutletPC storefront home page", es: "Home del storefront de OutletPC" } },
    link: "https://outlet-pc.com/",
  },
];

export const caseStudies = projects.filter((p) => p.caseStudy);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
