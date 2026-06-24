import { Award, BrainCircuit, Cloud, Cpu, Database, Globe2, Layers3, ShieldCheck } from 'lucide-react';

export const experienceData = [
  {
    id: 1,
    company: "Simplevia Techlogies Inc.",
    role: "Backend Developer",
    dates: "2026 — present",
    points: [
      "Developed and maintained backend APIs for a School Management System using ASP.NET, Entity Framework Core, and MySQL, building CRUD modules for HR and Payroll functionalities.",
      "Optimized database performance by writing stored procedures and query improvements, reducing execution time from 214ms to 73ms for key system operations.",
      "Improved system security and reliability by debugging backend issues, including resolving an unauthorized file upload vulnerability and testing APIs using Swagger, Postman, and GitHub workflows."
    ]
  },
  {
    id: 2,
    company: "Nephila Web Technology Inc.",
    role: "Software Developer",
    dates: "2024 — 2025",
    points: [
      "Built backend modules for an internal HRIS and Payroll platform using Laravel, MySQL, and Eloquent ORM, supporting employee management, leave requests, attendance, and file/document handling.",
      "Strengthened application security by implementing RBAC with Spatie Laravel Permission, controlling access to sensitive HR and payroll operations.",
      "Developed RESTful APIs for employee management, authentication, reporting, and data import/export, contributing through sprint tasks, code reviews, and collaborative Git workflows."
    ]
  },
  {
    id: 3,
    company: "Client Based",
    role: "Freelance Fullstack Developer",
    dates: "2024 — 2025",
    points: [
      "Designed and deployed RESTful APIs using Express and MongoDB.",
      "Developed and deployed multiple web applications.",
      "Delivered solutions tailored to client needs, demonstrating ability to work with stakeholders, manage scope, and meet deadlines."
    ]
  },
];

export const projectsData = [
  {
    id: "p1",
    title: "MOVIE-RECO",
    description: "Semantic movie discovery web app using vector embeddings and MongoDB Atlas Vector Search to deliver fast, high-accuracy content recommendations beyond traditional keyword matching.",
    liveLink: "https://movie-reco-p0tq.onrender.com/",
    githubLink: "https://github.com/Geoxylitiz/movie-reco",
    tags: ["MongoDB", "Express.JS", "Xenova-MiniLM", "Docker"],
    image: "https://res.cloudinary.com/del8molgi/image/upload/v1778239728/movie-UI_av68tp.png",
    images: ["https://res.cloudinary.com/del8molgi/image/upload/v1778239728/movie-UI_av68tp.png", "/images/movie/image1.png", "/images/movie/image2.png", "/images/movie/image3.png"]
  },
  {
    id: "p2",
    title: "Math Learning Management System ",
    description: "Cross-platform web and mobile learning platform with secure JWT-based architecture, real-time student progress tracking, and analytics-driven classroom insights to monitor performance and identify at-risk learners.",
    liveLink: "https://frontend-ten-sigma-14.vercel.app/",
    githubLink: "https://github.com/Geoxylitiz/backend",
    tags: ["Node.js", "Express.Js", "MongoDB", "Render", "ArcJet", "Cloudinary"],
    image: "https://res.cloudinary.com/del8molgi/image/upload/v1778244442/Screenshot_2026-05-08_204635_vycsny.png",
    images: ["https://res.cloudinary.com/del8molgi/image/upload/v1778244442/Screenshot_2026-05-08_204635_vycsny.png", "/images/math/image1.png", "/images/math/image2.png", "/images/math/image3.png"]
  },
  {
    id: "p3",
    title: "AI-Powered Blog Creation Automation",
    description: "Blog generation platform built with Next.js and Gemini API, enhanced with Redis caching and MongoDB optimization to automate content creation and dramatically accelerate data retrieval.",
    liveLink: "http://54.165.211.156:80/ ",
    githubLink: "https://github.com/Geoxylitiz/ai-blog",
    tags: ["TypeScript", "Express.Js", "Redis", "OAuth2"],
    image: "/images/blog/image1.png",
    images: ["/images/blog/image1.png", "/images/blog/image2.png", "/images/blog/image3.png"]
  },
  {
    id: "p4",
    title: "Museum",
    description: "Interactive Museum Gallery App",
    liveLink: "https://museum-iota-nine.vercel.app/",
    githubLink: "https://github.com/Geoxylitiz/ai-blog",
    tags: ["TypeScript", "Next.JS", "THREE.js", "GSAP"],
    image: "https://res.cloudinary.com/del8molgi/image/upload/v1778239800/Screenshot_2026-05-08_192938_kiywvi.png",
    images: ["https://res.cloudinary.com/del8molgi/image/upload/v1778239800/Screenshot_2026-05-08_192938_kiywvi.png", "/images/museum/image1.png", "/images/museum/image2.png"]
  },

];

export const skillGroups = [
  {
    label: 'Backend Core',
    code: 'svc',
    icon: Cpu,
    accent: 'bg-[var(--color-accent-1)]',
    skills: ['Python', 'Node.js', 'Express.JS', 'ASP.NET', 'Laravel', 'RESTAPI', 'GraphQL'],
  },
  {
    label: 'Data Layer',
    code: 'db',
    icon: Database,
    accent: 'bg-[var(--color-accent-3)]',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka'],
  },
  {
    label: 'Interface Ops',
    code: 'ui',
    icon: Layers3,
    accent: 'bg-white',
    skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
  },
  {
    label: 'Deployment',
    code: 'ship',
    icon: Globe2,
    accent: 'bg-[var(--color-accent-2)] text-white',
    skills: ['Docker', 'AWS', 'CI/CD'],
  },
];

export const certificatesData = [
  {
    id: "cert-cisco-ethical-hacker",
    title: "CISCO ETHICAL HACKER",
    issuer: "Cisco",
    category: "Cybersecurity",
    code: "sec",
    status: "Verified Badge",
    icon: ShieldCheck,
    accent: "bg-[var(--color-accent-1)]",
    url: "https://www.credly.com/badges/b4ffa3ca-3019-4598-b3a3-9013fb0249fa/public_url",
  },
  {
    id: "cert-nosql-dbaas-101",
    title: "NoSQL and DBaaS 101",
    issuer: "Cognitive Class",
    category: "Databases",
    code: "db",
    status: "Course Certificate",
    icon: Database,
    accent: "bg-[var(--color-accent-3)]",
    url: "https://courses.cognitiveclass.ai/certificates/7eb08c1581264f26bfae23c87b7b3602",
  },
  {
    id: "cert-oci-ai-foundations-2023",
    title: "Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate",
    issuer: "Oracle",
    category: "AI Cloud",
    code: "ai",
    status: "Certified Associate",
    icon: BrainCircuit,
    accent: "bg-[var(--color-accent-2)] text-white",
    url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=60E8C74A5A91D820CCD8649811F4C9011192EEEB4A57231FEF721CAD0C5662FD&fbclid=IwAR3pk5DpcBa0ILDoe2sO1Q3NzmLi5_znDqrXHD6S1ToPmkmMaNPNVJ33CiQ",
  },
  {
    id: "cert-oracle-data-management-2023",
    title: "Oracle Cloud Data Management 2023 Certified Foundations Associate",
    issuer: "Oracle",
    category: "Data Management",
    code: "data",
    status: "Certified Associate",
    icon: Database,
    accent: "bg-white",
    url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=502A4682B3C80A8DB8D86FBBF285A5B9DD8A6DA590BD16E1606DF9F58E321DAB&fbclid=IwAR27wtdjW0QbgJOugslrdx4RWtoAfJr4WaIY2ImG4A2dkj58c9C33tGjJ_Q",
  },
  {
    id: "cert-oci-foundations-2023",
    title: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate",
    issuer: "Oracle",
    category: "Cloud Infrastructure",
    code: "cloud",
    status: "Certified Associate",
    icon: Cloud,
    accent: "bg-[var(--color-accent-1)]",
    url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=CB9C60D7A536E89604022960C2F578637C56A669C51F118752BD8D217CA92D95&fbclid=IwAR1SO489pwfJxLbPCQVp3kfsfDIP438HGXbosFnnL9yyDk3tV8Zl16L-ql4",
  },
  {
    id: "cert-sql-relational-databases-101",
    title: "SQL and Relational Databases 101",
    issuer: "Cognitive Class",
    category: "Relational Data",
    code: "sql",
    status: "Course Certificate",
    icon: Award,
    accent: "bg-[var(--color-accent-3)]",
    url: "https://courses.cognitiveclass.ai/certificates/0105bb4e05e541edb01b76151a7bfe61",
  },
];


export const aboutLogsData = [
  {
    type: "command",
    text: "> tail -n 20 /var/log/syslog\n"
  },
  {
    type: "log",
    text: "[2019] First contact with programming.\n       Started exploring web development,\n       learning HTML, CSS, and JavaScript.\n\n"
  },
  {
    type: "log",
    text: "[2020] Systems becoming more complex.\n       Moved beyond frontend and became curious\n       about how APIs, databases, and servers work.\n       Learned Node.js and backend fundamentals.\n\n"
  },
  {
    type: "log",
    text: "[2021] Architecture obsession detected.\n       Built full stack projects, experimented with\n       authentication flows, CRUD systems, and\n       relational database design.\n\n"
  },
  {
    type: "log",
    text: "[2022] Scaling knowledge modules.\n       Explored C#, Laravel, PostgreSQL, MongoDB,\n       and software engineering practices.\n       Became interested in performance and clean architecture.\n\n"
  },
  {
    type: "log",
    text: "[2025] Production environment reached.\n       Joined internship and contributed to internal\n       HRIS + Payroll systems.\n       Worked on employee management, leave systems,\n       attendance, and reporting modules.\n\n"
  },
  {
    type: "log",
    text: "[CURRENT] Optimization mode active.\n       Building backend-heavy systems, integrating AI,\n       exploring distributed architectures, caching,\n       automation workflows, and scalable design.\n\n"
  },
  {
    type: "log",
    text: "[NEXT_TARGET]\n       Ship systems used at real scale.\n       Solve harder engineering problems.\n       Keep building things that last.\n"
  }
];

