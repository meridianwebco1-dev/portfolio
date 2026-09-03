"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Monitor, Smartphone, Globe, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Web Design",
    description: "Premium, conversion-optimized interfaces that command attention and communicate your brand's unique value proposition.",
    icon: Monitor,
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-[var(--color-meridian-navy)]/10 to-[var(--color-meridian-blue)]/5",
  },
  {
    title: "E-Commerce",
    description: "Scalable storefronts engineered to maximize AOV and streamline the path to purchase.",
    icon: Globe,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Mobile Apps",
    description: "Native-feeling progressive web apps that keep your users engaged on the go.",
    icon: Smartphone,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Custom Development",
    description: "Complex web applications and SaaS platforms built with modern, scalable architectures.",
    icon: Code2,
    className: "md:col-span-2 md:row-span-1",
  },
];

function ServiceCard({ service, index }: { service: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Normalize coordinates from -1 to 1 for 3D tilt
    const xPct = (x / width - 0.5) * 2;
    const yPct = (y / height - 0.5) * 2;
    
    mouseX.set(xPct * 5); // Max rotation degrees
    mouseY.set(yPct * -5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={cn(
        "group relative p-8 rounded-3xl glass border border-[var(--color-meridian-muted)]/20 overflow-hidden transition-colors hover:border-[var(--color-meridian-blue)]/50",
        service.className
      )}
    >
      <div className="relative z-10 flex flex-col h-full min-h-[220px]">
        <div className="w-14 h-14 rounded-2xl bg-[var(--foreground)]/5 flex items-center justify-center mb-6 flex-shrink-0 group-hover:bg-[var(--color-meridian-blue)] group-hover:text-white transition-colors duration-300">
          <service.icon size={28} />
        </div>
        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        <p className="text-[var(--color-meridian-muted)] text-lg leading-relaxed mt-auto">
          {service.description}
        </p>
      </div>

      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-meridian-blue)]/0 to-[var(--color-meridian-blue)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Digital Excellence. <br />
            <span className="text-[var(--color-meridian-muted)]">Engineered.</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-[var(--color-meridian-blue)]" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto md:auto-rows-[minmax(300px,auto)] gap-6 items-stretch">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Services Infographic */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 relative w-full aspect-square md:aspect-[2/1] rounded-3xl overflow-hidden glass bg-white/5 border border-[var(--color-meridian-muted)]/20 p-4 md:p-8 flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <Image 
              src="/services.jpg"
              alt="Meridian Core Services Overview"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
