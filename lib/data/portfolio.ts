export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  image: string;
  gallery: string[];
  liveLink?: string;
};

export const portfolioData: CaseStudy[] = [
  {
    slug: "fintech-dashboard",
    title: "FinTech Dashboard",
    client: "Acme Finance",
    category: "Web App",
    description: "A comprehensive financial dashboard allowing users to track their investments, manage portfolios, and analyze market trends in real-time.",
    challenge: "The client needed a scalable, highly performant dashboard capable of handling millions of real-time WebSocket events without dropping frames on the client-side.",
    solution: "We built the frontend using Next.js and React Server Components to minimize client bundle size, and integrated heavily optimized WebGL charts for rendering complex financial data smoothly.",
    results: [
      "40% increase in user session duration",
      "Reduced time-to-interactive by 2.5s",
      "Successfully handles 50,000+ concurrent users"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "D3.js", "WebSockets"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop"
    ],
    liveLink: "https://example.com/fintech"
  },
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    client: "Luxe Apparel",
    category: "E-Commerce",
    description: "A premium headless e-commerce experience for a luxury fashion brand, featuring blazing fast page loads and seamless checkout.",
    challenge: "The previous monolithic architecture was slow and difficult to update, leading to high cart abandonment rates.",
    solution: "We migrated the storefront to a headless architecture using Next.js commerce and Shopify Storefront API. We implemented edge caching to deliver sub-second page loads globally.",
    results: [
      "65% improvement in conversion rate",
      "120% increase in mobile sales",
      "Sub-second page load times globally"
    ],
    techStack: ["Next.js", "Shopify API", "Stripe", "Framer Motion", "Vercel"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop"
    ],
    liveLink: "https://example.com/ecommerce"
  },
  {
    slug: "healthcare-app",
    title: "Healthcare App",
    client: "MediCare Plus",
    category: "Mobile Design",
    description: "A patient-centric mobile application designed to simplify appointment booking, telehealth consultations, and prescription management.",
    challenge: "Complex navigation and poor accessibility in the legacy app made it difficult for elderly patients to use.",
    solution: "We completely redesigned the UX/UI with a focus on accessibility (WCAG AA compliant), larger touch targets, and a simplified user flow for core tasks.",
    results: [
      "95% positive user feedback",
      "30% reduction in support calls",
      "Doubled telehealth appointment bookings"
    ],
    techStack: ["Figma", "React Native", "Expo", "Node.js", "GraphQL"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    ],
    liveLink: "https://example.com/healthcare"
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return portfolioData.find((study) => study.slug === slug);
}
