"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!mounted) return null;

  const size = clicking ? 10 : 14;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ transform: "translate(-50%, -50%)" }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        style={{ transition: "width 80ms ease, height 80ms ease", display: "block" }}
      >
        <line x1="1" y1="1" x2="13" y2="13" stroke="#e01010" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="13" y1="1" x2="1" y2="13" stroke="#e01010" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
