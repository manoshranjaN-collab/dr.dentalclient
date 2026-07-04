import { articles } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

export function Blog() {
  return (
    <section id="blog" className="bg-klaas-linen-light py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-klaas-tan">
              <span className="h-px w-10 bg-klaas-tan" />
              Featured articles
            </p>
            <h2 className="font-heading text-4xl text-klaas-black lg:text-5xl">
              Blog focused on oral health
            </h2>
          </div>
          <a
            href="#blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-klaas-midnight hover:underline"
          >
            Read more <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map((a) => (
            <article key={a.title} className="reveal group">
              <div className="overflow-hidden rounded-[1.5rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-klaas-tan">
                {a.category}
              </p>
              <h3 className="mt-3 font-heading text-2xl leading-snug text-klaas-black transition-colors group-hover:text-klaas-midnight">
                {a.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
