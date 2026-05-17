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
  dkd,
  corplyx,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "ailab", title: "AI Lab" },
  { id: "work", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "resume", title: "Resume" },
  { id: "blog", title: "Thoughts" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Full Stack Systems", icon: web },
  { title: "Cognitive Pipelines (AI)", icon: mobile },
  { title: "Autonomous Agents", icon: backend },
  { title: "LLMOps & Infra", icon: creator },
];

const technologies = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  { name: "Three JS", icon: threejs },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "India Accelerator",
    icon: dkd,
    iconBg: "#0A0F14",
    date: "Jul 2025 — Present",
    location: "Sector 28, Gurugram",
    points: [
      "Architected enterprise platforms including vehicle claim management, legal-tech APIs, and coworking automation using NestJS, Next.js, PostgreSQL, Redis, GCP, TurboRepo monorepo, and AI integrations.",
      "Integrated OpenAI Vision API into real-time image verification pipelines for AI-powered damage detection, reducing manual claim assessment time by ~40%.",
      "Built and deployed approval engines, operational automations, and WiFi access provisioning systems, improving platform workflow efficiency across enterprise clients."
    ],
    impact: "-40% claim time",
    current: true
  },
  {
    title: "Full Stack Developer",
    company_name: "DoubleKlick Designs",
    icon: corplyx,
    iconBg: "#0A0F14",
    date: "Dec 2024 — Jul 2025",
    location: "Okhla Phase-I, New Delhi",
    points: [
      "Developed scalable full-stack applications using Next.js, NestJS, Prisma ORM, MongoDB, and AWS, delivering production-grade REST APIs with authentication flows.",
      "Unified 5+ challan provider APIs into a single optimized gateway using Redis caching, slashing response time from 10+ minutes to under 3 seconds serving 10K+ monthly requests.",
      "Implemented CI/CD pipelines and AWS deployments (EC2, S3, Lambda), reducing production deployment errors by 25%."
    ],
    impact: "10min → 3sec"
  },
  {
    title: "Software Engineer",
    company_name: "Corplyx Technologies Pvt. Ltd.",
    icon: dkd,
    iconBg: "#0A0F14",
    date: "Jun 2023 — Nov 2024",
    location: "Sector-62, Noida",
    points: [
      "Led scalable web application development, streamlining backend query performance and frontend bundle sizes to achieve 30% reduction in page load times.",
      "Built React.js interfaces with Redux state management and Node.js/Express.js backends with MongoDB for high-throughput data workflows."
    ],
    impact: "-30% load time"
  },
  {
    title: "Software Developer",
    company_name: "Infotech Software Solutions",
    icon: corplyx,
    iconBg: "#0A0F14",
    date: "Sept 2022 — Jun 2023",
    location: "Sector-10, Noida",
    points: [
      "Developed backend microservices, frontend components, and enhanced database workflows resulting in 15% improvement in system response times."
    ],
    impact: "+15% response"
  }
];

const testimonials = [
  {
    testimonial:
      "Gourav was one of the few engineers who easily bridged the gap between raw Python ML prototyping and building our entire Next.js product wrapper.",
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
    name: "Paramount (AI Claim Platform)",
    description:
      "Computer vision meets insurance workflows. Integrated OpenAI Vision API for real-time damage assessment and auto-classification.",
    problem: "Manual vehicle damage assessment was slow, inconsistent, and costly.",
    approach: "Integrated OpenAI Vision API into real-time image analysis pipeline with multi-role approval workflows and insurance integrations.",
    impact: "↓40% claim assessment time · Enterprise client production deployment",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "NestJS", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
      { name: "OpenAI Vision", color: "blue-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://sage.paramountservices.co.in/",
  },
  {
    name: "ChallanPay Gateway",
    description:
      "Unified 5+ challan provider APIs with Redis caching. Slashing response time from 10+ minutes to under 3 seconds.",
    problem: "Users had to check 5+ challan portals manually, each taking 2+ minutes.",
    approach: "Unified all providers into one Redis-cached gateway. Single API call returns unified result.",
    impact: "10min → <3sec response · 10K+ monthly requests · 25% fewer deployment errors",
    tags: [
      { name: "Node.js", color: "blue-text-gradient" },
      { name: "Prisma", color: "green-text-gradient" },
      { name: "Redis", color: "pink-text-gradient" },
      { name: "AWS", color: "blue-text-gradient" },
    ],
    image: jobit,
    source_code_link: "https://lawyered.in/",
  },
  {
    name: "Bhraman Together",
    description:
      "End-to-end travel platform with real-time geospatial intelligence, cab coordination, and automated itinerary generation.",
    problem: "Travelers needed one platform for booking, routing, and cab coordination.",
    approach: "Geospatial MongoDB queries + Google Maps route planning + real-time availability engine.",
    impact: "Sub-2s search results · Live production with real bookings",
    tags: [
      { name: "NestJS", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
      { name: "Google Maps", color: "blue-text-gradient" },
    ],
    image: tripguide,
    source_code_link: "https://www.bhramantogether.com/",
  },
  {
    name: "RAG Knowledge Base",
    description:
      "Advanced PDF ingestion and intelligent vector search. Powered by LangChain, ChromaDB, and OpenAI API.",
    problem: "Long PDF documents are unsearchable and require full reads.",
    approach: "LangChain pipeline: PDF → chunking → ChromaDB embeddings → semantic retrieval → OpenAI answer generation.",
    impact: "Semantic search across 100-page docs in <2s · Live Streamlit demo",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "LangChain", color: "green-text-gradient" },
      { name: "ChromaDB", color: "pink-text-gradient" },
      { name: "Streamlit", color: "blue-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://rag-knowledge-basev2.streamlit.app/",
  },
  {
    name: "IA Spaces Coworking",
    description:
      "Coworking seat booking, WiFi access provisioning, and automated approvals dashboard.",
    problem: "Coworking seat booking, WiFi access, and approvals were all manual.",
    approach: "Built automated WiFi provisioning, seat booking engine, and enterprise approval integrations.",
    impact: "Live at iaspaces.co · Multiple enterprise clients",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "NestJS", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
      { name: "TurboRepo", color: "blue-text-gradient" },
    ],
    image: jobit,
    source_code_link: "https://iaspaces.co/",
  },
  {
    name: "RukiyeZara",
    description:
      "Full-featured property booking platform with optimized data fetching, Supabase backend, and geolocation search.",
    problem: "Property booking platforms are notoriously slow.",
    approach: "Next.js with optimized data fetching, Supabase backend, geolocation search.",
    impact: "<2s page load · Live production",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "Supabase", color: "pink-text-gradient" },
    ],
    image: tripguide,
    source_code_link: "https://www.rukiyezara.com/",
  },
  {
    name: "Digital Vidya Saarthi",
    description:
      "Full-stack school ops platform covering attendance, enrollment, and administrative dashboard workflows.",
    problem: "Fragmented school management tools with high operational latency.",
    approach: "React.js interfaces with Redux state management and Node.js/Express.js backends with MongoDB.",
    impact: "Integrated admin, teacher, student dashboards with sub-second loads",
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
      { name: "Redux", color: "blue-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://www.digitalvidyasaarthi.in/",
  },
];

export { services, technologies, experiences, testimonials, projects };
