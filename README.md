# Kunal Joshi

**Cloud & AI Security Architect** — Mumbai, India

🌐 [joshikunal.com](https://joshikunal.com) · 💼 [LinkedIn](https://www.linkedin.com/in/joshikunal16/) · 🐙 [GitHub](https://github.com/joshikunal94) · ✉️ joshikunal16@gmail.com

---

Cloud & AI security architect with 8+ years at AWS designing, securing, and delivering enterprise-grade
systems end to end — from secure development and IaC pipelines through production vulnerability
remediation. Deep specialist in **identity & access management** and **applied cryptography**
(KMS / CloudHSM / PKCS#11), with hands-on delivery for regulated financial customers — multinational
banks, brokerages, and large lending institutions. Increasingly focused on **security for AI agent
systems** — identity propagation, delegated authorization, least-privilege for agentic / MCP
architectures — and on using AI to accelerate security remediation at scale.

## Areas of expertise

- AI & agentic systems security (agent identity, delegated authorization, A2A & MCP, Bedrock / AgentCore)
- Identity & Access Management (IAM, federation, SAML, OAuth, SSO, JIT)
- Applied cryptography & data protection (AWS KMS, CloudHSM, PKCS#11, JCE, OpenSSL engine)
- AWS security architecture & governance (least privilege, logging/monitoring, incident response)
- Application security & DevSecOps (SAST / DAST / SCA / SBOM, policy-as-code, AI-powered tooling)
- Cloud-native SIEM / SOC (OpenSearch)

## Experience

### Cloud Security Architect — AWS Professional Services (Mumbai)
*May 2024 – Present*

- Lead cloud security assessments for pre-IPO firms, multinational banks, brokerages, and lenders —
  CTO/CISO steering sessions, readouts, prioritized remediation roadmaps.
- Design and pilot security automation pipelines that run agentic workflows on every build: AI code
  review, penetration testing, threat modeling (AWS Security Agent).
- Secure GenAI and agentic workloads — model access control, secure RAG pipelines, identity and
  authorization patterns for agents (Amazon Bedrock, AgentCore).
- Design identity for agentic AI: on-behalf-of token exchange, agent-to-agent trust, least-privilege
  for autonomous agents and MCP-based tools.
- Overhaul customer IAM posture — least privilege, MFA, SSO federation, Just-In-Time access — replacing
  standing admin permissions across AWS organizations.
- Build cloud-native SIEM/SOC on OpenSearch from raw log ingestion to near-real-time alerting; the
  largest handles ~1TB/day for a stock brokerage.

### Cloud Engineer II – Security — Amazon Web Services (Bangalore)
*Dec 2017 – May 2024*

- Resolved complex issues across AWS security services: IAM, Cognito, SSO, KMS, CloudHSM, GuardDuty, Inspector.
- Recognized SME for AWS IAM (federation, SAML, SSO) and for cryptography (KMS, CloudHSM, JCE, PKCS#11, OpenSSL engine).
- Designed internal AWS security training on IAM, CloudHSM, SSO, Secrets Manager.
- Fixed SDK issues across Python/Java/C++/C#/JS/Ruby/Go/PHP for cross-language compatibility.
- Onboarded 60+ applications into AWS SSO application catalog.

## Selected client work

- **IAM least-privilege orchestrator** (multinational bank) — org-wide CloudTrail usage analysis,
  automated remediation with 2PR approvals; thousands of principals across hundreds of accounts.
- **KMS key-policy least-privilege orchestrator** (multinational bank) — GitHub-integrated approval
  workflows across thousands of keys.
- **Cloud-native SIEM & SOC** (stock brokerage) — OpenSearch, custom Java pipeline at 10M+
  events/minute, ~1TB/day, near-real-time alerting.
- **Organization-wide SBOM inventory** (lending firm) — Inspector exports → Glue / Athena / QuickSight;
  search by component, version, runtime, CVE.

## Selected projects

**[CloudHSM Management Dashboard](https://github.com/joshikunal94/cloudhsm_management_dashboard)** — open source
A web UI to manage AWS CloudHSM clusters without wrangling command-line tools: create AES/RSA/EC keys,
search, and delete keys through a clean UI, with a connection test before saving. React frontend +
FastAPI backend, PyKCS11 talking directly to the cluster, Dockerized.

## Technical proficiencies

| | |
|---|---|
| **Languages** | Python, Java, C/C++ |
| **IAM** | OAuth, SAML, AWS IAM, Identity Center, federation, SSO, JIT access |
| **Cryptography** | AWS KMS, CloudHSM, PKCS#11, JCE, OpenSSL dynamic engine, Encryption SDK |
| **AI / agent security** | Agentic identity & delegated authorization, A2A & MCP authorization, Amazon Bedrock & AgentCore, secure RAG, LLM guardrails |
| **AppSec / DevSecOps** | AI-powered security tooling, SAST / DAST / SCA / SBOM, vulnerability management, policy-as-code |
| **Security operations** | Cloud SIEM/SOC (OpenSearch), threat hunting |
| **Cloud** | AWS security architecture & automation, IaC, CI/CD |

## Certifications

- AWS Certified Security – Specialty
- AWS Certified AI Practitioner
- Anthropic Claude Certified Architect
- AWS internal SME: IAM, KMS, CloudHSM

## Education

**B.Tech, Computer Science** — College of Technology and Engineering, Udaipur (2017)

---

## About this repository

Source for my personal site at **[joshikunal.com](https://joshikunal.com)** — a Next.js static-export
site served by Cloudflare Workers (static assets), deployed automatically from `main`.

- [`site/`](site/) — the Next.js application, `wrangler.jsonc`, build + deploy notes.
- [`docs/`](docs/) — technical notes (architecture, SEO).
