"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Sparkles, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Luxury pet spa"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/50 to-transparent" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl sm:text-4xl opacity-20 dark:opacity-40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          >
            🐾
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mt-12 sm:mt-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-gold-light" />
          <span className="text-white/90 text-sm font-medium">
            Premium Pet Grooming in Harrow
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Where Every Pet{" "}
          <span className="text-gradient-gold inline-block">Gets the</span>
          <br />
          <span className="text-gradient-gold">Royal Treatment</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Luxury one-to-one grooming and spa treatments in a calm, nurturing
          environment. Because your furry family deserves the best.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/booking" className="btn-primary !py-4 !px-8 !text-base">
            <Calendar className="w-5 h-5" />
            <span>Book Your Spa Day</span>
          </Link>
          <Link
            href="/services"
            className="btn-secondary !bg-transparent !border-white/30 !text-white hover:!bg-white/10 !py-4 !px-8 !text-base transition-all duration-300"
          >
            <span>Explore Services</span>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {[
            { icon: "🌟", label: "5-Star Rated" },
            { icon: "💝", label: "One-to-One Care" },
            { icon: "🧘‍♀️", label: "Stress-Free Environment" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-white/90 font-medium"
            >
              <span className="text-2xl drop-shadow-md">{badge.icon}</span>
              <span className="text-sm">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </section>
  );
}
