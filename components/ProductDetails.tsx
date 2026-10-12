"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Check } from "lucide-react";

export default function ProductDetails({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: 1,
        placeholderBg: product.placeholderBg,
        placeholderText: product.placeholderText,
      },
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="pt-16">
      {/* ── STICKY IMAGE — fills viewport below navbar ── */}
      <div
        className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden"
        style={{ backgroundColor: product.placeholderBg }}
      >
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="100vw"
            className="object-cover"
            quality={80}
            priority
          />
        ) : (
          <>
            {/* Watermark name */}
            <div className="absolute inset-0 flex items-center justify-center p-16 select-none">
              <span
                className="font-display text-6xl text-center leading-tight"
                style={{ color: product.placeholderText, opacity: 0.22 }}
              >
                {product.name.toUpperCase()}
              </span>
            </div>

            {/* LS watermark */}
            <div className="absolute bottom-24 right-8 select-none">
              <span
                className="font-display text-[12rem] leading-none"
                style={{ color: product.placeholderText, opacity: 0.05 }}
              >
                LS
              </span>
            </div>
          </>
        )}

        {/* Color bar */}
        {product.colors.length > 0 && (
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ backgroundColor: product.colors[0].hex }}
          />
        )}

        {/* Sold out overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
            <div className="border border-fti-white/25 px-10 py-5">
              <span className="font-display text-6xl text-fti-white tracking-[0.15em]">
                SOLD OUT
              </span>
            </div>
          </div>
        )}

        {/* New badge */}
        {product.isNew && product.inStock && (
          <div className="absolute top-6 left-6">
            <span className="font-mono text-xs font-bold tracking-[0.3em] bg-fti-acid text-black px-3 py-1.5 uppercase">
              New Drop
            </span>
          </div>
        )}

        {/* Bottom gradient info strip — hints at drawer below */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-8 pb-10 pt-24">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.35em] uppercase text-fti-white/40 block mb-2">
                {product.category} &nbsp;/&nbsp; Scroll for details ↑
              </span>
              <h1 className="font-display text-4xl sm:text-5xl text-fti-white leading-none tracking-wider">
                {product.name.toUpperCase()}
              </h1>
            </div>
            <span className="font-display text-5xl text-fti-acid tracking-wider ml-4 flex-shrink-0">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* ── DRAWER — slides up over the sticky image ── */}
      <div className="relative z-10 -mt-10 bg-fti-black border-t-2 border-fti-acid/70 min-h-screen">
        {/* Drawer handle pill */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-10 h-1 bg-fti-white/15 rounded-full" />
        </div>

        <div className="max-w-2xl mx-auto px-6 sm:px-10 pt-8 pb-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs font-medium tracking-widest uppercase text-fti-white/25 mb-10">
            <Link href="/" className="hover:text-fti-white/60 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-fti-white/60 transition-colors">
              Catalog
            </Link>
            <span>/</span>
            <span className="text-fti-white/50">{product.name}</span>
          </div>

          {/* Product header (repeated for when image is scrolled past) */}
          <div className="mb-8">
            <span className="font-mono text-xs font-bold tracking-[0.35em] uppercase text-fti-white/30 block mb-2">
              {product.category}
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-fti-white leading-none tracking-wider mb-3">
              {product.name.toUpperCase()}
            </h2>
            <p className="font-display text-5xl text-fti-acid tracking-wider">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-fti-border mb-8" />

          {/* Color */}
          {product.colors.length > 0 && (
            <div className="mb-8">
              <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-fti-white/35 block mb-3">
                Color —{" "}
                <span className="text-fti-white/70">{product.colors[0].name}</span>
              </span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="w-10 h-10 border-2 border-fti-acid/80 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span
                className={`font-mono text-xs font-bold tracking-[0.25em] uppercase transition-colors ${
                  sizeError ? "text-red-400" : "text-fti-white/35"
                }`}
              >
                {sizeError
                  ? "⚠ Select a size first"
                  : selectedSize
                  ? `Size — ${selectedSize}`
                  : "Select Size"}
              </span>
              <button className="font-mono text-xs font-medium tracking-widest uppercase text-fti-white/20 hover:text-fti-acid transition-colors">
                Size Guide ↗
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    if (product.inStock) {
                      setSelectedSize(size);
                      setSizeError(false);
                    }
                  }}
                  disabled={!product.inStock}
                  className={`font-mono text-sm font-bold tracking-wider min-w-[3.5rem] py-3 px-3 border transition-all duration-150 active:scale-95 ${
                    selectedSize === size
                      ? "bg-fti-acid text-black border-fti-acid"
                      : product.inStock
                      ? "text-fti-white/60 border-fti-border hover:border-fti-white/60 hover:text-fti-white hover:bg-fti-white/5"
                      : "text-fti-white/15 border-fti-border/40 cursor-not-allowed line-through"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <div className="mb-10">
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className={`w-full font-mono text-sm font-bold tracking-[0.3em] uppercase py-5 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] ${
                  addedToCart
                    ? "bg-fti-white text-black"
                    : "bg-fti-acid text-black hover:bg-fti-white hover:scale-[1.01]"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} strokeWidth={2.5} />
                    Added to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            ) : (
              <button
                disabled
                className="w-full font-mono text-sm font-bold tracking-[0.3em] uppercase py-5 bg-fti-white/5 text-fti-white/20 cursor-not-allowed border border-fti-border"
              >
                Sold Out
              </button>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-fti-border pt-8 mb-8">
            <h3 className="font-mono text-xs font-bold tracking-[0.35em] uppercase text-fti-white/30 mb-4">
              About this piece
            </h3>
            <p className="font-mono text-sm font-medium text-fti-white/55 leading-relaxed tracking-wide">
              {product.description}
            </p>
          </div>

          {/* Perks */}
          <div className="border-t border-fti-border pt-8 space-y-4">
            {[
              "Free shipping on orders over $150",
              "Free returns within 30 days",
              "Ships from Richmond, VA",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <span className="text-fti-acid font-bold text-sm flex-shrink-0">
                  ✓
                </span>
                <span className="font-mono text-xs font-medium tracking-wider text-fti-white/35 uppercase">
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
