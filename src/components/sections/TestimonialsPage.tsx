"use client";

import { Reveal } from "@/components/ui/SectionHeading";
import { TestimonialsCarousel } from "@/components/ui/TestimonialsCarousel";

type Item = { quote: string; name: string; detail: string; id?: string };

export function TestimonialsSliderSection({ items }: { items: Item[] }) {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-crimson uppercase">
            Client Stories
          </p>
          <h2 className="font-heading text-[clamp(1.85rem,7vw,3rem)] text-ice">
            What Clients Say
          </h2>
        </Reveal>

        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
