"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, X, Menu } from "lucide-react";
import RichmondClock from "@/components/RichmondClock";
import ScrambleText from "@/components/ScrambleText";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Cart", href: "/cart" },
  { label: "Contact", href: "/contact" },
];

const desktopLinks = [
  { label: "Catalog", href: "/catalog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openCartDrawer } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-fti-black/97 backdrop-blur-md border-b border-fti-border"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto">
          {/* Left: Richmond clock */}
          <div className="w-40 flex items-center">
            <RichmondClock />
          </div>

          {/* Center: Logo — image on home, text on other pages */}
          <Link
            href="/"
            className={`absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity duration-200 ${
              !isHome ? "font-display text-3xl tracking-[0.06em] text-fti-white leading-none" : ""
            }`}
          >
            {isHome ? (
              <Image
                src="/images/logo.png"
                alt="Letter Store"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            ) : (
              <ScrambleText text="Letter Store" />
            )}
          </Link>

          {/* Right: nav links + cart */}
          <div className="flex items-center gap-8 ml-auto">
            <div className="hidden md:flex items-center gap-8">
              {desktopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200"
                >
                  <ScrambleText text={link.label} className="text-zinc-500" hoverClassName="text-fti-acid" />
                </Link>
              ))}
            </div>

            <button
              onClick={openCartDrawer}
              className="relative text-fti-white hover:text-fti-acid transition-colors duration-200"
              aria-label={`Cart, ${totalItems} items`}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-fti-acid text-fti-black text-[10px] font-mono font-bold flex items-center justify-center rounded-full leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-fti-white hover:text-fti-acid transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile overlay */}
      <div
        className={`fixed inset-0 z-50 bg-fti-black flex flex-col transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <div className="relative flex items-center justify-between px-6 py-4 border-b border-fti-border">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.png"
              alt="Letter Store"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-fti-white hover:text-fti-acid transition-colors"
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        <div className="relative flex flex-col justify-center flex-1 px-8 gap-0">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-[17vw] sm:text-[14vw] text-fti-white/[0.07] hover:text-fti-white/90 transition-colors duration-300 leading-[1.1] group"
              style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
            >
              {link.label}
              <span className="inline-block w-0 group-hover:w-3 h-2 bg-fti-acid ml-2 translate-y-[-8px] transition-all duration-200" />
            </Link>
          ))}
        </div>

        <div className="relative px-8 pb-10 flex items-center justify-between">
          <RichmondClock />
          <span className="font-mono text-xs font-medium text-fti-white/20 tracking-[0.25em] uppercase">
            RVA / 2025
          </span>
        </div>
      </div>
    </>
  );
}
