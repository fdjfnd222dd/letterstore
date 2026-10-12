"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function scramble(original: string, progress: number): string {
  return original
    .split("")
    .map((char, i) => {
      if (char === " " || char === "/" || char === "." || char === "-")
        return char;
      if (i < Math.floor(progress * original.length)) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

type Props = {
  text: string;
  className?: string;
  hoverClassName?: string;
  as?: "span" | "div";
};

export default function ScrambleText({ text, className, hoverClassName, as: Tag = "span" }: Props) {
  const [displayed, setDisplayed] = useState(text);
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (frameRef.current) clearInterval(frameRef.current);

    if (!hovered) {
      setDisplayed(text);
      return;
    }

    let frame = 0;
    const totalFrames = 14;

    frameRef.current = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplayed(text);
        clearInterval(frameRef.current!);
        return;
      }
      setDisplayed(scramble(text, frame / totalFrames));
    }, 35);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [hovered, text]);

  return (
    <Tag
      className={`${className ?? ""} ${hovered && hoverClassName ? hoverClassName : ""}`.trim()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {displayed}
    </Tag>
  );
}
