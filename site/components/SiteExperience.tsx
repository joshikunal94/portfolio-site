"use client";

import { useEffect, useState } from "react";
import { BentoLayout } from "@/components/BentoLayout";
import { MotionExperience } from "@/components/motion/MotionExperience";

type ViewPreference = "motion" | "simplified";

const storageKey = "view-preference";

export function SiteExperience() {
  const [view, setView] = useState<ViewPreference>("motion");

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(storageKey);

    if (savedPreference === "motion" || savedPreference === "simplified") {
      setView(savedPreference);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setView("simplified");
    }
  }, []);

  const isSimplified = view === "simplified";

  const toggleView = () => {
    setView((currentView) => {
      const nextView = currentView === "motion" ? "simplified" : "motion";
      window.localStorage.setItem(storageKey, nextView);
      return nextView;
    });
  };

  return (
    <>
      <button
        type="button"
        aria-pressed={isSimplified}
        onClick={toggleView}
        className="fixed right-4 top-4 z-40 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[rgba(15,23,42,0.10)] bg-white/90 px-4 py-2 font-mono text-xs font-medium uppercase tracking-wide text-accent-bright shadow-[0_1px_2px_rgba(15,23,42,0.05),0_10px_30px_-18px_rgba(15,23,42,0.25)] backdrop-blur-md motion-safe:transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#175FB0] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        {isSimplified ? "Animated view" : "Simplify"}
      </button>

      {isSimplified ? <BentoLayout /> : <MotionExperience />}
    </>
  );
}
