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
      text: "Security engineer and AWS cloud security architect with 8 years designing, securing, and optimizing enterprise-grade systems. Deep specialist in ",
    },
    { text: "identity & access management", strong: true },
    { text: " and " },
    { text: "applied cryptography", strong: true },
    {
      text: " (KMS / CloudHSM / PKCS#11), with hands-on delivery for regulated financial customers. Increasingly focused on",
    },
    { text: " security for AI agent systems", strong: true },
    {
      text: " — identity propagation, delegated authorization, and least-privilege for agentic / MCP architectures.",
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
    meta: "Amazon Web Services · Mumbai · May 2024–Present",
    bullets: [
      "Translate customer security requirements into AWS architectures across IAM, KMS, CloudTrail, GuardDuty",
      "Strengthen customer IAM posture: least privilege, MFA, credential rotation, SSO via Azure AD/Okta, Just-In-Time access",
      "Deliver end-to-end security solutions for enterprise customers handling sensitive financial data under Indian regulatory standards",
      "Architect defenses across AWS security pillars: identity, logging/monitoring, incident response, data protection, infrastructure security",
    ],
  },
  {
    proofId: "role-cloud-engineer-security",
    title: "Cloud Engineer II – Security",
    meta: "Amazon Web Services · Bangalore · Dec 2017–May 2024",
    bullets: [
      "Resolved complex issues across AWS security services: IAM, Cognito, SSO, KMS, CloudHSM, GuardDuty, Inspector",
      "Recognized SME for AWS IAM (federation, SAML, SSO) and for cryptography (KMS, CloudHSM)",
      "Designed internal AWS security training on IAM, CloudHSM, SSO, Secrets Manager",
      "Fixed SDK issues across Python/Java/C++/C#/JS/Ruby/Go/PHP for cross-language compatibility",
      "Onboarded 60+ applications into AWS SSO application catalog",
    ],
  },
] satisfies ProofItem[];

export const clientWork = [
  {
    proofId: "client-siem-soc",
    title: "Cloud-Native SIEM & SOC",
    meta: "for a leading stock brokerage firm",
    bullets: [
      "Built cloud-native SIEM on AWS OpenSearch",
      "Custom Java log processor handling 10M+ events/minute",
      "Integrated public + privately subscribed threat intelligence",
      "Near-real-time alerting at ~1TB/day log volume",
    ],
  },
  {
    proofId: "client-kms-orchestrator",
    title: "KMS Key-Policy Least-Privilege Orchestrator",
    meta: "for a leading multinational bank",
    bullets: [
      "Identify and remediate excessive cryptographic key privileges (PCI-DSS, SOC 2)",
      "Analytics engine over high-volume CloudTrail logs",
      "Automated GitHub integration with approval workflows",
      "Track and audit policy changes across thousands of KMS keys",
    ],
  },
  {
    proofId: "client-iam-orchestrator",
    title: "IAM Least-Privilege Orchestrator",
    meta: "for a leading multinational bank",
    bullets: [
      "Full-stack IAM governance platform (SOC 2, ISO 27001)",
      "Automated access reviews via org-wide CloudTrail analysis",
      "SAML auth + two-person-review (2PR) approval workflow",
      "AWS Cloudscape UI with RBAC and automated quarterly audit reports",
    ],
  },
] satisfies ProofItem[];

export const expertise = [
  "Identity & Access Management (IAM, federation, SAML, OAuth, SSO, JIT)",
  "Applied cryptography & key management (AWS KMS, CloudHSM, PKCS#11, JCE, OpenSSL engine)",
  "AWS security architecture & governance (least privilege, logging/monitoring, incident response, data protection)",
  "Cloud-native SIEM / SOC (OpenSearch)",
  "Infrastructure as Code & security automation",
];

export const expertiseEmerging =
  "AI / agent security — on-behalf-of token exchange (RFC 8693), A2A & MCP authorization";

export const techSkills = [
  { label: "Languages", value: "Python, Java, C/C++" },
  { label: "IAM", value: "OAuth, SAML, AWS IAM, Identity Center" },
  {
    label: "Cryptography",
    value: "AWS KMS, CloudHSM, PKCS#11, JCE, OpenSSL dynamic engine, Encryption SDK",
  },
  { label: "Security Operations", value: "Cloud SIEM/SOC, threat hunting" },
  { label: "Cloud", value: "AWS security architecture & automation, IaC" },
  {
    label: "AI / Agent Security",
    value:
      "Agentic identity, delegated authorization, RFC 8693 token exchange, A2A, MCP, least-privilege for agentic tools",
    emerging: true,
  },
] satisfies TechSkill[];

export const education = {
  degree: "B.Tech, Computer Science",
  school: "College of Technology and Engineering, Udaipur",
  year: "2017",
};

export const honors = [
  "ACM ICPC 2016 — Kolkata regional finals, Rank 58",
  "Google Code Jam 2017–18",
  "Tata Codevita 2016 — AIR 98",
];

export const project = {
  title: "CloudHSM Management Dashboard",
  blurb:
    "Web UI to manage AWS CloudHSM clusters without wrangling command-line tools. Create AES/RSA/EC keys, search, and delete keys through a clean UI; test HSM connection before saving.",
  tags: ["CloudHSM", "PKCS#11", "FastAPI", "React", "Cryptography"],
};

export const summaryText = profile.summary.map((segment) => segment.text).join("");
