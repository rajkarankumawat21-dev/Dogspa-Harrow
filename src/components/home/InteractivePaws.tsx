"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const pawsData = [
  { left: "5%", top: "15%", rotate: "45deg" },
  { left: "18%", top: "65%", rotate: "-20deg" },
  { left: "15%", top: "35%", rotate: "110deg" },
  { left: "38%", top: "80%", rotate: "15deg" },
  { left: "60%", top: "12%", rotate: "85deg" },
  { left: "65%", top: "70%", rotate: "-120deg" },
  { left: "75%", top: "35%", rotate: "10deg" },
  { left: "85%", top: "85%", rotate: "-45deg" },
  { left: "92%", top: "20%", rotate: "135deg" },
  { left: "12%", top: "88%", rotate: "-80deg" },
  { left: "48%", top: "92%", rotate: "20deg" },
  { left: "72%", top: "8%", rotate: "160deg" },
  { left: "35%", top: "5%", rotate: "-30deg" },
];

export function InteractivePaws() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ensure we only render the random logic on client to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {mounted && pawsData.map((paw, i) => (
        <InteractivePaw key={i} paw={paw} containerRef={containerRef} index={i} />
      ))}
    </div>
  );
}

function InteractivePaw({ paw, containerRef, index }: any) {
  const pawRef = useRef<HTMLSpanElement>(null);
  
  // A single spring representing the "step" state: 0 = original, 1 = stepped away
  const stepProgress = useSpring(0, { stiffness: 120, damping: 15 });
  
  // State to store the calculated "step away" vector
  const [stepVector, setStepVector] = useState({ x: 0, y: 0, rotate: 0 });

  useEffect(() => {
    // Calculate the outward step vector once when mounted
    if (!pawRef.current || !containerRef.current) return;
    
    const rect = pawRef.current.getBoundingClientRect();
    const pawX = rect.left + rect.width / 2;
    const pawY = rect.top + rect.height / 2;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    
    const outDx = pawX - centerX;
    const outDy = pawY - centerY;
    const outDist = Math.sqrt(outDx * outDx + outDy * outDy) || 1;
    
    // The fixed distance for the "step"
    const stepDistance = 70;
    const stepX = (outDx / outDist) * stepDistance;
    const stepY = (outDy / outDist) * stepDistance;
    
    // Add a slight tilt to the step
    const stepRotation = index % 2 === 0 ? 30 : -30;
    
    setStepVector({ x: stepX, y: stepY, rotate: stepRotation });
  }, [containerRef, index]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pawRef.current) return;
      
      const rect = pawRef.current.getBoundingClientRect();
      const pawX = rect.left + rect.width / 2;
      const pawY = rect.top + rect.height / 2;

      const dx = e.clientX - pawX;
      const dy = e.clientY - pawY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If mouse is near, take a step!
      if (distance < 200) {
        stepProgress.set(1);
      } else {
        stepProgress.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [stepProgress]);

  // Transform values for the Original Paw (fades out slightly)
  const originalOpacity = useTransform(stepProgress, [0, 1], [1, 0.15]);
  const originalScale = useTransform(stepProgress, [0, 1], [1, 0.9]);

  // Transform values for the Stepped Paw (fades in and lands)
  const steppedOpacity = useTransform(stepProgress, [0, 1], [0, 1]);
  const steppedScale = useTransform(stepProgress, [0, 0.5, 1], [0.5, 1.2, 1]); // slight bounce

  return (
    <span
      ref={pawRef}
      className="absolute text-5xl sm:text-6xl opacity-30 dark:opacity-60 dark:brightness-125"
      style={{
        left: paw.left,
        top: paw.top,
        transform: `rotate(${paw.rotate})`,
      }}
    >
      {/* Original Paw Position */}
      <motion.div
        style={{
          opacity: originalOpacity,
          scale: originalScale,
          transformOrigin: "center center"
        }}
      >
        🐾
      </motion.div>

      {/* The "Step Away" Position */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: stepVector.x,
          y: stepVector.y,
          rotate: stepVector.rotate,
          opacity: steppedOpacity,
          scale: steppedScale,
          transformOrigin: "center center"
        }}
      >
        🐾
      </motion.div>
    </span>
  );
}
