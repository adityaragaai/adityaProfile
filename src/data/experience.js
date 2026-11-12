// Work history shown on the Experience page and the dashboard's Experience card.
// Newest first; `current: true` marks ongoing roles.
import ragaaiLogo from '../assets/ragaai-logo.svg'
import firstbriqLogo from '../assets/firstbriq-logo.svg'
import microsoftLogo from '../assets/microsoft-logo.png'
import pwskillsLogo from '../assets/pwskills-logo.png'

export const jobs = [
  {
    title: 'Product Software Engineer (Freelance)',
    company: 'FirstBriq · Remote',
    period: 'Sep 2026 — Present',
    current: true,
    dotColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Own product features end to end, from scoping with the founders through design, build, deploy and iteration. Building FirstBriq\'s operations platform for interior and construction teams: WhatsApp-to-ERP workflow automation, AI-assisted lead management and the dashboards PMs use to review and approve changes. Ship full-stack features with React, Next.js and Tailwind on the frontend and typed Node.js / Express APIs on MongoDB, with validation, background jobs and tests built in.',
    tags: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    logo: firstbriqLogo,
    logoBg: 'bg-white',
  },
  {
    title: 'SDE Intern',
    company: 'RagaAI · Bengaluru, India',
    period: 'Jan 2026 — Present',
    current: true,
    dotColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Shipped production features across RagaAI\'s Clinical Ops, CMS, and Denver Allergy products — fax classification and AI-assisted billing collections dashboards, review management with AI replies, and a support-ticket workflow with email notifications. Built 20+ reusable React and TypeScript components integrated with Node.js, MongoDB, and REST APIs, and lifted Lighthouse performance from 50 to 75 on a live client site.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs'],
    logo: ragaaiLogo,
    logoBg: 'bg-white',
    report: {
      title: 'Developer Contribution Report — RagaAI',
      meta: '18 pages · Clinical Ops, CMS, Denver Allergy',
      href: '/reports/Aditya_Gupta_RagaAI_Contribution_Report.pdf',
    },
  },
  {
    title: 'AI: Transformative Learning Intern',
    company: 'Edunet Foundation · Remote',
    period: '2024 · 2 months',
    current: false,
    dotColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Participated in Microsoft & SAP\'s TechSaksham initiative, exploring AI applications across industries. Focused on machine learning fundamentals, AI ethics, and real-world data analysis pipelines.',
    tags: ['Machine Learning', 'AI Ethics', 'Data Analysis', 'Python'],
    logo: microsoftLogo,
    logoBg: 'bg-white',
  },
  {
    title: 'Full-Stack Developer Trainee',
    company: 'PW Skills — Sigma Batch 1.0',
    period: 'Jul 2023 — Mar 2024 · 9 months',
    current: false,
    dotColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Completed an intensive Full-Stack Web Development program. Mastered the MERN stack — HTML, CSS, JavaScript, React.js, Node.js, and MongoDB — while building multiple real-world projects from scratch.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'HTML/CSS'],
    logo: pwskillsLogo,
    logoBg: 'bg-white',
  },
  {
    title: 'Freelance Web Developer',
    company: 'Self-employed · Remote',
    period: '2022 — Jun 2026',
    current: false,
    dotColor: 'oklch(0.627 0.265 303.9)',
    desc: 'Delivered responsive web applications and UI/UX designs for clients. Managed social media content and video production for 10+ YouTubers as a Content Creator and Social Media Manager.',
    tags: ['HTML', 'CSS', 'React.js', 'Figma', 'Content Creation'],
  },
]
