/**
 * ============================================================
 *  CENTRAL SITE CONFIGURATION — EDIT THIS FILE FIRST
 * ============================================================
 *  Everything personal (brand, contact, stats, CTA text, socials)
 *  lives here. You should not need to edit components for these.
 */

export const siteConfig = {
  // --- Brand -------------------------------------------------
  brand: "Pilgrim's desk",
  brandMark: "RC", // shown inside the logo badge
  tagline: "Research. Write. Present. With Confidence.",
  seoTitle: "Pilgrim's Desk",
  seoDescription:
    "Professional academic project writing, research support, data presentation, editing and documentation for students and researchers.",

  // --- Hero --------------------------------------------------
  hero: {
    headline: "Academic Projects, Research & Writing Done With Precision.",
    subheadline:
      "Professional academic project writing, research support, data presentation, editing, and documentation designed to help students present their work with clarity and confidence.",
    primaryCta: "View My Work",
    secondaryCta: "Start a Project",
    trustLine: "Research • Writing • Editing • Documentation",
  },

  // --- Global CTA --------------------------------------------
  navCta: "Start Your Project",

  // --- Statistics (easy to edit) -----------------------------
  stats: [
    { value: "50+", label: "Projects Completed" },
    { value: "30+", label: "Research Topics" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "5+", label: "Years of Experience" },
  ],

  // --- About -------------------------------------------------
  about: {
    name: "Haruna Samson",
    role: "Academic Writer & Research Consultant",
    photo: "/images/about-portrait.jpg", // replace with your photo
    bio: [
      "I work with students and early-career researchers to turn rough ideas into clearly structured, well-argued academic projects. My focus is on research clarity, sound structure and a professional finish.",
      "Every project starts with a conversation about your topic, your department's expectations and your deadline — then we build the work step by step, chapter by chapter.",
    ],
    philosophy:
      "Good academic work is not complicated writing. It is a clear question, honest research and a structure a reader can follow without effort.",
    highlight: "Clear research. Strong structure. Professional presentation.",
    expertise: [
      "Research design & topic development",
      "Literature review and referencing",
      "Data presentation & interpretation",
      "Academic formatting and documentation",
    ],
  },

  // --- Contact -----------------------------------------------
  contact: {
    email: "harunasamson120@gmail.com",
    phone: "08064954124",    
    whatsapp: "08064954124", // digits only, international format
    whatsappMessage: "Hello Pilgrim's desk, I'd like to discuss a project.",
    location: "Available online, worldwide",
    responseTime: "Typically replies within 24 hours",
    /**
     * FORM ENDPOINT CONFIGURATION
     * Paste a Formspree / Web3Fo rms / custom endpoint URL here.
     * Leave empty ("") to keep the demo behaviour (no data is sent).
     * e.g. "https://formspree.io/f/xxxxxxx"
     */
    formEndpoint: "https://formspree.io/f/xkjojjae",
  },

  // --- Social links (remove any you don't use) ---------------
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/haruna-samson-39093a328", icon: "linkedin" },
  ],

  // --- Footer ------------------------------------------------
  footer: {
    description:
      "Academic project writing, research support and documentation for students who want their work to read as clearly as they thought it.",
    copyright: "© 2026 Pilgrim's desk. All rights reserved.",
    disclaimer:
      "This website provides academic writing, thesis, dissertations, and Project writing. Clients are responsible for reviewing and using delivered materials in accordance with their institution's academic integrity policies.",
  },
};

export const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Process", id: "process" },
  { label: "Testimonials", id: "testimonials" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
  siteConfig.contact.whatsappMessage,
)}`;
