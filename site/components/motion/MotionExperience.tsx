"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/Badge";
import { BadgeCarousel } from "@/components/BadgeCarousel";
import { Card, CardContent, CardEyebrow } from "@/components/Card";
import badges from "@/lib/badges.json";
import {
  clientWork,
  contact,
  education,
  expertise,
  expertiseEmerging,
  honors,
  profile,
  project,
  roles,
  techSkills,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText, ScrambleTextPlugin, TextPlugin);

const sectionNavItems = [
  { id: "overview", label: "overview" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "client-work", label: "client work" },
  { id: "credentials", label: "credentials" },
  { id: "expertise", label: "expertise" },
  { id: "education", label: "education" },
];

function sealPath() {
  return "M24 3 42 13.5v21L24 45 6 34.5v-21Z";
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2">
          <span className="text-accent-bright" aria-hidden="true">
            •
          </span>
          <span className="text-slate-700">{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function Summary() {
  return (
    <>
      {profile.summary.map((segment, index) =>
        segment.strong ? (
          <strong key={index}>{segment.text}</strong>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </>
  );
}

function SignatureTag() {
  return (
    <div
      className="sig-tag relative shrink-0 inline-flex items-center gap-1 self-start rounded-full border border-[#175FB0] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#175FB0]"
      aria-label="verified signature"
    >
      <span className="sig-pending hidden">sig: pending</span>
      <span className="sig-ok inline-flex items-center gap-1">
        <span className="sig-check inline-block">✓</span>
        <span>verified</span>
      </span>
    </div>
  );
}

function TrustNode({ proofId }: { proofId: string }) {
  return (
    <span
      className="trust-node-wrap pointer-events-none absolute left-[max(2rem,calc((100vw-900px)/2-4rem))] top-0 z-20 hidden h-8 w-8 motion-reduce:hidden lg:block"
      data-proof-node={proofId}
      aria-hidden="true"
    >
      <span className="trust-node-ring absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#175FB0]" />
      <span className="trust-node absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CBD5E1]" />
    </span>
  );
}

export function MotionExperience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState("overview");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const restoreHeroText = () => {
        const eyebrow = rootRef.current?.querySelector<HTMLElement>(".hero-eyebrow");
        const title = rootRef.current?.querySelector<HTMLElement>(".hero-title");
        const tagline = rootRef.current?.querySelector<HTMLElement>(".hero-tagline");
        const fp = rootRef.current?.querySelector<HTMLElement>(".hero-fingerprint");

        if (eyebrow) eyebrow.textContent = profile.eyebrow;
        if (title) title.textContent = profile.name;
        if (tagline) tagline.textContent = profile.tagline;
        if (fp) fp.textContent = profile.fingerprint;
      };

      const setupHeroLoad = () => {
        restoreHeroText();
        gsap.set(".hero-title", { opacity: 0 });
        gsap.set(".hero-fp-check", { opacity: 0, scale: 0 });

        gsap
          .timeline()
          .to(".hero-eyebrow", {
            duration: 0.9,
            ease: "none",
            scrambleText: {
              text: profile.eyebrow,
              chars: "0123456789ABCDEF:=·",
            },
          })
          .to(".hero-title", { opacity: 1, duration: 0.2, ease: "power2.out" }, 0.35)
          .to(
            ".hero-title",
            {
              duration: 0.7,
              ease: "none",
              scrambleText: {
                text: profile.name,
                chars: "0123456789ABCDEF",
                revealDelay: 0.3,
              },
            },
            0.35
          )
          .to(
            ".hero-tagline",
            {
              duration: 0.7,
              ease: "none",
              scrambleText: {
                text: profile.tagline,
                chars: "0123456789ABCDEF:=·",
              },
            },
            0.7
          )
          .to(
            ".hero-fingerprint",
            {
              duration: 1.1,
              ease: "none",
              scrambleText: {
                text: profile.fingerprint,
                chars: "0123456789ABCDEF:",
              },
            },
            0.9
          )
          .to(".hero-fp-check", { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 1.86);
      };

      const setupReveals = () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.set(element, { y: 30, opacity: 0 });
          gsap.to(element, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        });
      };

      const setupSplitTextHeadings = () => {
        const activeSplits = new Set<SplitText>();

        gsap.utils.toArray<HTMLElement>("[data-splittext]").forEach((heading) => {
          ScrollTrigger.create({
            trigger: heading,
            start: "top 80%",
            once: true,
            onEnter: () => {
              const split = new SplitText(heading, { type: "words" });
              activeSplits.add(split);

              gsap.fromTo(
                split.words,
                { y: 18, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.06,
                  duration: 0.5,
                  ease: "power3.out",
                  onComplete: () => {
                    split.revert();
                    activeSplits.delete(split);
                  },
                }
              );
            },
          });
        });

        return () => {
          activeSplits.forEach((split) => split.revert());
          activeSplits.clear();
        };
      };

      const setupLivingFingerprint = () => {
        const fp = rootRef.current?.querySelector<HTMLElement>(".hero-fingerprint");
        const hero = rootRef.current?.querySelector<HTMLElement>("#overview");
        if (!fp || !hero) return undefined;

        let intervalId: number | undefined;
        let isReady = false;
        let isInView = false;

        const recompute = () => {
          gsap.to(fp, {
            duration: 0.8,
            ease: "none",
            scrambleText: {
              text: profile.fingerprint,
              chars: "0123456789ABCDEF:",
              revealDelay: 0.55,
            },
          });
        };

        const start = () => {
          if (!isReady || !isInView) return;
          if (intervalId) return;
          intervalId = window.setInterval(recompute, 5000);
        };

        const stop = () => {
          if (!intervalId) return;
          window.clearInterval(intervalId);
          intervalId = undefined;
          gsap.killTweensOf(fp);
          fp.textContent = profile.fingerprint;
        };

        const trigger = ScrollTrigger.create({
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            isInView = true;
            start();
          },
          onEnterBack: () => {
            isInView = true;
            start();
          },
          onLeave: () => {
            isInView = false;
            stop();
          },
          onLeaveBack: () => {
            isInView = false;
            stop();
          },
        });

        const readyTimeout = window.setTimeout(() => {
          isReady = true;
          isInView = trigger.isActive;
          start();
        }, 2200);

        return () => {
          window.clearTimeout(readyTimeout);
          stop();
          trigger.kill();
        };
      };

      const setupTiltCards = () => {
        const root = rootRef.current;
        if (!root) return undefined;

        const cards = gsap.utils.toArray<HTMLElement>("[data-tilt-card]");
        const links = gsap.utils.toArray<HTMLAnchorElement>("[data-tilt-card] a");
        const cleanups: Array<() => void> = [];

        // NOTE: do NOT set `perspective` on `root` (.motion-page) — a CSS perspective
        // on an ancestor establishes a containing block that breaks the sidebar nav's
        // `position: fixed` (it would scroll with the page). Per-card `transformPerspective`
        // gives the same 3D tilt without affecting the fixed nav.
        gsap.set(cards, {
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          willChange: "transform",
        });

        cards.forEach((card) => {
          const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.35, ease: "power3.out" });
          const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.35, ease: "power3.out" });
          const scale = gsap.quickTo(card, "scale", { duration: 0.35, ease: "power3.out" });
          const z = gsap.quickTo(card, "z", { duration: 0.35, ease: "power3.out" });

          const onMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            rotateX(gsap.utils.clamp(-4, 4, y * -8));
            rotateY(gsap.utils.clamp(-4, 4, x * 8));
            scale(1.01);
            z(10);
          };

          const onLeave = () => {
            rotateX(0);
            rotateY(0);
            scale(1);
            z(0);
          };

          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
          });
        });

        links.forEach((link) => {
          const x = gsap.quickTo(link, "x", { duration: 0.28, ease: "power3.out" });
          const y = gsap.quickTo(link, "y", { duration: 0.28, ease: "power3.out" });

          const onMove = (event: MouseEvent) => {
            const rect = link.getBoundingClientRect();
            const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
            const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

            x(gsap.utils.clamp(-4, 4, offsetX));
            y(gsap.utils.clamp(-4, 4, offsetY));
          };

          const onLeave = () => {
            x(0);
            y(0);
          };

          link.addEventListener("mousemove", onMove);
          link.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            link.removeEventListener("mousemove", onMove);
            link.removeEventListener("mouseleave", onLeave);
          });
        });

        return () => {
          cleanups.forEach((cleanup) => cleanup());
          gsap.set([...cards, ...links, root], { clearProps: "transform,transformStyle,transformPerspective,perspective,willChange" });
        };
      };

      const setupProofCards = ({ withNodes }: { withNodes: boolean }) => {
        const root = rootRef.current;
        const proofCards = gsap.utils.toArray<HTMLElement>("[data-proof]");

        const positionProofNodes = () => {
          if (!root || !withNodes) return;
          const rootRect = root.getBoundingClientRect();

          proofCards.forEach((card) => {
            const proofId = card.dataset.proof;
            const nodeWrap = proofId ? root.querySelector<HTMLElement>(`[data-proof-node="${proofId}"]`) : null;
            if (!nodeWrap) return;

            const cardRect = card.getBoundingClientRect();
            gsap.set(nodeWrap, { y: cardRect.top - rootRect.top + 32 - 16 });
          });
        };

        positionProofNodes();
        ScrollTrigger.addEventListener("refreshInit", positionProofNodes);
        ScrollTrigger.addEventListener("refresh", positionProofNodes);

        proofCards.forEach((card) => {
          const proofId = card.dataset.proof;
          const nodeWrap = proofId ? root?.querySelector<HTMLElement>(`[data-proof-node="${proofId}"]`) : null;
          const marker = nodeWrap?.querySelector(".trust-node");
          const ring = nodeWrap?.querySelector(".trust-node-ring");
          const markerTarget = marker && withNodes ? [marker] : [];
          const ringTarget = ring && withNodes ? [ring] : [];
          const sigTag = card.querySelector(".sig-tag");
          const sigPending = card.querySelector(".sig-pending");
          const sigOk = card.querySelector(".sig-ok");
          const sigCheck = card.querySelector(".sig-check");
          const bullets = card.querySelectorAll("li");

          gsap.set(card, { y: 30, opacity: 0 });
          gsap.set(bullets, { y: 12, opacity: 0 });
          if (marker) {
            gsap.set(marker, { scale: 0.6, backgroundColor: "#CBD5E1" });
          }
          if (ring) {
            gsap.set(ring, { scale: 0.65, opacity: 0, borderColor: "#175FB0" });
          }
          if (sigTag) {
            gsap.set(sigTag, { color: "#94A3B8", borderColor: "rgba(15,23,42,0.12)" });
          }
          if (sigPending) {
            gsap.set(sigPending, { display: "inline", opacity: 1 });
          }
          if (sigOk) {
            gsap.set(sigOk, {
              display: "inline-flex",
              left: "50%",
              opacity: 0,
              position: "absolute",
              scale: 1.12,
              top: "50%",
              xPercent: -50,
              yPercent: -50,
            });
          }
          if (sigCheck) {
            gsap.set(sigCheck, { opacity: 0, scale: 0 });
          }

          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            })
            .to(card, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
            .to(markerTarget, { scale: 1, backgroundColor: "#175FB0", duration: 0.35, ease: "back.out(2)" }, 0)
            .fromTo(ringTarget, { opacity: 0.7, scale: 0.6 }, { scale: 1.9, opacity: 0, duration: 0.7, ease: "power2.out" }, 0.08)
            .to(sigTag ? [sigTag] : [], { color: "#175FB0", borderColor: "#175FB0", duration: 0.25, ease: "power2.out" }, 0)
            .to(sigPending ? [sigPending] : [], { opacity: 0, duration: 0.2, ease: "power2.out" }, 0)
            .to(sigOk ? [sigOk] : [], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 0)
            .to(sigCheck ? [sigCheck] : [], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 0)
            .to(bullets, { y: 0, opacity: 1, stagger: 0.08, duration: 0.42, ease: "power3.out" }, 0.2);
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", positionProofNodes);
          ScrollTrigger.removeEventListener("refresh", positionProofNodes);
        };
      };

      const setupThread = () => {
        const bright = document.querySelector<SVGPathElement>(".thread-bright");
        if (!bright) return;
        const length = bright.getTotalLength();
        gsap.set(bright, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(bright, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".motion-page",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      };

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        setupHeroLoad();
        setupReveals();
        const cleanupSplitTextHeadings = setupSplitTextHeadings();
        const cleanupLivingFingerprint = setupLivingFingerprint();
        const cleanupProofCards = setupProofCards({ withNodes: true });
        setupThread();
        window.setTimeout(() => ScrollTrigger.refresh(), 250);
        return () => {
          cleanupSplitTextHeadings?.();
          cleanupLivingFingerprint?.();
          cleanupProofCards?.();
        };
      });

      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
        setupHeroLoad();
        setupReveals();
        const cleanupSplitTextHeadings = setupSplitTextHeadings();
        const cleanupLivingFingerprint = setupLivingFingerprint();
        const cleanupProofCards = setupProofCards({ withNodes: false });
        return () => {
          cleanupSplitTextHeadings?.();
          cleanupLivingFingerprint?.();
          cleanupProofCards?.();
        };
      });

      mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        return setupTiltCards();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        restoreHeroText();
        gsap.killTweensOf(".hero-eyebrow, .hero-title, .hero-tagline, .hero-fingerprint, .hero-fp-check");
        gsap.set("[data-reveal], [data-proof], [data-proof] li, [data-splittext], [data-tilt-card], [data-tilt-card] a, .hero-eyebrow, .hero-title, .hero-tagline, .hero-fingerprint, .hero-fp-check, .sig-tag, .sig-pending, .sig-ok, .sig-check, .trust-node, .trust-node-ring", {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  useEffect(() => {
    const sections = sectionNavItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);
        if (activeEntry?.target.id) {
          setActiveSection(activeEntry.target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="motion-page min-h-screen overflow-x-hidden">
      <nav
        aria-label="Section navigation"
        className="fixed right-[max(1.5rem,calc((100vw-900px)/2-7rem))] top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {sectionNavItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-2 py-1 text-right focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#175FB0]"
            >
              <span
                className={`font-mono text-[11px] tracking-wide motion-safe:transition-colors ${
                  isActive ? "font-medium text-accent-bright" : "text-[#5A6B80]"
                }`}
              >
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full motion-safe:transition-colors ${
                  isActive ? "bg-accent-bright" : "bg-[#CBD5E1]"
                }`}
              />
            </a>
          );
        })}
      </nav>
      <svg
        className="motion-thread pointer-events-none absolute bottom-0 left-[max(2rem,calc((100vw-900px)/2-4rem))] top-[70vh] z-10 hidden w-8 motion-reduce:hidden lg:block"
        aria-hidden="true"
        viewBox="0 0 32 1000"
        preserveAspectRatio="none"
      >
        <path d="M16 0V1000" stroke="#1591DC" strokeOpacity="0.22" strokeWidth="2" />
        <path className="thread-bright" d="M16 0V1000" stroke="#175FB0" strokeWidth="2.5" />
      </svg>
      {roles.map((role) => (
        <TrustNode key={role.proofId} proofId={role.proofId} />
      ))}
      <TrustNode proofId="project-cloudhsm" />
      <TrustNode proofId="credentials" />

      <main id="main-content">
        <section id="overview" className="relative flex min-h-[70vh] scroll-mt-24 items-center px-6 py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[900px]">
            <p className="hero-eyebrow overflow-hidden font-mono text-sm text-accent-bright">
              {profile.eyebrow}
            </p>
            <h1 className="hero-title mt-4 bg-gradient-to-r from-slate-900 to-[#175FB0] bg-clip-text font-display text-5xl font-bold leading-tight text-transparent lg:text-7xl">
              {profile.name}
            </h1>
            <p className="hero-tagline mt-4 text-2xl text-accent-bright">
              {profile.tagline}
            </p>
            <div className="mt-8 overflow-hidden whitespace-nowrap border-t border-[rgba(15,23,42,0.08)] pt-6 font-mono text-xs text-slate-600">
              <span className="hero-fingerprint">{profile.fingerprint}</span>
              <span className="hero-fp-check ml-2 inline-block text-accent-bright">✓</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              <a className="text-accent-bright hover:underline" href={`mailto:${contact.email}`}>Email</a>
              <a className="text-accent-bright hover:underline" href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="text-accent-bright hover:underline" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="text-accent-bright hover:underline" href={contact.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
            </div>
          </div>
          <div className="motion-safe:animate-[motionCue_1.8s_ease-in-out_infinite] absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-600">
            scroll ↓
          </div>
        </section>

        <section className="px-6 pt-4 pb-12 lg:pb-16">
          <div data-reveal className="mx-auto max-w-[760px] text-xl text-slate-700 lg:text-2xl">
            <Summary />
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-[900px] space-y-8">
            {roles.map((role) => (
              <div key={role.title} data-tilt-card>
                <article data-proof={role.proofId} className="proof-card rounded-xl border border-[rgba(15,23,42,0.10)] bg-white/95 p-5 backdrop-blur-md shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.12)] supports-[backdrop-filter]:bg-white/[0.82] lg:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 data-splittext className="font-display text-xl font-semibold text-slate-900">{role.title}</h2>
                    <SignatureTag />
                  </div>
                  <p className="mt-2 font-mono text-xs uppercase text-[#5A6B80]">{role.meta}</p>
                  <ul className="mt-5 space-y-3 text-sm text-slate-700">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="text-accent-bright" aria-hidden="true">
                          •
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-[900px]">
            <div data-proof="project-cloudhsm" data-tilt-card className="proof-card">
              <Card>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <CardEyebrow className="mb-0">section: projects</CardEyebrow>
                  <SignatureTag />
                </div>
                <h2 data-splittext className="mb-3 font-display text-xl font-semibold text-slate-900 lg:text-2xl">{project.title}</h2>
                <CardContent>
                  <p className="text-sm text-slate-700">
                    {project.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={contact.githubProject}
                      className="text-accent-bright hover:underline font-medium min-h-[44px] flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View repository →
                    </a>
                    <a
                      href={contact.github}
                      className="text-[#5A6B80] hover:text-accent-bright text-sm min-h-[44px] flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Other repos →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="client-work" className="scroll-mt-24 px-6 py-12 lg:py-16">
          <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clientWork.map((work) => (
              <div key={work.title} data-reveal data-tilt-card>
                <Card className="relative h-full">
                  <CardEyebrow>section: client work</CardEyebrow>
                  <h3 data-splittext className="mb-3 font-display text-lg font-semibold text-slate-900 lg:text-xl">{work.title}</h3>
                  <p className="mb-4 font-mono text-xs uppercase text-[#5A6B80]">{work.meta}</p>
                  <CardContent>
                    <BulletList bullets={work.bullets} />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section id="credentials" className="scroll-mt-24 px-6 py-12 lg:py-16">
          <div className="proof-card mx-auto max-w-[900px]" data-proof="credentials" data-tilt-card>
            <Card>
              <div className="mb-3 flex items-start justify-between gap-3">
                <CardEyebrow className="mb-0">keyUsage: proof</CardEyebrow>
                <SignatureTag />
              </div>
              <h2 data-splittext className="mb-3 font-display text-xl font-semibold text-slate-900 lg:text-2xl">Credentials</h2>
              <CardContent>
                <ul className="space-y-2">
                  {badges.map((badge) => (
                    <li key={badge.name} className="flex items-start gap-2 text-sm text-slate-700">
                      <span aria-hidden="true" className="text-accent-bright mt-1 leading-none">
                        ›
                      </span>
                      <span>{badge.name}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-[rgba(15,23,42,0.08)] pt-4">
                  <div className="mb-3 font-mono text-xs text-[#5A6B80]">verified badges</div>
                  <BadgeCarousel badges={badges} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="expertise" className="scroll-mt-24 px-6 py-12 lg:py-16">
          <div className="mx-auto grid max-w-[900px] gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-reveal data-tilt-card>
              <Card className="h-full">
                <CardEyebrow>section: expertise</CardEyebrow>
                <h2 data-splittext className="mb-3 font-display text-xl font-semibold text-slate-900 lg:text-2xl">Areas of Expertise</h2>
                <CardContent>
                  <BulletList bullets={expertise} />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-bright" aria-hidden="true">
                        •
                      </span>
                      <span className="text-slate-700">
                        <span className="text-[#5A6B80]">(Emerging)</span> {expertiseEmerging}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div data-reveal data-tilt-card>
              <Card className="h-full">
                <CardEyebrow>section: technical</CardEyebrow>
                <h2 data-splittext className="mb-3 font-display text-xl font-semibold text-slate-900 lg:text-2xl">Technical Skills</h2>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    {techSkills.map((skill) => (
                      <div key={skill.label}>
                        <div className="font-medium text-accent-bright mb-2">
                          {skill.label}{" "}
                          {skill.emerging ? (
                            <span className="text-[#5A6B80] font-normal text-xs">(emerging)</span>
                          ) : null}
                        </div>
                        <p className="text-[#5A6B80]">{skill.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="education" className="scroll-mt-24 px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-[900px]" data-reveal data-tilt-card>
            <Card>
              <CardEyebrow>section: education</CardEyebrow>
              <h2 data-splittext className="mb-3 font-display text-xl font-semibold text-slate-900 lg:text-2xl">Education &amp; Honors</h2>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium text-slate-900 mb-1">{education.degree}</div>
                    <p className="text-[#5A6B80] text-xs">{education.school} ({education.year})</p>
                  </div>

                  <div className="border-t border-[rgba(15,23,42,0.08)] pt-4">
                    <div className="font-medium text-accent-bright mb-2">Competitive Programming</div>
                    <ul className="space-y-2 text-[#5A6B80]">
                      {honors.map((honor) => (
                        <li key={honor}>{honor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-[900px]">
            <div className="flex items-center gap-3">
              <svg className="h-12 w-12" viewBox="0 0 48 48" role="img" aria-labelledby="seal-title">
                <title id="seal-title">Verified seal</title>
                <path d={sealPath()} fill="#FFFFFF" stroke="#175FB0" strokeWidth="2" />
                <path d="M15 24l6 6 13-15" fill="none" stroke="#175FB0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
              <span className="font-mono text-xs text-accent-bright">verified</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <a className="text-accent-bright hover:underline" href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">
                Email
              </a>
              <a className="text-accent-bright hover:underline" href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="text-accent-bright hover:underline" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="text-accent-bright hover:underline" href={contact.resume} target="_blank" rel="noopener noreferrer">
                Résumé
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
