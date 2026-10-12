"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Phase = "idle" | "in" | "out";

export default function PageTransition() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const inProgress = useRef(false);

  const startTransition = (href: string) => {
    if (inProgress.current) return;
    inProgress.current = true;

    setPhase("in");

    setTimeout(() => {
      router.push(href);
      setPhase("out");
    }, 420);

    setTimeout(() => {
      setPhase("idle");
      inProgress.current = false;
    }, 860);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      try {
        const target = new URL(href, window.location.origin);
        if (target.pathname === window.location.pathname) return;
      } catch {
        return;
      }

      e.preventDefault();
      startTransition(href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bar: 50vh tall, centered — fizzles in/out with scale + blur + opacity
  const isIdle = phase === "idle";
  const isIn = phase === "in";

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 z-[9990] pointer-events-none"
      style={{
        top: "25vh",
        height: "50vh",
        backgroundColor: "#cc1111",
        transform: isIdle
          ? "translateX(105%) scaleY(0.08)"
          : isIn
          ? "translateX(0%) scaleY(1)"
          : "translateX(-105%) scaleY(0.08)",
        filter: isIdle || phase === "out"
          ? "blur(18px) brightness(1.4)"
          : "blur(0px) brightness(1)",
        opacity: isIdle ? 0 : 1,
        transition:
          phase === "idle"
            ? "none"
            : "transform 420ms cubic-bezier(0.76, 0, 0.24, 1), filter 420ms ease, opacity 420ms ease",
      }}
    />
  );
}
