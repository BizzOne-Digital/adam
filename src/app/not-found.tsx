import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      <div className="absolute inset-0 bg-panel-gradient" />
      <div className="bg-red-glow absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2" />
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <span className="relative mx-auto mb-6 block h-24 w-24">
          <Image
            src={SITE.logo}
            alt={SITE.name}
            fill
            className="object-contain"
            sizes="96px"
          />
        </span>
        <p className="text-xs font-semibold tracking-[0.3em] text-crimson uppercase">
          404
        </p>
        <h1 className="font-heading mt-3 text-[clamp(2.25rem,9vw,3.75rem)] text-ice sm:text-6xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href="/" showArrow>
            Back to Home
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost">
            Contact Coach
          </MagneticButton>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted">
          <Link href="/services" className="hover:text-ice">
            Services
          </Link>
          <Link href="/gallery" className="hover:text-ice">
            Gallery
          </Link>
          <Link href="/about" className="hover:text-ice">
            About
          </Link>
        </div>
      </div>
    </section>
  );
}
