import { about } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="bg-klaas-linen-light py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="reveal relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(18,49,97,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.image}
                alt="Our dental practice"
                className="h-[420px] w-full object-cover lg:h-[540px]"
              />
            </div>
            <div className="absolute -right-4 bottom-8 rounded-2xl bg-klaas-midnight px-8 py-6 text-white shadow-xl">
              <p className="text-xs uppercase tracking-widest text-klaas-burlywood">
                {about.knowHow.pre}
              </p>
              <p className="font-heading text-3xl">{about.knowHow.years}</p>
              <p className="text-xs uppercase tracking-widest text-white/60">
                {about.knowHow.post}
              </p>
            </div>
          </div>

          <div>
            <p className="reveal mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-klaas-tan">
              <span className="h-px w-10 bg-klaas-tan" />
              {about.eyebrow}
            </p>
            <h2 className="reveal font-heading text-4xl text-klaas-black lg:text-5xl">
              Passionate about healthy smiles
            </h2>

            <div className="mt-10 flex flex-col gap-8">
              {about.items.map((item) => (
                <div key={item.title} className="reveal border-l-2 border-klaas-tan pl-6">
                  <h3 className="font-heading text-xl text-klaas-midnight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-klaas-dim-grey">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-20 grid grid-cols-1 gap-8 rounded-[2rem] bg-white p-10 shadow-[0_20px_50px_-30px_rgba(56,46,39,0.4)] sm:grid-cols-3">
          {about.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-5xl text-klaas-midnight">
                {s.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-widest text-klaas-grey">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
