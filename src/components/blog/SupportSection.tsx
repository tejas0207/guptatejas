"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

const UPI_ID = "2017tejasgupta-1@okaxis";
const UPI_URL = `upi://pay?pa=${UPI_ID}&pn=Tejas%20Gupta&cu=INR`;

export function SupportSection() {
  const [showQR, setShowQR] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  useEffect(() => {
    if (showQR && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, UPI_URL, {
        width: 180,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: "M",
      });
    }
  }, [showQR]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-16 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-pink-500/[0.04] pointer-events-none" />

      <div className="relative p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-pink-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
              Enjoyed this article?
            </h3>
            <p className="text-sm text-muted mt-1 font-[family-name:var(--font-inter)] leading-relaxed max-w-lg">
              If this deep-dive saved you hours of research or helped you make better architecture decisions, consider supporting my work. Every bit helps me keep writing quality technical content.
            </p>
          </div>
        </div>

        {/* Support options */}
        <div className="flex flex-wrap gap-3">
          {/* GitHub Sponsors */}
          <motion.a
            href="https://github.com/sponsors/tejas0207"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 px-5 py-3 rounded-xl border border-pink-500/30 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-pink-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="relative text-sm font-medium font-[family-name:var(--font-inter)] text-pink-400">
              Sponsor on GitHub
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative text-pink-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          {/* UPI Pay button */}
          <motion.button
            onClick={() => setShowQR(!showQR)}
            className="group relative flex items-center gap-3 px-5 py-3 rounded-xl border border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M12 9v6" />
                <path d="M9 12h6" />
              </svg>
            </span>
            <span className="relative text-sm font-medium font-[family-name:var(--font-inter)] text-emerald-400">
              Pay via UPI
            </span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="relative text-emerald-400"
              animate={{ rotate: showQR ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.button>
        </div>

        {/* UPI QR Code expandable section */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03]">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* QR Code */}
                  <div className="flex-shrink-0">
                    <div className="bg-white p-3 rounded-xl">
                      <canvas ref={canvasRef} />
                    </div>
                    <p className="text-[10px] text-muted/60 text-center mt-2 font-[family-name:var(--font-inter)]">
                      Scan with any UPI app
                    </p>
                  </div>

                  {/* UPI details */}
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs text-muted font-[family-name:var(--font-inter)] mb-2">
                      UPI ID
                    </p>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <code className="text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg font-mono">
                        {UPI_ID}
                      </code>
                      <button
                        onClick={handleCopyUPI}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-muted hover:text-emerald-400 transition-colors"
                        aria-label="Copy UPI ID"
                      >
                        {copiedUPI ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted/60 mt-3 font-[family-name:var(--font-inter)] leading-relaxed">
                      Pay any amount you feel this article was worth.
                      <br />
                      Works with GPay, PhonePe, Paytm & all UPI apps.
                    </p>

                    {/* Direct pay link for mobile */}
                    <a
                      href={UPI_URL}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium font-[family-name:var(--font-inter)] hover:bg-emerald-500/25 transition-colors sm:hidden"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      Open UPI App
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle footnote */}
        <p className="text-[11px] text-muted/50 mt-5 font-[family-name:var(--font-inter)]">
          No pressure — sharing the article helps just as much!
        </p>
      </div>
    </motion.div>
  );
}
