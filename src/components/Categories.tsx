import { categories } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

export function Categories() {
  return (
    <section id="categories" className="bg-klaas-linen-light py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-klaas-tan">
              <span className="h-px w-10 bg-klaas-tan" />
              Treatments
            </p>
            <h2 className="font-heading text-4xl text-klaas-black lg:text-5xl">
              Categories of care
            </h2>
          </div>
          <a
            href="#treatments"
            className="inline-flex items-center gap-2 text-sm font-medium text-klaas-midnight hover:underline"
          >
            All treatments <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article
              key={c.title}
              className="reveal group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_50px_-30px_rgba(56,46,39,0.4)] transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="relative h-60 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-klaas-midnight">
                  {c.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-heading text-2xl text-klaas-black">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-klaas-dim-grey">
                  {c.text}
                </p>
                <p className="mt-6 mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-klaas-tan">
                  Treatments
                </p>
                <ul className="flex flex-col gap-2 text-sm text-klaas-black/80">
                  {c.treatments.map((t) => (
                    <li key={t}>
                      <a
                        href="#treatments"
                        className="flex items-center justify-between border-b border-klaas-linen py-2 transition-colors hover:text-klaas-midnight"
                      >
                        {t}
                        <ArrowRightIcon className="h-3.5 w-3.5 opacity-50" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
