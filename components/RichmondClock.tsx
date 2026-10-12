"use client";

import { useState, useEffect } from "react";

export default function RichmondClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(t);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="font-mono text-xs font-medium text-fti-white/30 tracking-[0.18em] tabular-nums hidden lg:block">
      RVA&nbsp;&nbsp;{time}
    </span>
  );
}
