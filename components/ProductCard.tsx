import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image container */}
      <div
        className="relative overflow-hidden aspect-[3/4] border border-white/[0.07] group-hover:border-fti-acid/50 transition-colors duration-300"
        style={{ backgroundColor: product.placeholderBg }}
      >
        {/* Inner wrapper — scales on hover */}
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          style={{ backgroundColor: product.placeholderBg }}
        >
          {product.imageSrc ? (
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
              quality={85}
            />
          ) : (
            <>
              {/* Product name watermark */}
              <div className="absolute inset-0 flex items-center justify-center p-5">
                <span
                  className="font-display text-3xl text-center leading-tight select-none"
                  style={{ color: product.placeholderText, opacity: 0.35 }}
                >
                  {product.name.toUpperCase()}
                </span>
              </div>

              {/* LS watermark bottom-right */}
              <div className="absolute bottom-3 right-3 select-none">
                <span
                  className="font-display text-6xl leading-none"
                  style={{ color: product.placeholderText, opacity: 0.1 }}
                >
                  LS
                </span>
              </div>
            </>
          )}

          {/* Gradient vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Color swatch strip */}
        {product.colors.length > 0 && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{ backgroundColor: product.colors[0].hex, opacity: 0.7 }}
          />
        )}

        {/* Sold out overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
            <div className="border border-fti-white/40 px-5 py-2">
              <span className="font-display text-3xl text-fti-white tracking-[0.2em] font-bold">
                SOLD OUT
              </span>
            </div>
          </div>
        )}

        {/* Hover CTA */}
        {product.inStock && (
          <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-xs font-bold text-fti-white tracking-[0.2em] uppercase bg-fti-acid text-black px-4 py-2 transition-all duration-200">
              View Product →
            </span>
          </div>
        )}

        {/* New badge */}
        {product.isNew && product.inStock && (
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] bg-fti-acid text-black px-2.5 py-1 uppercase">
              New
            </span>
          </div>
        )}
      </div>

      {/* Product info below card */}
      <div className="mt-4 space-y-1.5 px-0.5">
        <h3 className="font-mono text-sm font-bold text-fti-white/80 tracking-wide uppercase leading-snug group-hover:text-fti-white transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl text-fti-acid tracking-wider">
            ${product.price.toFixed(2)}
          </p>
          {!product.inStock && (
            <span className="font-mono text-xs font-bold text-fti-white/30 tracking-widest uppercase">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
