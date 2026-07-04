import { nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-klaas-black py-16 text-white/80">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-12 lg:flex-row">
          <div className="max-w-sm">
            <span className="font-heading text-3xl text-white">
              {nav.brand}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              We are excellent in dental care and treatments for all patients.
              We take care of you and your family.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-12 gap-y-3">
            {nav.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Klaas Dental. All rights reserved.</p>
          <p>Klaas — Dentist template clone, rebuilt in Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
