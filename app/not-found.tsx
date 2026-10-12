import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-fti-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ghost number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[40vw] leading-none text-fti-white/[0.02] tracking-tighter">
          404
        </span>
      </div>

      {/* Horizontal lines */}
      <div className="absolute top-[38%] left-0 right-0 h-px bg-fti-border" />
      <div className="absolute bottom-[30%] left-0 right-0 h-px bg-fti-border" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg">
        <span className="font-mono text-xs font-bold tracking-[0.45em] text-fti-acid uppercase block mb-6">
          Error 404
        </span>

        <h1 className="font-display text-[22vw] sm:text-[18vw] md:text-[14vw] leading-none text-fti-white tracking-wider mb-4">
          LOST.
        </h1>

        <p className="font-mono text-sm font-medium text-fti-white/30 tracking-[0.15em] uppercase leading-relaxed mb-12">
          This page dropped and didn&apos;t restock.
          <br />
          Head back to the shop.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-black bg-fti-white px-10 py-4 hover:bg-fti-acid transition-colors duration-200 active:scale-[0.98] inline-block"
          >
            Back to Home
          </Link>
          <Link
            href="/catalog"
            className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-fti-white/50 hover:text-fti-white border border-fti-border hover:border-fti-white/30 px-10 py-4 transition-all duration-200"
          >
            Shop All
          </Link>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="font-mono text-[10px] font-medium tracking-[0.3em] text-fti-white/10 uppercase">
          Letter Store — Richmond, VA
        </span>
      </div>
    </div>
  );
}
