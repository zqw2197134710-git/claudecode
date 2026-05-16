import Link from "next/link";

const links = [
  { href: "/", label: "首页" },
  { href: "/menu", label: "餐单" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-bold tracking-wide text-primary-light">
          姜胖胖韩式自助烤肉
        </Link>
        <ul className="flex gap-6 text-sm text-neutral-300">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
