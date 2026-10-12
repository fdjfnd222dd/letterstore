export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: "tees" | "hoodies" | "hats" | "shorts";
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  placeholderBg: string;
  placeholderText: string;
  inStock: boolean;
  isNew: boolean;
  imageSrc?: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "thursday-friday-tee",
    name: "Thursday Friday Tee",
    price: 32.0,
    category: "tees",
    description:
      "Heavy 6.5oz cotton graphic tee. Oversized unisex cut. Screen-printed artwork front and back. Pre-shrunk and garment washed for that worn-in feel from day one. This is what you wear when you don't care what day it is.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Dark Gray", hex: "#3a3a3a" }],
    placeholderBg: "#1e1e1e",
    placeholderText: "#5a5a5a",
    inStock: true,
    isNew: true,
    imageSrc: "/images/products/thursday-friday-tee.jpg",
  },
  {
    id: "2",
    slug: "letter-rva-zip-up-pink",
    name: "Letter RVA Zip Up Pink",
    price: 148.0,
    category: "hoodies",
    description:
      "All-over sublimation print zip-up hoodie. 320GSM heavyweight French terry. Ribbed cuffs and waistband. Pink colorway — Letter Store RVA graphic saturates every inch of the fabric. Not for the faint.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Pink", hex: "#d4527a" }],
    placeholderBg: "#2d0f1c",
    placeholderText: "#d4527a",
    inStock: true,
    isNew: true,
    imageSrc: "/images/products/letter-rva-zip-up-pink.jpg",
  },
  {
    id: "3",
    slug: "letter-rva-zip-up-black",
    name: "Letter RVA Zip Up Black",
    price: 148.0,
    category: "hoodies",
    description:
      "All-over sublimation print zip-up hoodie. 320GSM heavyweight French terry. Black/purple colorway — the dark version. Letter Store NY lettering woven into the pattern across every panel. Heavyweight. Statement piece.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black/Purple", hex: "#3d1f6e" }],
    placeholderBg: "#0a0614",
    placeholderText: "#6b3fa0",
    inStock: true,
    isNew: true,
    imageSrc: "/images/products/letter-rva-zip-up-black.jpg",
  },
  {
    id: "4",
    slug: "letter-8box-skullz-hat-black",
    name: "Letter 8box Skullz Hat Black",
    price: 50.0,
    category: "hats",
    description:
      "Structured 6-panel snapback. Skull pattern embroidery. 8box logo hit on back strap. 100% cotton twill. One size fits all adjustable snap closure. This one is gone — don't sleep on the next drop.",
    sizes: ["ONE SIZE"],
    colors: [{ name: "Black", hex: "#111111" }],
    placeholderBg: "#0d0d0d",
    placeholderText: "#333333",
    inStock: false,
    isNew: false,
    imageSrc: "/images/products/letter-8box-skullz-hat-black.jpg",
  },
  {
    id: "5",
    slug: "letter-logo-tee-white",
    name: "Letter Store Logo Tee White",
    price: 35.0,
    category: "tees",
    description:
      "The essential. Classic Letter Store wordmark on heavyweight 6.5oz cotton. Oversized unisex fit. Black screen print on white. Some things don't need to be complicated. Pair with anything.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#f0f0f0" }],
    placeholderBg: "#d8d8d0",
    placeholderText: "#111111",
    inStock: true,
    isNew: false,
    imageSrc: "/images/products/letter-logo-tee-white.jpg",
  },
  {
    id: "6",
    slug: "letter-cargo-shorts-black",
    name: "Letter Store Cargo Shorts Black",
    price: 85.0,
    category: "shorts",
    description:
      "Relaxed fit cargo shorts. 6 utility pockets. 100% nylon shell, quick-dry. Adjustable drawstring waist. Letter Store branded metal hardware. Available in waist sizes 30–38. Built for movement.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [{ name: "Black", hex: "#1a1a1a" }],
    placeholderBg: "#111109",
    placeholderText: "#3a3a28",
    inStock: true,
    isNew: false,
    imageSrc: "/images/products/letter-cargo-shorts-black.jpg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getNewArrivals(count: number = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, count);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(current: Product, count: number = 3): Product[] {
  return products
    .filter((p) => p.category === current.category && p.id !== current.id)
    .slice(0, count);
}
