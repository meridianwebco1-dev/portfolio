"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const tagline = "Crafting digital solutions that drive results.".split(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[var(--color-meridian-blue)]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[var(--color-meridian-navy)]/40 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-meridian-muted)]/30 bg-white/5 dark:bg-black/20 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-meridian-blue)] animate-pulse" />
          <span className="text-sm font-medium">Top 1% Design & Dev Agency</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter max-w-5xl leading-tight mb-8 text-balance">
          {tagline.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className="inline-block mr-[0.25em] py-1"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-[var(--color-meridian-muted)] max-w-2xl mb-12"
        >
          We engineer premium digital experiences that elevate brands, engage audiences, and scale businesses to new heights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="#work"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Our Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
          </Link>
          
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[var(--color-meridian-muted)]/30 font-medium text-lg hover:bg-[var(--foreground)]/5 transition-colors"
          >
            Let's Talk
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-[var(--color-meridian-muted)] font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-[var(--color-meridian-muted)]/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-[var(--foreground)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
