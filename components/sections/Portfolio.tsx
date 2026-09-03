"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/lib/data/portfolio";

export function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-75%"]);

  return (
    <section id="work" ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-[var(--background)]">
        
        {/* Section Header overlay */}
        <div className="absolute top-32 left-6 md:left-24 z-10 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Selected <span className="text-[var(--color-meridian-muted)]">Works.</span>
          </motion.h2>
        </div>

        {/* Horizontal scroll track */}
        <div className="w-full flex items-center h-full pt-16">
          <motion.div style={{ x }} className="flex gap-8 px-6 md:px-24">
          {portfolioData.map((project, index) => {
            return (
              <Link 
                href={`/portfolio/${project.slug}`}
                key={index}
                className="group relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden flex-shrink-0 cursor-pointer block"
              >
                {/* Parallax Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </motion.div>
                </div>

                {/* Content Reveal */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[var(--color-meridian-blue)] font-medium tracking-wide uppercase text-sm mb-2">{project.category}</p>
                  <h3 className="text-3xl md:text-5xl font-bold text-white">{project.title}</h3>
                </div>
              </Link>
            );
          })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
