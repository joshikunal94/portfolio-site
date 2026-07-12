import { Badge } from "@/components/Badge";
import { BadgeCarousel } from "@/components/BadgeCarousel";
import { Card, CardContent, CardEyebrow, CardTitle } from "@/components/Card";
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

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start">
          <span className="text-accent-bright mr-2 mt-1">•</span>
          <span className="text-slate-700">{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

export function BentoLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="max-w-[1280px] mx-auto px-4 lg:px-8 py-6">
        <h1 className="sr-only">
          {profile.name} - {profile.tagline}
        </h1>
      </header>

      <main id="main-content" className="max-w-[1280px] mx-auto px-4 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          <div className="lg:col-span-8">
            <Card className="h-full">
              <CardEyebrow>{profile.eyebrow}</CardEyebrow>
              <h2 className="font-display font-bold bg-gradient-to-r from-slate-900 to-[#175FB0] bg-clip-text text-transparent text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-tight mb-4">
                {profile.name}
              </h2>
              <p className="text-xl lg:text-2xl text-accent-bright font-medium mb-6">
                {profile.tagline}
              </p>
              <CardContent>
                <p className="text-base lg:text-lg text-slate-700">
                  <Summary />
                </p>
                <p className="text-[#5A6B80] text-base">{profile.location}</p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-accent-bright hover:underline font-medium min-h-[44px] flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email
                  </a>
                  <a
                    href={contact.github}
                    className="text-accent-bright hover:underline font-medium min-h-[44px] flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href={contact.linkedin}
                    className="text-accent-bright hover:underline font-medium min-h-[44px] flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={contact.resume}
                    className="text-accent-bright hover:underline font-medium min-h-[44px] flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Résumé (PDF)"
                  >
                    Résumé (PDF)
                  </a>
                </div>
              </CardContent>

              <div
                className="mt-5 pt-5 border-t border-[rgba(15,23,42,0.08)] font-mono text-xs text-[#5A6B80] tracking-wider overflow-hidden whitespace-nowrap text-ellipsis"
                aria-hidden="true"
              >
                {profile.fingerprint}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="h-full">
              <CardEyebrow>keyUsage: proof</CardEyebrow>
              <CardTitle>Credentials</CardTitle>
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

                <div className="mt-5 pt-4 border-t border-[rgba(15,23,42,0.08)]">
                  <div className="text-xs font-mono text-[#5A6B80] mb-3">verified badges</div>
                  <BadgeCarousel badges={badges} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="h-full">
              <CardEyebrow>section: projects</CardEyebrow>
              <CardTitle>{project.title}</CardTitle>
              <CardContent>
                <p className="text-sm text-slate-700 mb-4">{project.blurb}</p>
                <div className="flex flex-wrap gap-2 mb-4">
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

          <div className="lg:col-span-7">
            <Card className="h-full">
              <CardEyebrow>section: experience</CardEyebrow>
              <CardTitle>Experience</CardTitle>
              <CardContent>
                {roles.map((role, index) => (
                  <div
                    key={role.proofId}
                    className={index === 0 ? "mb-6" : "border-t border-[rgba(15,23,42,0.08)] pt-5"}
                  >
                    <h3 className="font-display font-semibold text-lg text-slate-900 mb-1">
                      {role.title}
                    </h3>
                    <div className="font-mono text-xs text-[#5A6B80] uppercase mb-3">
                      {role.meta}
                    </div>
                    <BulletList bullets={role.bullets} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {clientWork.map((work) => (
            <div key={work.proofId} className="lg:col-span-4">
              <Card className="h-full">
                <CardEyebrow>section: client work</CardEyebrow>
                <CardTitle as="h3">{work.title}</CardTitle>
                <p className="text-xs font-mono text-[#5A6B80] uppercase mb-4">{work.meta}</p>
                <CardContent>
                  <BulletList bullets={work.bullets} />
                </CardContent>
              </Card>
            </div>
          ))}

          <div className="lg:col-span-5">
            <Card className="h-full">
              <CardEyebrow>section: expertise</CardEyebrow>
              <CardTitle>Areas of Expertise</CardTitle>
              <CardContent>
                <BulletList bullets={expertise} />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-accent-bright mr-2 mt-1">•</span>
                    <span className="text-slate-700">
                      <span className="text-[#5A6B80]">(Emerging)</span> {expertiseEmerging}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="h-full">
              <CardEyebrow>section: technical</CardEyebrow>
              <CardTitle>Technical Skills</CardTitle>
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

          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardEyebrow>section: education</CardEyebrow>
              <CardTitle>Education & Honors</CardTitle>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium text-slate-900 mb-1">{education.degree}</div>
                    <p className="text-[#5A6B80] text-xs">
                      {education.school} ({education.year})
                    </p>
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
        </div>
      </main>

      <footer className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10 border-t border-[rgba(15,23,42,0.08)] mt-12">
        <div className="flex flex-wrap gap-6 items-center justify-between text-sm text-[#5A6B80]">
          <div className="flex flex-wrap gap-4">
            <a
              href={contact.resume}
              className="text-accent-bright hover:underline min-h-[44px] flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Résumé (PDF)"
            >
              Résumé (PDF)
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-accent-bright hover:underline min-h-[44px] flex items-center"
            >
              {contact.email}
            </a>
          </div>
          <div>© 2026 {profile.name}</div>
        </div>
      </footer>
    </div>
  );
}
