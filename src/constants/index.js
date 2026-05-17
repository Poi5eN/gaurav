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
  meta,
  starbucks,
  dkd,
  corplyx,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  info,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "ailab",
    title: "AI Lab",
  },
  {
    id: "work",
    title: "Projects",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "resume",
    title: "Resume",
  },
  {
    id: "blog",
    title: "Thoughts",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Systems",
    icon: web,
  },
  {
    title: "Cognitive Pipelines (AI)",
    icon: mobile,
  },
  {
    title: "Autonomous Agents",
    icon: backend,
  },
  {
    title: "LLMOps & Infra",
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
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
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
];

const experiences = [
  {
    title: "AI & Full Stack Engineer",
    company_name: "Poi5eN Labs / R&D",
    icon: dkd,
    iconBg: "#0A0F14",
    date: "Dec 2024 - Present",
    points: [
      "Architected autonomous multi-agent planning frameworks inside React / Next.js that reduced execution failure loops by 40%.",
      "Deployed custom RAG pipelines over vector database systems (Qdrant/Pinecone), handling semantic search queries with < 80ms latency.",
      "Established LLMOps proxy layers and custom cost/token estimation metric frameworks, tracking model utilization parameters in real-time.",
    ],
  },
  {
    title: "Full Stack Software Developer",
    company_name: "DoubleKlick Designs",
    icon: corplyx,
    iconBg: "#0A0F14",
    date: "Jan 2023 - Nov 2024",
    points: [
      "Engineered robust web applications in NestJS, Next.js, and Docker, boosting server load speeds by 25%.",
      "Collaborated with cross-functional product and design teams to build high-performance client applications with complex interactive layers.",
      "Refactored relational and NoSQL database schemas to streamline transactional reads, cutting query latencies by 30%.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Gaurav was one of the few engineers who easily bridged the gap between raw Python ML prototyping and building our entire Next.js product wrapper.",
    name: "Amit Sharma",
    designation: "Founder",
    company: "AlphaAI",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    testimonial:
      "His grasp of LLMOps and performance optimization was invaluable when scaling our prompt orchestrators to over 10K+ monthly active users.",
    name: "Rajesh Nair",
    designation: "CTO",
    company: "NexusHealth",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const projects = [
  {
    name: "FleetOptimizer AI",
    description:
      "A fleet coordination tool powered by autonomous pathfinding. Integrates localized traffic patterns to cut transport delays by 20% in real-world simulations.",
    problem: "Inefficient fleet routes causing fuel waste and delayed shipments.",
    approach: "Leveraged A* pathfinding and vector analysis to construct responsive, real-time optimal coordinate routes.",
    impact: "Cut fuel consumption by 15% and delivered 20% faster dispatch routing.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "threejs", color: "pink-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://github.com/Poi5eN/fleet-optimizer-ai",
  },
  {
    name: "JobMatch LLM",
    description:
      "An recruitment portal using vector embeddings and semantic similarity filters to rank candidate resumes directly against deep job descriptions.",
    problem: "Recruiters manually screening thousands of resumes with poor keyword matches.",
    approach: "Integrated LangChain semantic similarity indexing over candidates' parsed resume tokens.",
    impact: "Reduced candidate filtering time by 60% with a 90% recruiter feedback satisfaction rate.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "langchain", color: "green-text-gradient" },
      { name: "fastapi", color: "pink-text-gradient" },
    ],
    image: jobit,
    source_code_link: "https://github.com/Poi5eN/job-match-llm",
  },
  {
    name: "Agentic Travel Plan",
    description:
      "An autonomous travel agent utilizing multi-agent consensus to research hotels, book flights, and compile personalized daily schedules.",
    problem: "Fragmented travel planning websites that require manually aligning dozens of flight and hotel times.",
    approach: "Deployed Autogen orchestrators executing sandboxed parallel search steps across external APIs.",
    impact: "Reduced typical multi-destination itinerary creation time from 4 hours to under 2 minutes.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "supabase", color: "green-text-gradient" },
      { name: "autogen", color: "pink-text-gradient" },
    ],
    image: tripguide,
    source_code_link: "https://github.com/Poi5eN/agentic-travel-planner",
  },
];

export { services, technologies, experiences, testimonials, projects };
