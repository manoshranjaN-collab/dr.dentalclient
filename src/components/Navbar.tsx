"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/content";
import { MenuIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#faf7f5]/95 backdrop-blur-sm shadow-[0_8px_30px_rgba(56,46,39,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-heading text-2xl tracking-wide text-klaas-black">
            {nav.brand}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-klaas-grey">
            {nav.slogan}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-klaas-black/80 transition-colors hover:text-klaas-midnight"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden rounded-full bg-klaas-midnight px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Book online
          </a>
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-klaas-linen text-klaas-black lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
