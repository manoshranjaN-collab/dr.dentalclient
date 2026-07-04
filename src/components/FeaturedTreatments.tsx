import { featuredTreatments } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

export function FeaturedTreatments() {
  return (
    <section id="treatments" className="bg-klaas-midnight py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-klaas-burlywood">
              <span className="h-px w-10 bg-klaas-burlywood" />
              Featured treatments
            </p>
            <h2 className="max-w-xl font-heading text-4xl leading-tight lg:text-5xl">
              We offer more than 24 treatments and procedures
            </h2>
          </div>
          <a
            href="#categories"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-klaas-midnight"
          >
            All treatments <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTreatments.map((t) => (
            <article
              key={t.name}
              className="reveal group overflow-hidden rounded-[1.5rem] bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10"
            >
              <div className="h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {t.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
