"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Calendar } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const storyScenes = [
  {
    id: 1,
    image: "/images/story/scene-1-arrival-v3.png",
    title: "A Happy Arrival",
    description:
      "Your furry friend is excited — it's spa day! Every visit begins with a warm, tail-wagging welcome at our DOGSPA entrance.",
  },
  {
    id: 2,
    image: "/images/story/scene-2-bath-v3.png",
    title: "The Zen Bath",
    description:
      "A warm, bubbly spa bath with premium hypoallergenic products. Pure bliss for sensitive skin and silky coats.",
  },
  {
    id: 3,
    image: "/images/story/scene-3-styling-v3.png",
    title: "Expert Styling",
    description:
      "Our skilled groomers craft the perfect look — from breed-standard cuts to custom styles your pet will love.",
  },
  {
    id: 4,
    image: "/images/story/scene-4-reveal-v3.png",
    title: "The Big Reveal",
    description:
      "The moment you've been waiting for — witness the stunning transformation. Prepare to be amazed! ✨",
  },
];

const gradients = [
  "linear-gradient(137deg, #9E8033 0%, #C8A951 45%, #F4E4DC 100%)",
  "linear-gradient(137deg, #D4C5E2 0%, #7DD3FC 45%, #06B6D4 100%)",
  "linear-gradient(137deg, #B5C4B1 0%, #9E8033 45%, #C8A951 100%)",
  "linear-gradient(137deg, #C8A951 0%, #E8B4B4 45%, #D4C5E2 100%)",
];

function GlassCard({
  scene,
  index,
}: {
  scene: (typeof storyScenes)[0];
  index: number;
}) {
  const { theme } = useTheme();
  
  const cardBgColor = theme === "dark" ? "#272730" : "#FFFFFF";
  const textColor = theme === "dark" ? "text-white" : "text-navy";
  const descColor = theme === "dark" ? "text-gray-400" : "text-charcoal/70";
  const gradient = gradients[index];

  return (
    <div className="relative w-[90vw] md:w-[75vw] lg:w-[70vw] max-w-[1000px] h-full group shadow-2xl rounded-[40px]">
      {/* Glow Background */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-60 rounded-[40px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: gradient,
          filter: "blur(45px)",
        }}
      />
      
      {/* Foreground Card */}
      <div
        className="relative self-stretch w-full h-full rounded-[40px] z-10 overflow-hidden glowing-card-border flex flex-col md:flex-row"
        style={{
          background: `linear-gradient(${cardBgColor}, ${cardBgColor}) padding-box, ${gradient} border-box`,
        }}
      >
        {/* Image Side */}
        <div className={`w-full md:w-1/2 relative h-[45%] md:h-full ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
           <Image 
             src={scene.image} 
             alt={scene.title} 
             fill 
             className="object-cover" 
             sizes="(max-width: 768px) 85vw, 40vw"
             priority={index === 0} 
           />
           <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center text-lg font-bold shadow-lg z-10">
              {scene.id}
           </div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-center h-[55%] md:h-full">
           <span className="text-gold text-sm font-semibold uppercase tracking-widest mb-1 md:mb-2">
             Step {scene.id}
           </span>
           <h3 className={`font-medium text-2xl sm:text-3xl md:text-4xl mb-2 md:mb-4 tracking-tight ${textColor}`} style={{ fontFamily: "var(--font-heading)" }}>
             {scene.title}
           </h3>
           <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${descColor}`}>
             {scene.description}
           </p>
        </div>
      </div>
    </div>
  );
}

function SlideWrapper({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  let input: number[] = [];
  let output: string[] = [];

  // Define exact scroll ranges for each card to "pause" in the center
  if (index === 0) {
    input = [0, 0.15, 0.25, 1];
    output = ["0vw", "0vw", "-100vw", "-100vw"];
  } else if (index === 1) {
    input = [0, 0.15, 0.25, 0.40, 0.50, 1];
    output = ["100vw", "100vw", "0vw", "0vw", "-100vw", "-100vw"];
  } else if (index === 2) {
    input = [0, 0.40, 0.50, 0.65, 0.75, 1];
    output = ["100vw", "100vw", "0vw", "0vw", "-100vw", "-100vw"];
  } else if (index === 3) {
    input = [0, 0.65, 0.75, 0.90, 1];
    output = ["100vw", "100vw", "0vw", "0vw", "-100vw"];
  }

  const x = useTransform(progress, input, output);

  return (
    <motion.div
      style={{ x }}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

function MobileGlassCard({ scene, index }: { scene: typeof storyScenes[0]; index: number }) {
  const { theme } = useTheme();
  const cardBgColor = theme === "dark" ? "#272730" : "#FFFFFF";
  const textColor = theme === "dark" ? "text-white" : "text-navy";
  const descColor = theme === "dark" ? "text-gray-400" : "text-charcoal/70";
  const gradient = gradients[index];

  return (
    <div className="relative w-full h-[65vh] max-h-[600px] shadow-2xl rounded-[30px] sm:rounded-[40px]">
      <div className="absolute inset-0 opacity-60 rounded-[30px] sm:rounded-[40px] pointer-events-none" style={{ background: gradient, filter: "blur(20px)" }} />
      <div className="relative w-full h-full rounded-[30px] sm:rounded-[40px] z-10 overflow-hidden flex flex-col" style={{ background: `linear-gradient(${cardBgColor}, ${cardBgColor}) padding-box, ${gradient} border-box` }}>
        {/* Image Side */}
        <div className="w-full h-[45%] relative overflow-hidden shrink-0">
           <Image src={scene.image} alt={scene.title} fill className="object-cover" sizes="85vw" priority={index === 0} />
           <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center text-base font-bold shadow-lg z-10">{scene.id}</div>
        </div>
        {/* Text Side */}
        <div className="w-full flex-grow p-5 sm:p-6 flex flex-col justify-center">
           <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1 sm:mb-2">Step {scene.id}</span>
           <h3 className={`font-medium text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight ${textColor}`} style={{ fontFamily: "var(--font-heading)" }}>{scene.title}</h3>
           <p className={`text-sm sm:text-base leading-relaxed ${descColor}`}>{scene.description}</p>
        </div>
      </div>
    </div>
  );
}

export function StorySection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const { theme } = useTheme();

  // Apply a smooth spring physics wrapper to the raw scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // CTA Animations (pops up at the very end as Card 4 slides away)
  const ctaOpacity = useTransform(smoothProgress, [0.90, 1], [0, 1]);
  const ctaScale = useTransform(smoothProgress, [0.90, 1], [0.8, 1]);
  // Prevent clicks when invisible
  const pointerEvents = useTransform(smoothProgress, [0.90, 0.95], ["none", "auto"]);

  return (
    <>
      <section ref={targetRef} className={`hidden md:block relative z-20 h-[800vh] transition-colors duration-500 ${theme === 'dark' ? 'bg-[#16161A]' : 'bg-cream'}`}>
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Header - Stays visible statically */}
        <div
          className="text-center px-4 z-20 pt-16 md:pt-20 flex-shrink-0"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            The DOGSPA Journey
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mt-2 transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-navy'}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Day at the Spa
          </h2>
          <p className={`max-w-2xl mx-auto mt-2 md:mt-3 text-base md:text-lg transition-colors duration-500 ${theme === 'dark' ? 'text-gray-400' : 'text-charcoal/70'}`}>
            Follow along as your pet experiences the ultimate luxury grooming
            journey from start to finish.
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative w-full flex-grow min-h-0 mt-4 mb-6 md:mt-6 md:mb-8">
          
          {/* Individual Story Cards gliding one by one */}
          {storyScenes.map((scene, index) => (
            <SlideWrapper key={scene.id} index={index} progress={smoothProgress}>
              <GlassCard scene={scene} index={index} />
            </SlideWrapper>
          ))}

          {/* Final CTA Card popping up */}
          <motion.div
            style={{ 
              opacity: ctaOpacity, 
              scale: ctaScale,
              pointerEvents: pointerEvents as unknown as "auto" | "none"
            }}
            className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50"
          >
            <div className="w-[90vw] md:w-[75vw] lg:w-[70vw] max-w-[1000px] h-full flex flex-col items-center justify-center bg-navy rounded-[40px] p-8 md:p-16 shadow-2xl text-center border border-white/10">
              <h3
                className="text-3xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready for Your Pet&apos;s Transformation?
              </h3>
              <p className="text-cream/80 text-lg md:text-xl mb-10 max-w-2xl">
                Experience the luxury of DOGSPA. Appointments are limited to ensure
                a calm, one-to-one experience.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-navy transition-colors duration-300 shadow-lg text-lg"
              >
                <Calendar className="w-6 h-6" />
                <span>Book Their Spa Day</span>
              </Link>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>

      {/* MOBILE VIEW: Horizontal Swipe Carousel */}
      <section className={`md:hidden relative z-20 py-20 overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-[#16161A]' : 'bg-cream'}`}>
        <div className="text-center px-4 mb-8">
          <span className="text-gold text-xs font-semibold uppercase tracking-widest">
            The DOGSPA Journey
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-bold mt-2 mb-3 ${theme === 'dark' ? 'text-white' : 'text-navy'}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Day at the Spa
          </h2>
          <p className={`text-sm sm:text-base max-w-xs mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-charcoal/70'}`}>
            Swipe to explore the ultimate luxury grooming journey.
          </p>
        </div>

        {/* Swipeable Container */}
        <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 pt-4 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {storyScenes.map((scene, index) => (
            <div key={scene.id} className="min-w-[85vw] sm:min-w-[400px] max-w-[400px] snap-center shrink-0">
              <MobileGlassCard scene={scene} index={index} />
            </div>
          ))}

          {/* CTA Card */}
          <div className="min-w-[85vw] sm:min-w-[400px] max-w-[400px] snap-center shrink-0 flex flex-col items-center justify-center bg-navy rounded-[30px] sm:rounded-[40px] p-8 shadow-2xl text-center border border-white/10 h-[65vh] max-h-[600px]">
            <h3 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Ready for Your Pet's Transformation?
            </h3>
            <p className="text-cream/80 text-sm sm:text-base mb-8">
              Experience the luxury of DOGSPA. Appointments are limited.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-navy transition-colors duration-300 shadow-lg text-lg w-full"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Spa Day</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
