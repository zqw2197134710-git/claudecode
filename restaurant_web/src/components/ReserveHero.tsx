"use client";

import { motion } from "framer-motion";

export default function ReserveHero() {
  return (
    <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden">
      {/* Ember glow bg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(240,160,64,0.25) 0%, transparent 70%)," +
            "radial-gradient(ellipse 60% 40% at 30% 40%, rgba(224,120,42,0.15) 0%, transparent 50%)," +
            "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(248,192,80,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Floating embers */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute h-1 w-1 rounded-full"
          style={{
            background: i % 2 === 0 ? "rgba(240,160,64,0.6)" : "rgba(224,120,42,0.4)",
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative z-10 px-6 text-center">
        <h1 className="bg-gradient-to-r from-ember via-gold to-ember bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          在线预约
        </h1>
        <p className="mt-3 text-sm text-text-secondary">提前预约，到店无忧</p>
      </div>
    </section>
  );
}
