"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // The booking page is the only page that doesn't start with a dark hero section
  const isLightHero = pathname === "/booking";
  const isScrolledOrLight = isScrolled || isLightHero;

  // Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-white/90 dark:bg-[#16161A]/90 backdrop-blur-xl shadow-md py-3 border-b border-transparent dark:border-white/10"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full">
                <Image
                  src="/images/logo.png"
                  alt="DOGSPA"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
              <span
                className={`font-heading text-xl sm:text-2xl font-bold tracking-wide transition-colors duration-300 ${isScrolledOrLight ? "text-navy dark:text-white" : "text-white"
                  }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                DOG<span className="text-gradient-gold">SPA</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium text-sm tracking-wide uppercase transition-colors duration-300 hover:!text-gold group ${isScrolledOrLight ? "text-charcoal dark:text-gray-200" : "text-white"
                    }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+447000000000"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isScrolledOrLight
                    ? "text-charcoal dark:text-gray-200 hover:!text-gold"
                    : "text-white hover:!text-gold-light"
                  }`}
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
              <Link
                href="/booking"
                className="btn-primary !py-2.5 !px-5 !text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolledOrLight ? "text-navy dark:text-white" : "text-white"
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
            >
              {/* Close Button Inside Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-4 p-2 text-navy hover:text-gold transition-colors z-10"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col h-full pt-20 px-6">
                {/* Nav Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 px-4 text-lg font-medium text-navy hover:text-gold hover:bg-blush-light rounded-lg transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTAs */}
                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href="/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary justify-center"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Your Spa Day</span>
                  </Link>
                  <a
                    href="https://wa.me/447000000000?text=Hi%20DOGSPA!%20I'd%20like%20to%20enquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary justify-center"
                  >
                    <span>💬</span>
                    <span>WhatsApp Us</span>
                  </a>
                </div>

                {/* Contact Info */}
                <div className="mt-auto pb-8">
                  <p className="text-sm text-gray-500">
                    📍 Harrow, United Kingdom
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    📞 +44 7000 000 000
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
