"use client";

import { motion } from "framer-motion";

const technologies = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Node.js", "GraphQL", "PostgreSQL", "Vercel", "Stripe", "Prisma",
  "AWS", "Figma", "Webflow"
];

export function TechStack() {
  return (
    <section className="py-24 border-y border-[var(--color-meridian-muted)]/10 overflow-hidden bg-[var(--foreground)]/5">
      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <h3 className="text-center text-sm font-medium uppercase tracking-widest text-[var(--color-meridian-muted)]">
          Powered by industry-leading technology
        </h3>
      </div>
      
      <div className="relative flex whitespace-nowrap group">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
        
        {/* Animated Track */}
        <div 
          className="flex gap-16 px-8 animate-marquee hover:[animation-play-state:paused]"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center"
            >
              <span className="text-3xl md:text-5xl font-bold text-[var(--foreground)]/20 hover:text-[var(--foreground)] transition-colors cursor-default">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
