import type { Metadata } from "next";
import { SiteExperience } from "@/components/SiteExperience";
import { profile, summaryText } from "@/lib/content";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.tagline}`,
  description: summaryText,
};

export default function Home() {
  return <SiteExperience />;
}
