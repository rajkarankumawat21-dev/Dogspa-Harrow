import { HeroSection } from "@/components/home/HeroSection";
import { StorySection } from "@/components/home/StorySection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PackagesSection } from "@/components/home/PackagesSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FAQSection } from "@/components/home/FAQSection";
import { InteractivePaws } from "@/components/home/InteractivePaws";
import { Calendar, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://dogspa-harrow.vercel.app",
            name: "DOGSPA",
            description: "Luxury Dog & Cat Grooming in Harrow",
            url: "https://dogspa-harrow.vercel.app",
            telephone: "+44 7123 456789",
            email: "hello@dogspa.co.uk",
            image: "https://dogspa-harrow.vercel.app/images/hero.png",
            priceRange: "££",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Harrow",
              addressRegion: "London",
              addressCountry: "GB",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 51.5802,
              longitude: -0.3416,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "47",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Pet Grooming Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Full Luxury Groom",
                    description:
                      "Complete grooming including bath, blow-dry, haircut, ear cleaning, nail trimming",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Spa Bath & Tidy",
                    description:
                      "Refreshing spa bath with conditioning, blow-dry, and tidy",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Aromatherapy Spa",
                    description:
                      "Ultimate relaxation with lavender bath, massage, and aromatherapy",
                  },
                },
              ],
            },
          }),
        }}
      />

      <HeroSection />
      <StorySection />
      <ServicesPreview />
      <PackagesSection />
      <GalleryPreview />
      <TestimonialsSection />
      <WhyChooseUs />
      <FAQSection />

      {/* Final CTA Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-gold" />
        <InteractivePaws />
        <div className="relative z-10 text-center px-4">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy dark:text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Pamper Your Pet?
          </h2>
          <p className="text-charcoal/80 dark:text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Book their luxury spa day today and see the transformation for
            yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/booking"
              className="relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 active:translate-y-1 bg-white dark:bg-[#272730] border-2 border-navy/30 dark:border-white/30 text-navy dark:text-white shadow-soft hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_15px_30px_-5px_rgba(255,255,255,0.15)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Calendar className="w-5 h-5 relative z-10" />
              <span className="relative z-10 text-lg">Book Online</span>
            </a>
            <a
              href="https://wa.me/447000000000?text=Hi%20DOGSPA!%20I'd%20like%20to%20book%20a%20grooming%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 active:translate-y-1 bg-transparent border-2 border-navy/30 dark:border-white/30 text-navy dark:text-white hover:bg-navy/5 dark:hover:bg-white/10 hover:shadow-lg group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <MessageCircle className="w-5 h-5 relative z-10" />
              <span className="relative z-10 text-lg">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
