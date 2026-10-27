/**
 * The closed context the "Ask my portfolio" agent answers from.
 * Only facts that appear in the CV or on this site. Nothing else.
 */
export type Source = { id: string; title: string; path: string };

export const SOURCES: Source[] = [
  { id: "summary", title: "Profile summary", path: "/#about" },
  { id: "rocket", title: "Rocket Digital (2021 – now)", path: "/#about" },
  { id: "earlier", title: "Earlier roles", path: "/#about" },
  { id: "stack", title: "Technical stack", path: "/#about" },
  { id: "education", title: "Education", path: "/#about" },
  { id: "ai", title: "AI in how I build", path: "/#ai" },
  { id: "catalog", title: "Case study: multi-market catalog integrations", path: "/work/catalog-integrations" },
  { id: "holafly", title: "Case study: Holafly B2B on Hydrogen", path: "/work/holafly-b2b" },
  { id: "projects", title: "Selected work", path: "/#work" },
];

export const KNOWLEDGE = `
[summary]
Víctor Díaz Egurbide is a Senior Full-Stack Engineer based in Barcelona, Spain, with 8+ years designing and owning production systems end to end. Particular depth in Python backend architecture and cloud integrations at enterprise scale. Postgraduate in Artificial Intelligence with Deep Learning (UPC School). Languages: Spanish (native), English (professional working proficiency). Open to Tech Lead, Solutions Architect and senior product engineering roles. Contact: hi@vdiaz.dev.

[rocket]
Senior Full-Stack Engineer / Tech Lead at Rocket Digital, Barcelona (a Shopify Premier Partner agency), 2021 to present.
- Architected and led 5 enterprise-scale system integrations in Python on AWS Lambda, with catalog and data processing pipelines via SQS, handling high-volume, multi-market, multi-language data flows in production.
- Technical lead on 30+ production systems for enterprise brands across the EU and MENA, owning architecture decisions end to end, from cloud infrastructure to front-end delivery.
- Owns CI/CD pipelines (GitHub Actions), technical standards and code quality across the engineering team's project base.
- Built full-stack applications with React, Next.js and TypeScript on the front end and Node.js and Python back ends, including custom logic on transactional and payment flows.
- Introduced AI-assisted engineering workflows (Cursor, MCP, n8n) into the delivery process, reducing repetitive engineering time across the team.

[earlier]
- PHP Full Stack Developer at Factoria Creativa, Barcelona (2021): e-commerce sites, custom themes and plugins from scratch; client communication and project management through delivery.
- PHP Developer at Slice Group, Venezuela (2017 – 2019): technical SEO, diagnosing and resolving platform issues, WordPress sites, themes and plugins.

[stack]
Backend and cloud: Python, FastAPI, Node.js, AWS Lambda, SQS, Docker, CI/CD with GitHub Actions, REST, GraphQL.
Frontend: React, Next.js, TypeScript, Shopify Hydrogen.
AI and automation: LangChain, PyTorch, Cursor, MCP, n8n.
E-commerce: Shopify Plus, Liquid, Checkout UI Extensions, Shopify Functions.
Growth: GA4, GTM, technical SEO.

[education]
- Postgraduate in Artificial Intelligence with Deep Learning, UPC School (Universitat Politècnica de Catalunya), 2024 – 2025, grade 8.1/10.
- Electronic Engineering, Telecommunications, Universidad de Falcón, 2015 – 2019.

[ai]
Uses AI in daily engineering: Cursor, MCP and n8n workflows introduced into the team's delivery process. Postgraduate in AI with Deep Learning, hands-on with PyTorch and LangChain. This website's "Ask my portfolio" agent is a small closed-context agent built by Víctor: it answers only from his CV and case studies, is rate-limited, and always cites sources.

[catalog]
Case study: multi-market catalog integrations. Five enterprise integrations in Python on AWS Lambda for brands selling in the EU and MENA. Problem: catalog data arrives in bursts and must be transformed per market and language; one failure must not block the rest. Decision: separate ingest from processing with an SQS queue that absorbs bursts and retries failed messages individually. Small worker Lambdas each take one message and apply the market and language mapping. The same pattern was reused across all five integrations. Role: owned the architecture and technical decisions, led delivery to production including CI/CD with GitHub Actions, and set the team's standards for extending the pipelines.

[holafly]
Case study: Holafly B2B. A headless B2B storefront for Holafly built on Shopify Hydrogen (React), reading catalog data from the Storefront API, deployed to Oxygen (Shopify's Hydrogen hosting) through a GitHub Actions workflow with preview deployments.

[projects]
Other selected work at Rocket Digital: a public Shopify app for a logistics platform with its back end deployed on AWS through CI; Shopify Plus storefront work for Gobik (cycling apparel) and Scalpers (fashion), including Liquid themes and GraphQL integrations; a React front end on Shopify for OutletPC.
`.trim();
