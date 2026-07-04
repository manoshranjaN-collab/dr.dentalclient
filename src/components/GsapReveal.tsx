"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registers scroll-driven reveal animations for every element carrying a
 * `.reveal` class. Elements fade and rise into place as they enter the
 * viewport, matching the Klaas template's gentle scroll-in feel.
 * Honors `prefers-reduced-motion` via the CSS guard in globals.css.
 */
export function GsapReveal() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });

      gsap.set(".reveal", { y: 40 });
    });

    // Recalculate once fonts/images settle.
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return null;
}
