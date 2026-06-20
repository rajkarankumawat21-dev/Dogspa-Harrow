"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function WhatsAppCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const whatsappUrl =
    "https://wa.me/447000000000?text=Hi%20DOGSPA!%20I'd%20like%20to%20enquire%20about%20your%20grooming%20services.";

  return (
    <div className="fixed bottom-[90px] right-6 sm:bottom-6 sm:right-6 z-30 flex flex-col items-end gap-3">
      {/* Expanded Chat Bubble */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-elevated p-5 w-72 mb-2 dark:bg-[#272730]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-navy dark:text-white/90">
                  DOGSPA
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-blush-light dark:bg-white/5 rounded-xl p-3 mb-4">
              <p className="text-sm text-charcoal dark:text-gray-300">
                Hello! 🐾 Welcome to DOGSPA. How can we help your furry friend
                today?
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Start Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons Container */}
      <div className="flex flex-col items-center gap-5">
        {/* Dark Mode Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-[#272730] text-navy dark:text-gold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Night Mode"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
          <span className="hidden sm:block absolute right-full mr-3 bg-navy text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {theme === "dark" ? "Light Mode" : "Night Mode"}
          </span>
        </motion.button>

        {/* WhatsApp FAB */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 text-white shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />

          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />

          {/* Tooltip on desktop hover */}
          <span className="hidden sm:block absolute right-full mr-3 bg-navy text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us! 💬
          </span>
        </motion.button>
      </div>
    </div>
  );
}
