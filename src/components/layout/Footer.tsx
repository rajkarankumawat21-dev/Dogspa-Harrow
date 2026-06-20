import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Book Online" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services#grooming", label: "Full Grooming" },
  { href: "/services#spa", label: "Spa Treatments" },
  { href: "/services#puppy", label: "Puppy First Visit" },
  { href: "/services#cat", label: "Cat Grooming" },
  { href: "/services#pickup", label: "Pickup & Drop" },
];

const seoLinks = [
  { href: "/dog-grooming-harrow", label: "Dog Grooming Harrow" },
  { href: "/dog-spa-harrow", label: "Dog Spa Harrow" },
  { href: "/cat-grooming-harrow", label: "Cat Grooming Harrow" },
  { href: "/pet-grooming-harrow", label: "Pet Grooming Harrow" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white/10">
                <Image
                  src="/images/logo.png"
                  alt="DOGSPA"
                  fill
                  className="object-cover"
                />
              </div>
              <span
                className="text-2xl font-bold tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                DOG<span className="text-gold">SPA</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Premium one-to-one pet grooming and wellness in Harrow. Where
              every pet gets the luxury treatment they deserve.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/dogspa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <span className="text-lg">📸</span>
              </a>
              <a
                href="https://facebook.com/dogspa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <span className="text-lg">📘</span>
              </a>
              <a
                href="https://wa.me/447000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <span className="text-lg">💬</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-5 text-gold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-lg font-semibold mb-5 text-gold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-lg font-semibold mb-5 text-gold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Harrow, London
                  <br />
                  United Kingdom
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <a
                  href="tel:+447000000000"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  +44 7000 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a
                  href="mailto:hello@dogspa.co.uk"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  hello@dogspa.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Mon – Sat: 9:00 AM – 6:00 PM
                  <br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Links Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {seoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-gold text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-40 sm:pb-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} DOGSPA Harrow. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                href="/privacy"
                className="text-white/40 hover:text-white/70 text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/40 hover:text-white/70 text-xs transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
