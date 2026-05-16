"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页" },
  { href: "/menu", label: "餐单" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 border-b border-border/60 bg-gradient-to-b from-bg/95 via-bg/90 to-bg/85 backdrop-blur-xl" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-2 font-serif text-lg font-bold tracking-wide"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_rgba(224,120,42,0.6)] transition-shadow group-hover:shadow-[0_0_16px_rgba(240,160,64,0.8)]" />
          <span className="bg-gradient-to-r from-gold via-ember to-brand bg-clip-text text-transparent transition-all duration-300 group-hover:from-ember group-hover:to-gold">
            姜胖胖韩式自助烤肉
          </span>
        </Link>

        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-gold"
                      : "text-text-secondary hover:text-text"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_6px_rgba(224,120,42,0.5)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
