import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  webflow,
  elementor,
  php,
  meta,
  starbucks,
  slice,
  agencianinja,
  factoriacreativa,
  rocket,
  tesla,
  shopify,
  carrent,
  outletpc,
  hanaley,
  scalpers,
  fourdoctors,
  viena,
  winadream,
  silence,
  gobik,
  kibus,
  calitec,
  teyder,
  laartesana,
  jobit,
  tripguide,
  joaquim,
  threejs,
  frontity,
  wordpress,
  woocommerce,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "React JS",
    icon: web,
  },
  {
    title: "PHP",
    icon: mobile,
  },
  {
    title: "Javascript",
    icon: backend,
  },
  {
    title: "SEO",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "PHP",
    icon: php,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Elementor",
    icon: elementor,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Shopify",
    icon: shopify,
  },
  {
    name: "Wordrpress",
    icon: wordpress,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "webflow",
    icon: webflow,
  },
];

const experiences = [
  {
    title: "Wordpress Engineer",
    company_name: "Slice Group, Venezuela",
    icon: slice,
    iconBg: "#FFFFFF",
    date: "Jun 2017 - Dec 2019",
    points: [
      "Implemented and assessed performance of SEO best practices.",
      "Provided timely resolution to reported website problems by integrating new solutions into existing platforms. ",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Developed and implemented WordPress sites, themes and plugins.",
    ],
  },
  {
    title: "Software Engineer & SEO",
    company_name: "Agencia Ninja, Barcelona",
    icon: agencianinja,
    iconBg: "#113650",
    date: "Jun 2020 - Jan 2021",
    points: [
      "Implemented and assessed performance of SEO best practices.",
      "Developed and implemented WordPress custom sites, themes and plugins.",
      "Provided timely resolution to reported website problems by integrating new solutions into existing platforms.",
      "Lead and delegated tasks for project fulfillment.",
      "Developed sites using Website Builders such as Elementor, Webflow, Divi.",
    ],
  },
  {
    title: "PHP Full Stack Engineer",
    company_name: "Factoria Creativa, Barcelona",
    icon: factoriacreativa,
    iconBg: "#FFFFFF",
    date: "Feb 2021 - Sep 2021",
    points: [
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Developed and implemented WordPress sites, themes and plugins from scratch.",
      "Lead and delegated tasks for project fulfillment.",
      "Strong communication with clients and Projects management.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Ecommerce Tech Lead",
    company_name: "Rocket Digital, Barcelona",
    icon: rocket,
    iconBg: "#1e2339",
    date: "Sep 2021 - Present",
    points: [
      "Lead and delegated tasks for project fulfillment.",
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Developed Headless Shopify and WordPress sites, themes and plugins from scratch using React, PHP, HTML, SASS, Liquid and GraphQL.",
      "Leveraged strong understanding of Shopify core to collaborate with end users on project specifications, strategy and execution to build new Ecommerces and update existing ones.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Scalpers",
    description:
      "Wordpress Web Application using Frontity as framework that brings travel consultancy to a state-of-the-art level of tech and design and thereby will shape the future of individual and adventure trips.",
    tags: [
      {
        name: "liquid",
        color: "blue-text-gradient",
      },
      {
        name: "shopify",
        color: "green-text-gradient",
      },
      {
        name: "graphql",
        color: "orange-text-gradient",
      },
    ],
    image: scalpers,
    source_code_link: "https://scalperscompany.com/",
    badge: shopify,
  },
  {
    name: "Gobik",
    description:
      "Spanish cycling apparel brand dedicated to creating high-performance clothing for the discerning rider. Founded with a passion for the sport and a meticulous focus on quality.",
    tags: [
      {
        name: "liquid",
        color: "blue-text-gradient",
      },
      {
        name: "shopify",
        color: "green-text-gradient",
      },
      {
        name: "graphql",
        color: "orange-text-gradient",
      },
    ],
    image: gobik,
    source_code_link: "https://gobik.com/",
    badge: shopify,
  },
  {
    name: "OutletPC",
    description:
      "Dive into a treasure trove of bargain-priced PC parts, pre-built machines, and phone repair magic. Their friendly in-store crew navigates your tech needs, while online deals whisk your desires to your doorstep.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "shopify",
        color: "green-text-gradient",
      },
      {
        name: "graphql",
        color: "orange-text-gradient",
      },
    ],
    image: outletpc,
    source_code_link: "https://outlet-pc.com/",
    badge: shopify,
  },
  {
    name: "Hanaley",
    description:
      "Wordpress Web Application using Frontity as framework that brings travel consultancy to a state-of-the-art level of tech and design and thereby will shape the future of individual and adventure trips.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "wordpress",
        color: "green-text-gradient",
      },
      {
        name: "frontity",
        color: "pink-text-gradient",
      },
    ],
    image: hanaley,
    source_code_link: "https://hanaley.com/",
    badge: frontity,
  },
  {
    name: "Win A Dream",
    description:
      "Headless Web Application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "wordpress",
        color: "green-text-gradient",
      },
      {
        name: "frontity",
        color: "pink-text-gradient",
      },
    ],
    image: winadream,
    source_code_link: "https://pre.winadream.football/",
    badge: frontity,
  },
  {
    name: "Silence",
    description:
      "Silence was born in Barcelona and is dedicated to the design and manufacture of two and three-wheel electric vehicles as well as their batteries. Wordpress Custom theme",
    tags: [
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "wordpress",
        color: "green-text-gradient",
      },
      {
        name: "ACF",
        color: "pink-text-gradient",
      },
    ],
    image: silence,
    source_code_link: "https://www.silence.eco/",
    badge: wordpress,
  },
  {
    name: "Teyder",
    description:
      "Custom Woocommerce site offering a modern and wide range of orthopaedic, sports medicine and mobility aid products with the best materials and guaranteed compliance.",
    tags: [
      {
        name: "woocommerce",
        color: "green-text-gradient",
      },
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "ACF",
        color: "pink-text-gradient",
      },
    ],
    image: teyder,
    source_code_link: "https://teyder.com/",
    badge: woocommerce,
  },
  {
    name: "Estilograficas Viena",
    description:
      "Founded in 1929, Barcelona's Estilográficas Viena is a haven for pen aficionados, boasting Spain's largest selection of high-quality fountain pens, writing instruments, and inks.",
    tags: [
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "woocommerce",
        color: "green-text-gradient",
      },
      {
        name: "ACF",
        color: "pink-text-gradient",
      },
    ],
    image: viena,
    source_code_link: "https://estilograficasviena.com/",
    badge: woocommerce,
  },
  {
    name: "La Artesana",
    description:
      "Crafting pizzas with passion, from fresh, high-quality ingredients. Savor artisanal pies, crisp & flavorful, or explore their enticing salads & starters. Dine in or enjoy delivery – Castelldefels' pizza perfection awaits.",
    tags: [
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "woocommerce",
        color: "green-text-gradient",
      },
      {
        name: "ACF",
        color: "pink-text-gradient",
      },
    ],
    image: laartesana,
    source_code_link: "https://laartesanapizzeria.com/",
    badge: woocommerce,
  },
  {
    name: "4 Doctors",
    description:
      "Corporate Wordpress theme. 4Doctors platform crafts engaging, science-backed educational content in bite-sized formats like video podcasts and escape rooms, targeting medical professionals on a mission to upskill and excel.",
    tags: [
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "wodpress",
        color: "green-text-gradient",
      },
      {
        name: "ACF",
        color: "pink-text-gradient",
      },
    ],
    image: fourdoctors,
    source_code_link: "https://4doctors.io/",
    badge: wordpress,
  },
  {
    name: "Calitec",
    description:
      "Corporate Wordpress theme site offering advise and providing solutions to companies in the agri-food and environmental sector, offering analytical and comprehensive services.",
    tags: [
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "wordpress",
        color: "green-text-gradient",
      },
      {
        name: "ACF",
        color: "pink-text-gradient",
      },
    ],
    image: calitec,
    source_code_link: "https://laboratoriocalitec.com/",
    badge: wordpress,
  },
  {
    name: "Joaquim Muñoz",
    description:
      "Dr. Joaquim Muñoz, a renowned Barcelona-based plastic surgeon, sculpts confidence through a spectrum of aesthetic and reconstructive procedures. From breast surgery and body contouring to facial rejuvenation and cancer reconstruction.",
    tags: [
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "wordpress",
        color: "green-text-gradient",
      },
      {
        name: "ACF",
        color: "pink-text-gradient",
      },
    ],
    image: joaquim,
    source_code_link: "https://joaquimmunoz.com/",
    badge: wordpress,
  },
];

export { services, technologies, experiences, testimonials, projects };
