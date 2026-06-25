import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

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
  { href: "/locations/dog-grooming-harrow", label: "Dog Grooming Harrow" },
  { href: "/locations/dog-spa-harrow", label: "Dog Spa Harrow" },
  { href: "/locations/cat-grooming-harrow", label: "Cat Grooming Harrow" },
  { href: "/locations/pet-grooming-harrow", label: "Pet Grooming Harrow" },
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
            <div className="flex gap-4">
              <a
                href="https://instagram.com/dogspa"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold transition-all duration-500 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:border-gold/50"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
              </a>
              <a
                href="https://facebook.com/dogspa"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold transition-all duration-500 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:border-gold/50"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
              </a>
              <a
                href="https://wa.me/447000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold transition-all duration-500 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:border-gold/50"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
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
                    className="group flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-300 w-fit"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold group-hover:scale-150 transition-all duration-300" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                    </span>
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
                    className="group flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-300 w-fit"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold group-hover:scale-150 transition-all duration-300" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                    </span>
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
