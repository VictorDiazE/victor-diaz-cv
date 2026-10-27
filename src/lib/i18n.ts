export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Path for a page in a language. English lives at the root. */
export function href(lang: Lang, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean;
  return clean === "/" ? "/es" : `/es${clean}`;
}

export const SITE_URL = "https://vdiaz.dev";
export const EMAIL = "hi@vdiaz.dev";
export const GITHUB = "https://github.com/VictorDiazE";
export const LINKEDIN = "https://www.linkedin.com/in/victor-diaz-egurbide";
export const CV_PDF = "/cv/victor-diaz-egurbide-cv.pdf";

const en = {
  meta: {
    title: "Víctor Díaz Egurbide — Senior Full-Stack Engineer",
    description:
      "Senior Full-Stack Engineer and tech lead in Barcelona. Python and AWS integrations, Shopify Plus, React and Next.js, and AI-assisted engineering.",
  },
  nav: { work: "Work", ai: "AI", about: "About", contact: "Contact", tldr: "Recruiter TL;DR", switchTo: "ES", switchLabel: "Ver en español" },
  hero: {
    kicker: ["Víctor Díaz Egurbide", "Senior Full-Stack Engineer", "Barcelona"],
    intro:
      "I design and ship commerce platforms for enterprise brands: Python and AWS data pipelines, Shopify Plus storefronts, and AI-assisted engineering that makes the team faster.",
    title: "Production systems, owned end to end.",
    ctaWork: "See the work",
    chipsAi: ["AI-assisted engineering", "Postgrad in AI · UPC"],
    chipStack: "Python · AWS · Shopify Plus",
  },
  pipeline: {
    label: "catalog-pipeline · interactive simulation",
    legendRaw: "raw item",
    legendEu: "eu",
    legendMena: "mena",
    burst: "Send a burst",
    breakWorker: "Break a worker",
    queued: "queued",
    processed: "processed",
    retries: "retries",
    down: "down",
    agent: "AI agent",
    agentTools: "cursor · mcp · n8n",
    idle: [
      "watching queue depth and worker health",
      "reviewing the last deploy via MCP",
      "n8n · deploy succeeded, team notified",
    ],
    onBurst: "burst detected · the queue absorbs it",
    onBreak: "{w} failed · its message goes back to the queue",
    onRecover: "{w} recovered · draining the backlog",
    aria:
      "Interactive simulation of a catalog pipeline: feeds enter an ingest Lambda, wait in an SQS queue, are processed by three worker Lambdas that map each item to its market, and reach EU or MENA stores. You can send a burst of items or break a worker to see the queue absorb load and retry failed messages.",
    reduced: "Animation is paused because your system prefers reduced motion. The buttons still update the counters.",
  },
  ask: {
    title: "Ask my portfolio",
    hint: "An AI agent that answers from my CV and case studies only, with sources.",
    placeholder: "e.g. Has he led teams? What has he built on AWS?",
    send: "Ask",
    thinking: "Thinking…",
    suggestions: ["What has he built on AWS?", "Has he worked as a tech lead?", "How does he use AI in his work?"],
    sources: "Sources",
    error: "The agent is not available right now. Email me instead:",
    limit: "You've asked a lot of questions. Try again in a few minutes, or email me:",
  },
  work: { title: "Selected work", hint: "Hover a diagram to run it", readCase: "Read the case study", visit: "Visit site" },
  ai: {
    title: "AI in how I build",
    tools: "Cursor · MCP · n8n · LangChain · PyTorch",
    cards: [
      {
        title: "AI-assisted delivery",
        body: "I introduced Cursor, MCP and n8n workflows into the team's delivery process, cutting repetitive engineering time across projects.",
      },
      {
        title: "Applied deep learning",
        body: "Postgraduate in Artificial Intelligence with Deep Learning at UPC School (8.1/10). Hands-on with PyTorch and LangChain.",
      },
      {
        title: "This site's agent",
        body: "The “Ask my portfolio” box is a small retrieval-style agent: a closed context of my CV and case studies, rate-limited, always answering with sources.",
      },
    ],
    tryIt: "Try it",
  },
  about: {
    title: "How I work",
    body: "I lead technical decisions on production commerce systems at Rocket Digital, a Shopify Premier Partner. I own architecture from cloud infrastructure to front-end delivery, set the team's CI/CD and code standards, and bring AI-assisted workflows into daily engineering.",
    stats: [
      { label: "In production", value: "8+ yrs" },
      { label: "Systems led", value: "30+" },
      { label: "Markets", value: "EU · MENA" },
    ],
    stack: ["Python", "FastAPI", "AWS Lambda · SQS", "Docker", "Shopify Plus", "Hydrogen", "React · Next.js", "TypeScript", "GitHub Actions"],
    experience: "Experience",
    jobs: [
      { role: "Senior Full-Stack Engineer / Tech Lead", org: "Rocket Digital, Barcelona", when: "2021 – now" },
      { role: "PHP Full Stack Developer", org: "Factoria Creativa, Barcelona", when: "2021" },
      { role: "PHP Developer", org: "Slice Group, Venezuela", when: "2017 – 2019" },
    ],
  },
  footer: { based: "Víctor Díaz Egurbide · Barcelona" },
  tldr: {
    title: "The 30-second version",
    points: [
      "Senior Full-Stack Engineer and tech lead, 8+ years shipping production systems.",
      "Architected 5 enterprise Python/AWS integrations (Lambda, SQS) for multi-market catalogs.",
      "Tech lead on 30+ production systems for brands in the EU and MENA at Rocket Digital, a Shopify Premier Partner.",
      "Shopify Plus, Hydrogen, React/Next.js and TypeScript on the front end; owns CI/CD with GitHub Actions.",
      "Postgraduate in AI with Deep Learning (UPC); brought Cursor, MCP and n8n into the team's workflow.",
      "Based in Barcelona. Spanish native, professional English.",
    ],
    lookingFor: "Open to Tech Lead, Solutions Architect and senior product engineering roles.",
    download: "Download CV (PDF)",
    email: "Email me",
    close: "Close",
  },
  cs: {
    back: "Selected work",
    role: "Role",
    context: "Context",
    scope: "Scope",
    stack: "Stack",
    next: "Next project",
    readNext: "Read next",
  },
};

export type Dict = typeof en;

const es: Dict = {
  meta: {
    title: "Víctor Díaz Egurbide — Senior Full-Stack Engineer",
    description:
      "Senior Full-Stack Engineer y tech lead en Barcelona. Integraciones Python y AWS, Shopify Plus, React y Next.js, e ingeniería asistida por IA.",
  },
  nav: { work: "Trabajo", ai: "IA", about: "Sobre mí", contact: "Contacto", tldr: "TL;DR para recruiters", switchTo: "EN", switchLabel: "View in English" },
  hero: {
    kicker: ["Víctor Díaz Egurbide", "Senior Full-Stack Engineer", "Barcelona"],
    intro:
      "Diseño y lanzo plataformas de ecommerce para marcas enterprise: pipelines de datos en Python y AWS, storefronts en Shopify Plus e ingeniería asistida por IA que hace al equipo más rápido.",
    title: "Sistemas en producción, de principio a fin.",
    ctaWork: "Ver el trabajo",
    chipsAi: ["Ingeniería asistida por IA", "Posgrado en IA · UPC"],
    chipStack: "Python · AWS · Shopify Plus",
  },
  pipeline: {
    label: "catalog-pipeline · simulación interactiva",
    legendRaw: "item en bruto",
    legendEu: "eu",
    legendMena: "mena",
    burst: "Enviar un pico",
    breakWorker: "Romper un worker",
    queued: "en cola",
    processed: "procesados",
    retries: "reintentos",
    down: "caído",
    agent: "Agente IA",
    agentTools: "cursor · mcp · n8n",
    idle: [
      "vigilando la cola y la salud de los workers",
      "revisando el último deploy vía MCP",
      "n8n · deploy correcto, equipo avisado",
    ],
    onBurst: "pico detectado · la cola lo absorbe",
    onBreak: "{w} ha caído · su mensaje vuelve a la cola",
    onRecover: "{w} recuperado · vaciando la cola",
    aria:
      "Simulación interactiva de un pipeline de catálogo: los feeds entran a una Lambda de ingesta, esperan en una cola SQS, tres Lambdas worker asignan cada item a su mercado y llegan a las tiendas de EU o MENA. Puedes enviar un pico de items o romper un worker para ver cómo la cola absorbe la carga y reintenta los mensajes fallidos.",
    reduced: "La animación está pausada porque tu sistema prefiere menos movimiento. Los botones siguen actualizando los contadores.",
  },
  ask: {
    title: "Pregunta a mi portfolio",
    hint: "Un agente de IA que responde solo a partir de mi CV y mis case studies, con fuentes.",
    placeholder: "p. ej. ¿Ha liderado equipos? ¿Qué ha construido en AWS?",
    send: "Preguntar",
    thinking: "Pensando…",
    suggestions: ["¿Qué ha construido en AWS?", "¿Ha trabajado como tech lead?", "¿Cómo usa la IA en su trabajo?"],
    sources: "Fuentes",
    error: "El agente no está disponible ahora mismo. Escríbeme:",
    limit: "Has hecho muchas preguntas. Prueba en unos minutos o escríbeme:",
  },
  work: { title: "Trabajo seleccionado", hint: "Pasa el ratón por un diagrama para activarlo", readCase: "Leer el case study", visit: "Ver la web" },
  ai: {
    title: "La IA en cómo construyo",
    tools: "Cursor · MCP · n8n · LangChain · PyTorch",
    cards: [
      {
        title: "Entrega asistida por IA",
        body: "Introduje flujos con Cursor, MCP y n8n en el proceso de entrega del equipo, reduciendo trabajo repetitivo de ingeniería en todos los proyectos.",
      },
      {
        title: "Deep learning aplicado",
        body: "Posgrado en Inteligencia Artificial con Deep Learning en UPC School (8,1/10). Experiencia práctica con PyTorch y LangChain.",
      },
      {
        title: "El agente de esta web",
        body: "El cuadro “Pregunta a mi portfolio” es un pequeño agente con contexto cerrado: mi CV y mis case studies, con límite de uso y siempre respondiendo con fuentes.",
      },
    ],
    tryIt: "Pruébalo",
  },
  about: {
    title: "Cómo trabajo",
    body: "Lidero decisiones técnicas en sistemas de ecommerce en producción en Rocket Digital, Shopify Premier Partner. Me encargo de la arquitectura desde la infraestructura cloud hasta el front end, defino el CI/CD y los estándares de código del equipo, e integro flujos asistidos por IA en la ingeniería del día a día.",
    stats: [
      { label: "En producción", value: "8+ años" },
      { label: "Sistemas liderados", value: "30+" },
      { label: "Mercados", value: "EU · MENA" },
    ],
    stack: ["Python", "FastAPI", "AWS Lambda · SQS", "Docker", "Shopify Plus", "Hydrogen", "React · Next.js", "TypeScript", "GitHub Actions"],
    experience: "Experiencia",
    jobs: [
      { role: "Senior Full-Stack Engineer / Tech Lead", org: "Rocket Digital, Barcelona", when: "2021 – hoy" },
      { role: "PHP Full Stack Developer", org: "Factoria Creativa, Barcelona", when: "2021" },
      { role: "PHP Developer", org: "Slice Group, Venezuela", when: "2017 – 2019" },
    ],
  },
  footer: { based: "Víctor Díaz Egurbide · Barcelona" },
  tldr: {
    title: "La versión de 30 segundos",
    points: [
      "Senior Full-Stack Engineer y tech lead, más de 8 años lanzando sistemas en producción.",
      "Arquitecto de 5 integraciones enterprise en Python/AWS (Lambda, SQS) para catálogos multimercado.",
      "Tech lead en más de 30 sistemas en producción para marcas de EU y MENA en Rocket Digital, Shopify Premier Partner.",
      "Shopify Plus, Hydrogen, React/Next.js y TypeScript en el front end; responsable del CI/CD con GitHub Actions.",
      "Posgrado en IA con Deep Learning (UPC); introdujo Cursor, MCP y n8n en el flujo del equipo.",
      "En Barcelona. Español nativo, inglés profesional.",
    ],
    lookingFor: "Abierto a roles de Tech Lead, Solutions Architect y senior product engineering.",
    download: "Descargar CV (PDF)",
    email: "Escríbeme",
    close: "Cerrar",
  },
  cs: {
    back: "Trabajo seleccionado",
    role: "Rol",
    context: "Contexto",
    scope: "Alcance",
    stack: "Stack",
    next: "Siguiente proyecto",
    readNext: "Leer",
  },
};

const dictionaries: Record<Lang, Dict> = { en, es };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}
