import Link from "next/link";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

type Props = {
  products: Product[];
};

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="bg-fti-black border-t border-fti-border px-6 py-20">
      <div className="max-w-screen-2xl mx-auto">
        <FadeInWhenVisible>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.45em] text-fti-acid uppercase block mb-3">
                More Like This
              </span>
              <h2 className="font-display text-6xl md:text-7xl text-fti-white leading-none tracking-wider">
                Related
              </h2>
            </div>
            <Link
              href="/catalog"
              className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-fti-white/30 hover:text-fti-acid transition-colors border-b border-fti-border hover:border-fti-acid pb-1 self-end mb-2"
            >
              View All →
            </Link>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {products.map((product, i) => (
            <FadeInWhenVisible key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
