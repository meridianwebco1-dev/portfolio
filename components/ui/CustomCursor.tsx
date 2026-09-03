"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a clickable element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [pathname]);

  // Smooth springs for cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  // Avoid rendering on touch devices (SSR safe)
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white mix-blend-difference rounded-full pointer-events-none z-[10000]"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white mix-blend-difference rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
          backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
