export type SummarySegment = {
  text: string;
  strong?: boolean;
};

export type ProofItem = {
  proofId: string;
  title: string;
  meta: string;
  bullets: string[];
};

export type TechSkill = {
  label: string;
  value: string;
  emerging?: boolean;
};

export const profile = {
  name: "Kunal Joshi",
  tagline: "Cloud & AI Security Architect",
  location: "Mumbai, India",
  eyebrow: "CN=Kunal Joshi · O=Cloud Security · L=Mumbai, IN",
  fingerprint:
    "3F:A2:9C:D4:E7:1B:4F:8D:2A:6E:C5:B9:F1:3D:7A:E4:9B:2F:6C:D8:4E:A1:7F:3C:B5:E9:1D:8A:4F:C2:6B:9E",
  summary: [
    {
      text: "Cloud & AI security architect with 8+ years at AWS designing, securing, and delivering enterprise-grade systems end to end — from secure development and IaC pipelines through production vulnerability remediation. Deep specialist in ",
    },
    { text: "identity & access management", strong: true },
    { text: " and " },
    { text: "applied cryptography", strong: true },
    {
      text: " (KMS / CloudHSM / PKCS#11), with hands-on delivery for regulated financial customers — multinational banks, brokerages, and large lending institutions. Increasingly focused on",
    },
    { text: " security for AI agent systems", strong: true },
    {
      text: " — identity propagation, delegated authorization, least-privilege for agentic / MCP architectures, and using AI to accelerate security remediation at scale.",
    },
  ] satisfies SummarySegment[],
};

export const contact = {
  email: "joshikunal16@gmail.com",
  github: "https://github.com/joshikunal94",
  githubProject: "https://github.com/joshikunal94/cloudhsm_management_dashboard",
  linkedin: "https://www.linkedin.com/in/joshikunal16/",
  resume: "/kunal-joshi-resume.pdf",
};

export const roles = [
  {
    proofId: "role-cloud-security-architect",
    title: "Cloud Security Architect",
    meta: "AWS Professional Services · Mumbai · May 2024–Present",
    bullets: [
      "Lead cloud security assessments for pre-IPO firms, multinational banks, brokerages, and lenders — CTO/CISO steering sessions, readouts, prioritized remediation roadmaps",
      "Design and pilot security automation pipelines that run agentic workflows on every build: AI code review, penetration testing, threat modeling (AWS Security Agent)",
      "Secure GenAI and agentic workloads — model access control, secure RAG pipelines, identity and authorization patterns for agents (Amazon Bedrock, AgentCore)",
      "Design identity for agentic AI: on-behalf-of token exchange, agent-to-agent trust, least-privilege for autonomous agents and MCP-based tools",
      "Overhaul customer IAM posture — least privilege, MFA, SSO federation, Just-In-Time access — replacing standing admin permissions across AWS organizations",
      "Build cloud-native SIEM/SOC on OpenSearch from raw log ingestion to near-real-time alerting; largest handles ~1TB/day for a stock brokerage",
    ],
  },
  {
    proofId: "role-cloud-engineer-security",
    title: "Cloud Engineer II – Security",
    meta: "Amazon Web Services · Bangalore · Dec 2017–May 2024",
    bullets: [
      "Resolved complex issues across AWS security services: IAM, Cognito, SSO, KMS, CloudHSM, GuardDuty, Inspector",
      "Recognized SME for AWS IAM (federation, SAML, SSO) and for cryptography (KMS, CloudHSM, JCE, PKCS#11, OpenSSL engine)",
      "Designed internal AWS security training on IAM, CloudHSM, SSO, Secrets Manager",
      "Fixed SDK issues across Python/Java/C++/C#/JS/Ruby/Go/PHP for cross-language compatibility",
      "Onboarded 60+ applications into AWS SSO application catalog",
    ],
  },
] satisfies ProofItem[];

export const clientWork = [
  {
    proofId: "client-iam-orchestrator",
    title: "IAM Least-Privilege Orchestrator",
    meta: "for a leading multinational bank",
    bullets: [
      "Full-stack IAM governance + automated remediation across an entire AWS Organization",
      "Automated access reviews via org-wide CloudTrail usage analysis",
      "SAML auth via Identity Center + two-person-review (2PR) approval workflow",
      "Remediated excessive permissions for thousands of users/roles across hundreds of accounts",
    ],
  },
  {
    proofId: "client-kms-orchestrator",
    title: "KMS Key-Policy Least-Privilege Orchestrator",
    meta: "for a leading multinational bank",
    bullets: [
      "Detect excessive cryptographic key privileges, generate least-privilege fixes",
      "Analytics engine over high-volume CloudTrail logs",
      "GitHub-integrated approval workflows to visualize, track, and audit changes",
      "Thousands of KMS keys under continuous policy governance",
    ],
  },
  {
    proofId: "client-siem-soc",
    title: "Cloud-Native SIEM & SOC",
    meta: "for a leading stock brokerage firm",
    bullets: [
      "Built cloud-native SIEM on AWS OpenSearch",
      "Custom Java log processor handling 10M+ events/minute",
      "Integrated public + privately subscribed threat intelligence; Incident Manager paging",
      "Near-real-time alerting at ~1TB/day log volume, no downtime",
    ],
  },
  {
    proofId: "client-sbom-inventory",
    title: "Org-Wide SBOM Inventory & Visualization",
    meta: "for a leading lending firm",
    bullets: [
      "Organization-wide SBOM inventory from Amazon Inspector exports to S3",
      "Analytics layer on Glue Data Catalog + Athena + QuickSight dashboards",
      "Search by component, version, runtime (EC2/Lambda/ECS), region, account, CVE",
      "Audit-ready visibility for the CISO — e.g. every host on Python ≤3.9 in minutes",
    ],
  },
] satisfies ProofItem[];

export const expertise = [
  "AI & agentic systems security (agent identity, delegated authorization, A2A & MCP, Bedrock / AgentCore)",
  "Identity & Access Management (IAM, federation, SAML, OAuth, SSO, JIT)",
  "Applied cryptography & data protection (AWS KMS, CloudHSM, PKCS#11, JCE, OpenSSL engine)",
  "AWS security architecture & governance (least privilege, logging/monitoring, incident response)",
  "Application security & DevSecOps (SAST / DAST / SCA / SBOM, policy-as-code, AI-powered tooling)",
  "Cloud-native SIEM / SOC (OpenSearch)",
];

export const expertiseEmerging =
  "AI-accelerated security remediation — agentic code review, pen-testing, and threat modeling in CI";

export const techSkills: TechSkill[] = [
  { label: "Languages", value: "Python, Java, C/C++" },
  { label: "IAM", value: "OAuth, SAML, AWS IAM, Identity Center, federation, SSO, JIT access" },
  {
    label: "Cryptography",
    value: "AWS KMS, CloudHSM, PKCS#11, JCE, OpenSSL dynamic engine, Encryption SDK",
  },
  {
    label: "AI / Agent Security",
    value:
      "Agentic identity & delegated authorization, A2A & MCP authorization, Amazon Bedrock & AgentCore, secure RAG, LLM guardrails",
  },
  {
    label: "AppSec / DevSecOps",
    value: "AI-powered security tooling, SAST / DAST / SCA / SBOM, vulnerability management, policy-as-code",
  },
  { label: "Security Operations", value: "Cloud SIEM/SOC (OpenSearch), threat hunting" },
  { label: "Cloud", value: "AWS security architecture & automation, IaC, CI/CD" },
];

export const education = {
  degree: "B.Tech, Computer Science",
  school: "College of Technology and Engineering, Udaipur",
  year: "2017",
};

export const honors = [
  "ACM ICPC 2016 — Kolkata regional finals, Rank 58",
  "Google Code Jam 2017–18 — qualified; #2223 Round 1 (2017)",
  "Tata Codevita 2016 — AIR 98",
];

export const project = {
  title: "CloudHSM Management Dashboard",
  blurb:
    "Web UI to manage AWS CloudHSM clusters without wrangling command-line tools. Create AES/RSA/EC keys, search, and delete keys through a clean UI; test HSM connection before saving.",
  tags: ["CloudHSM", "PKCS#11", "FastAPI", "React", "Cryptography"],
};

export const summaryText = profile.summary.map((segment) => segment.text).join("");
