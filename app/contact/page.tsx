"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

const SOCIAL_LINKS = [
  { platform: "Instagram", handle: "@letterstore", url: "#" },
  { platform: "TikTok", handle: "@letterstore", url: "#" },
  { platform: "Twitter / X", handle: "@letterstore", url: "#" },
  { platform: "YouTube", handle: "Letter Store", url: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase =
    "w-full bg-transparent border-b py-4 font-mono text-sm font-medium text-fti-white tracking-wider outline-none placeholder:text-fti-white/20 transition-colors duration-200";

  return (
    <>
      <div className="pt-16 min-h-screen bg-fti-black">
        {/* Header */}
        <div className="px-6 pt-16 pb-12 border-b border-fti-border relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
            <span className="font-display text-[16vw] leading-none text-fti-white/[0.025] translate-x-[5%]">
              CONTACT
            </span>
          </div>
          <div className="max-w-screen-2xl mx-auto relative">
            <span className="font-mono text-xs font-bold tracking-[0.45em] text-fti-acid uppercase block mb-4">
              Get in Touch
            </span>
            <h1 className="font-display text-[14vw] md:text-[11vw] lg:text-[8vw] text-fti-white leading-none tracking-wider">
              Contact
            </h1>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-20 lg:gap-32">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="py-10">
                  <p className="font-display text-8xl text-fti-acid leading-none mb-6 tracking-wider">
                    Message
                    <br />
                    Sent.
                  </p>
                  <p className="font-mono text-sm font-medium text-fti-white/50 tracking-wider mb-10">
                    We&apos;ll get back to you shortly. Check your inbox.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-fti-white/40 hover:text-fti-white transition-colors border-b border-fti-border hover:border-fti-white pb-1"
                  >
                    Send Another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div>
                    <label className="font-mono text-xs font-bold tracking-[0.4em] uppercase text-fti-white/40 block mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, name: e.target.value }))
                      }
                      placeholder="Your name"
                      className={`${inputBase} ${
                        focused === "name"
                          ? "border-fti-acid"
                          : "border-fti-border"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs font-bold tracking-[0.4em] uppercase text-fti-white/40 block mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className={`${inputBase} ${
                        focused === "email"
                          ? "border-fti-acid"
                          : "border-fti-border"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs font-bold tracking-[0.4em] uppercase text-fti-white/40 block mb-3">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, message: e.target.value }))
                      }
                      placeholder="What's on your mind?"
                      className={`${inputBase} resize-none ${
                        focused === "message"
                          ? "border-fti-acid"
                          : "border-fti-border"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-fti-black bg-fti-acid px-14 py-4 hover:bg-fti-white transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Brand info */}
            <div className="space-y-14">
              <div>
                <h2 className="font-display text-7xl text-fti-white tracking-wider mb-5 leading-none">
                  Letter Store
                </h2>
                <p className="font-mono text-sm font-medium text-fti-white/45 leading-relaxed tracking-wide max-w-[300px]">
                  Letter Store. Richmond, VA.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold tracking-[0.4em] uppercase text-fti-white/30 mb-6">
                  Find Us Online
                </h3>
                <div>
                  {SOCIAL_LINKS.map(({ platform, handle, url }) => (
                    <a
                      key={platform}
                      href={url}
                      className="group flex items-center justify-between border-b border-fti-border py-5 hover:border-fti-white/20 transition-colors"
                    >
                      <span className="font-mono text-sm font-bold text-fti-white/50 tracking-wider uppercase group-hover:text-fti-white transition-colors">
                        {platform}
                      </span>
                      <span className="font-mono text-sm font-medium text-fti-white/25 tracking-wider group-hover:text-fti-acid transition-colors">
                        {handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h3 className="font-mono text-xs font-bold tracking-[0.4em] uppercase text-fti-white/30 mb-4">
                    Based In
                  </h3>
                  <p className="font-mono text-sm font-medium text-fti-white/45 tracking-wide leading-relaxed">
                    Richmond, VA
                    <br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold tracking-[0.4em] uppercase text-fti-white/30 mb-4">
                    Response Time
                  </h3>
                  <p className="font-mono text-sm font-medium text-fti-white/45 tracking-wide leading-relaxed">
                    24–48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
