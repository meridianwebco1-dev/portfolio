"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your business, understanding your goals, target audience, and market positioning. This foundation ensures every design decision is purpose-driven.",
  },
  {
    number: "02",
    title: "UX/UI Design",
    description: "Creating wireframes and high-fidelity prototypes. We obsess over user journeys, whitespace, and micro-interactions to craft interfaces that engage and convert.",
  },
  {
    number: "03",
    title: "Development",
    description: "Bringing designs to life with clean, scalable code. We use the latest tech stack to ensure your site is fast, secure, and accessible across all devices.",
  },
  {
    number: "04",
    title: "Launch & Iterate",
    description: "Rigorous testing, SEO setup, and performance optimization before going live. Post-launch, we analyze user behavior to continuously refine and improve.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="py-32 relative bg-[var(--background)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            How We <span className="text-[var(--color-meridian-blue)]">Work.</span>
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Animated SVG Line */}
          <div className="absolute left-[32px] md:left-[50%] top-0 bottom-0 w-1 -ml-[2px] md:-ml-[1px]">
            {/* Background line */}
            <div className="absolute inset-0 bg-[var(--foreground)]/10" />
            
            {/* Foreground animated line */}
            <motion.div
              style={{ scaleY: pathLength, originY: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-[var(--color-meridian-blue)] to-[var(--color-meridian-navy)]"
            />
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between group">
                  {/* Step Number Bubble */}
                  <div className="absolute left-[32px] md:left-1/2 -ml-8 w-16 h-16 rounded-full glass border border-[var(--color-meridian-blue)]/30 flex items-center justify-center text-xl font-bold z-10 bg-[var(--background)] text-[var(--foreground)] transition-colors group-hover:bg-[var(--color-meridian-blue)] group-hover:text-white group-hover:border-[var(--color-meridian-blue)]">
                    {step.number}
                  </div>

                  {/* Content Left / Right (Desktop) */}
                  <div className={`w-full md:w-5/12 pl-24 md:pl-0 ${isEven ? 'md:text-right md:pr-16 md:ml-0' : 'md:text-left md:pl-16 md:ml-auto'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="p-8 rounded-3xl bg-[var(--foreground)]/5 border border-[var(--color-meridian-muted)]/10 hover:border-[var(--color-meridian-blue)]/30 transition-colors"
                    >
                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                      <p className="text-[var(--color-meridian-muted)] leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
