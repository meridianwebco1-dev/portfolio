"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Meridian didn't just build a website; they transformed our digital presence. Our conversion rate increased by 140% in the first quarter alone. Their attention to micro-interactions makes the site feel alive.",
    author: "Sarah Jenkins",
    role: "CMO, Nexus Tech",
  },
  {
    quote: "The team's obsession with performance and design detail is unparalleled. They delivered an experience that positions us as the undisputed premium choice in our market.",
    author: "David Chen",
    role: "Founder, Elevate App",
  },
  {
    quote: "Working with Meridian was seamless. They understood our brand immediately and translated it into a digital experience that our competitors are now trying to copy. Worth every penny.",
    author: "Elena Rodriguez",
    role: "VP of Product, Aura",
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="py-32 bg-[var(--foreground)]/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tighter"
          >
            Client <span className="text-[var(--color-meridian-blue)]">Success.</span>
          </motion.h2>
        </div>

        <div 
          className="relative h-[450px] md:h-[350px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  next();
                } else if (swipe > swipeConfidenceThreshold) {
                  prev();
                }
              }}
              className="absolute w-full max-w-4xl text-center px-4 md:px-12 cursor-grab active:cursor-grabbing"
            >
              <Quote className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-8 text-[var(--color-meridian-blue)]/20" />
              <p className="text-xl md:text-3xl lg:text-4xl font-medium leading-tight mb-8 text-balance">
                "{testimonials[currentIndex].quote}"
              </p>
              <div>
                <p className="font-bold text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-[var(--color-meridian-muted)]">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-12 relative z-20">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-full border border-[var(--color-meridian-muted)]/30 flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-full border border-[var(--color-meridian-muted)]/30 flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
