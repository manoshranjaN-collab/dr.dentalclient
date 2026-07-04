import { hero } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-klaas-linen-light pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div className="reveal">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-klaas-tan">
            <span className="h-px w-10 bg-klaas-tan" />
            {hero.eyebrow}
          </p>
          <h1 className="font-heading text-5xl leading-[1.05] text-klaas-black sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-klaas-dim-grey">
            {hero.text}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#categories"
              className="group inline-flex items-center gap-3 rounded-full bg-klaas-midnight px-8 py-4 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-klaas-black/70">
              {hero.quickLinks.map((q) => (
                <a
                  key={q}
                  href="#treatments"
                  className="border-b border-transparent transition-colors hover:border-klaas-tan hover:text-klaas-black"
                >
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(18,49,97,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.image}
              alt="Excellent dental services"
              className="h-[420px] w-full object-cover lg:h-[560px]"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white px-8 py-6 shadow-xl sm:block">
            <p className="font-heading text-3xl text-klaas-midnight">20+</p>
            <p className="text-xs uppercase tracking-widest text-klaas-grey">
              years of experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
