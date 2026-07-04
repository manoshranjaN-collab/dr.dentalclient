import { contact } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-klaas-dark-blue py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-klaas-burlywood">
              <span className="h-px w-10 bg-klaas-burlywood" />
              {contact.eyebrow}
            </p>
            <h2 className="font-heading text-4xl leading-tight lg:text-6xl">
              {contact.title}
            </h2>
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Email
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-lg text-white hover:text-klaas-burlywood"
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Phone
                </p>
                <a href="#" className="text-lg text-white hover:text-klaas-burlywood">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="reveal rounded-[2rem] bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm lg:p-10">
            <h3 className="font-heading text-2xl">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm text-white/60">
              Get free dental marketing tips and advice from our experts.
            </p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              action="#"
              method="post"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white placeholder:text-white/40 focus:border-klaas-burlywood focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-klaas-burlywood px-8 py-4 text-sm font-medium text-klaas-dark-blue transition-transform duration-300 hover:-translate-y-0.5"
              >
                Subscribe <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
