"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import Footer from "@/components/Footer";

const CATEGORIES = ["all", "tees", "hoodies", "hats", "shorts"] as const;

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  // Show skeleton briefly when filters change (skip on first mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 350);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, searchQuery]);

  // Skeleton count matches expected results (or falls back to 4)
  const skeletonCount = isTransitioning
    ? Math.max(filtered.length, 2) || 4
    : 0;

  return (
    <>
      <div className="pt-16 min-h-screen bg-fti-black">
        {/* Header */}
        <div className="px-6 pt-16 pb-14 border-b border-fti-border relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
            <span className="font-display text-[22vw] leading-none text-fti-white/[0.025] translate-x-[5%]">
              SHOP
            </span>
          </div>
          <div className="max-w-screen-2xl mx-auto relative">
            <span className="font-mono text-xs font-bold tracking-[0.45em] text-fti-acid uppercase block mb-4">
              All Products
            </span>
            <h1 className="font-display text-[15vw] md:text-[11vw] lg:text-[9vw] text-fti-white leading-none tracking-wider">
              Catalog
            </h1>
          </div>
        </div>

        {/* Sticky filter bar */}
        <div className="sticky top-[64px] z-30 bg-fti-black/97 backdrop-blur-lg border-b border-fti-border px-6 py-4">
          <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono text-sm font-bold tracking-[0.2em] uppercase px-5 py-2.5 whitespace-nowrap transition-all duration-150 active:scale-95 ${
                    activeCategory === cat
                      ? "bg-fti-acid text-black"
                      : "text-fti-white/50 hover:text-fti-white border border-fti-border hover:border-fti-white/30"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative flex-1 w-full sm:min-w-[200px]">
              <Search
                size={13}
                strokeWidth={2}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-fti-white/25 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-fti-gray border border-fti-border text-fti-white/70 font-mono text-xs tracking-[0.12em] placeholder:text-fti-white/20 pl-8 pr-8 py-2.5 focus:outline-none focus:border-fti-acid/60 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-fti-white/30 hover:text-fti-acid transition-colors"
                  aria-label="Clear search"
                >
                  <X size={12} strokeWidth={2} />
                </button>
              )}
            </div>

            {/* Count */}
            <span className="font-mono text-sm font-medium text-fti-white/30 tracking-widest whitespace-nowrap hidden sm:block">
              {isTransitioning ? "—" : `${filtered.length} ${filtered.length === 1 ? "item" : "items"}`}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="px-6 py-16">
          <div className="max-w-screen-2xl mx-auto">
            {isTransitioning ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-7 md:gap-y-16">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-display text-5xl text-fti-white/15">
                  {searchQuery
                    ? `NO RESULTS FOR "${searchQuery.toUpperCase()}"`
                    : "NO PRODUCTS IN THIS CATEGORY"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-7 md:gap-y-16">
                {filtered.map((product, i) => (
                  <FadeInWhenVisible key={product.id} delay={i * 60}>
                    <ProductCard product={product} />
                  </FadeInWhenVisible>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
