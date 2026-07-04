import { team, clinics } from "@/lib/content";

export function Team() {
  return (
    <section id="team" className="bg-klaas-white-smoke py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="reveal mb-14 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-klaas-tan">
            <span className="h-px w-10 bg-klaas-tan" />
            Our team
          </p>
          <h2 className="font-heading text-4xl text-klaas-black lg:text-5xl">
            We are excellent in dental care and treatments for all patients
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {team.map((m) => (
            <article key={m.name} className="reveal group">
              <div className="overflow-hidden rounded-[1.5rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-heading text-xl text-klaas-black">
                {m.name}
              </h3>
              <p className="text-sm uppercase tracking-widest text-klaas-tan">
                {m.role}
              </p>
            </article>
          ))}
        </div>

        <div className="reveal mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-klaas-linen pt-10">
          <span className="text-sm uppercase tracking-[0.3em] text-klaas-grey">
            Clinics
          </span>
          {clinics.map((c) => (
            <span key={c} className="font-heading text-2xl text-klaas-midnight">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
