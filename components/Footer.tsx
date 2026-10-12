import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-fti-black border-t border-fti-border overflow-hidden">
      {/* Giant background watermark */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[22vw] leading-none text-fti-white/[0.025] pr-4 translate-y-[18%]">
          LS
        </span>
      </div>

      <div className="relative px-6 pt-20 pb-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link
              href="/"
              className="font-display text-6xl text-fti-white tracking-wide leading-none hover:text-fti-acid transition-colors duration-200 block mb-5"
            >
              Letter Store
            </Link>
            <p className="font-mono text-sm font-medium text-fti-white/40 leading-relaxed tracking-wide max-w-[240px]">
              Richmond, VA.
            </p>
          </div>

          {/* Shop links */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="font-mono text-xs font-bold tracking-[0.35em] uppercase text-fti-white/30 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { label: "All Products", href: "/catalog" },
                { label: "New Arrivals", href: "/catalog" },
                { label: "Tees", href: "/catalog" },
                { label: "Hoodies", href: "/catalog" },
                { label: "Hats", href: "/catalog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-mono text-sm font-medium text-fti-white/50 hover:text-fti-white transition-colors tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-mono text-xs font-bold tracking-[0.35em] uppercase text-fti-white/30 mb-5">
              Info
            </h4>
            <ul className="space-y-3">
              {["About", "Contact", "Sizing", "Shipping", "Returns"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/contact"
                      className="font-mono text-sm font-medium text-fti-white/50 hover:text-fti-white transition-colors tracking-wide"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-mono text-xs font-bold tracking-[0.35em] uppercase text-fti-white/30 mb-5">
              Follow
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Instagram", handle: "@letterstore" },
                { label: "TikTok", handle: "@letterstore" },
                { label: "Twitter", handle: "@letterstore" },
                { label: "YouTube", handle: "Letter Store" },
              ].map(({ label, handle }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="group flex flex-col gap-0.5 font-mono text-sm font-medium text-fti-white/50 hover:text-fti-acid transition-colors tracking-wide"
                  >
                    <span>{label}</span>
                    <span className="text-xs text-fti-white/25 group-hover:text-fti-acid/70 transition-colors">
                      {handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-fti-border pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-mono text-xs font-medium text-fti-white/20 tracking-[0.15em] uppercase">
            © 2025 Letter Store, Richmond VA. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-mono text-xs font-medium text-fti-white/20 hover:text-fti-white/50 transition-colors tracking-[0.15em] uppercase"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-mono text-xs font-medium text-fti-white/20 hover:text-fti-white/50 transition-colors tracking-[0.15em] uppercase"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
