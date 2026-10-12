import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Marquee from "@/components/Marquee";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import Footer from "@/components/Footer";

export default function HomePage() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      {/* ---- HERO ---- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-6">
        {/* Grid lines */}
        <div className="absolute top-[38%] left-0 right-0 h-px bg-black/[0.05]" />
        <div className="absolute bottom-[28%] left-0 right-0 h-px bg-black/[0.05]" />
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-black/[0.04] hidden lg:block" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-black/[0.04] hidden lg:block" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl w-full">
          <div className="mb-10">
            <span className="inline-block font-mono text-xs font-bold tracking-[0.45em] text-black/30 uppercase bg-black/[0.05] border border-black/10 px-4 py-2">
              Spring / Summer 2026 — Richmond, VA
            </span>
          </div>

          {/* Logo image — large in hero */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/logo.png"
              alt="Letter Store"
              width={600}
              height={200}
              className="w-[min(540px,80vw)] h-auto object-contain"
              priority
            />
          </div>

          <p className="font-display text-[6vw] sm:text-[4vw] lg:text-[3vw] text-black tracking-wider mb-14">
            New NYC.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalog"
              className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-white bg-black px-14 py-4 hover:bg-fti-acid hover:text-black transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98] inline-block"
            >
              Shop Now
            </Link>
            <Link
              href="/catalog"
              className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-black/60 hover:text-black border border-black/20 hover:border-black px-14 py-4 transition-all duration-200"
            >
              New Arrivals
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-xs font-medium tracking-[0.4em] text-black/25 uppercase">
            Scroll
          </span>
          <div className="w-px h-14 bg-gradient-to-b from-black/20 to-transparent" />
        </div>

        {/* Vertical side label */}
        <div className="absolute bottom-10 right-6 hidden sm:block">
          <span className="font-mono text-[10px] font-medium tracking-[0.25em] text-black/20 uppercase [writing-mode:vertical-lr] rotate-180">
            Letter Store — Richmond, VA
          </span>
        </div>
      </section>

      {/* ---- MARQUEE ---- */}
      <Marquee />

      {/* ---- NEW ARRIVALS ---- */}
      <section className="py-28 px-6 bg-fti-black">
        <div className="max-w-screen-2xl mx-auto">
          <FadeInWhenVisible>
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="font-mono text-xs font-bold tracking-[0.45em] text-fti-acid uppercase block mb-4">
                  Just Dropped
                </span>
                <h2 className="font-display leading-none text-fti-white">
                  <span className="block text-7xl md:text-9xl">New</span>
                  <span className="block text-7xl md:text-9xl text-fti-white/20">
                    Arrivals
                  </span>
                </h2>
              </div>
              <Link
                href="/catalog"
                className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-fti-white/40 hover:text-fti-acid transition-colors border-b border-fti-border hover:border-fti-acid pb-1 self-end mb-3"
              >
                View All →
              </Link>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {newArrivals.map((product, i) => (
              <FadeInWhenVisible key={product.id} delay={i * 80}>
                <ProductCard product={product} />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>


      {/* ---- SECONDARY MARQUEE ---- */}
      <Marquee
        text="LIMITED DROPS ★ LETTER STORE RVA ★ NEW NYC ★ "
        bgColor="bg-fti-gray"
        textColor="text-fti-white/20"
        reverse
      />

      {/* ---- CATEGORY LINKS ---- */}
      <section className="py-28 px-6 bg-fti-black">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInWhenVisible>
              <div>
                <span className="font-mono text-xs font-bold tracking-[0.45em] text-fti-white/30 uppercase block mb-5">
                  Full Collection
                </span>
                <h2 className="font-display leading-none text-fti-white">
                  <span className="block text-8xl md:text-9xl">Shop</span>
                  <span className="block text-8xl md:text-9xl text-fti-acid">All</span>
                </h2>
              </div>
            </FadeInWhenVisible>
            <div className="flex flex-col divide-y divide-fti-border">
              {[
                { label: "Tees", count: "2 styles" },
                { label: "Hoodies", count: "2 styles" },
                { label: "Hats", count: "1 style" },
                { label: "Shorts", count: "1 style" },
              ].map((cat, i) => (
                <FadeInWhenVisible key={cat.label} delay={i * 70}>
                  <Link
                    href="/catalog"
                    className="group flex items-center justify-between py-6 hover:border-fti-white/20 transition-colors"
                  >
                    <span className="font-display text-5xl text-fti-white/40 group-hover:text-fti-white transition-colors duration-200 tracking-wide">
                      {cat.label.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm font-medium text-fti-white/25 tracking-widest uppercase group-hover:text-fti-white/50 transition-colors">
                        {cat.count}
                      </span>
                      <span className="text-fti-white/20 group-hover:text-fti-acid transition-colors text-xl">
                        →
                      </span>
                    </div>
                  </Link>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
