# Kunal Joshi

**Cloud & AI Security Architect** — Mumbai, India

🌐 [joshikunal.com](https://joshikunal.com) · 💼 [LinkedIn](https://www.linkedin.com/in/joshikunal16/) · 🐙 [GitHub](https://github.com/joshikunal94) · ✉️ joshikunal16@gmail.com

---

Security engineer and AWS cloud security architect with 8 years designing, securing, and optimizing
enterprise-grade systems. Deep specialist in **identity & access management** and **applied
cryptography** (KMS / CloudHSM / PKCS#11), with hands-on delivery for regulated financial customers.
Increasingly focused on **security for AI agent systems** — identity propagation, delegated
authorization, and least-privilege for agentic / MCP architectures.

## Areas of expertise

- Identity & Access Management (IAM, federation, SAML, OAuth, SSO, JIT)
- Applied cryptography & key management (AWS KMS, CloudHSM, PKCS#11, JCE, OpenSSL engine)
- AWS security architecture & governance (least privilege, logging/monitoring, incident response, data protection)
- Cloud-native SIEM / SOC (OpenSearch)
- Infrastructure as Code & security automation
- *(Emerging)* AI / agent security — on-behalf-of token exchange (RFC 8693), A2A & MCP authorization

## Experience

### Cloud Security Architect — Amazon Web Services (Mumbai)
*May 2024 – Present*

- Translate customer security requirements into AWS architectures across IAM, KMS, CloudTrail, GuardDuty.
- Strengthen customer IAM posture: least privilege, MFA, credential rotation, SSO via Azure AD/Okta, Just-In-Time access.
- Deliver end-to-end security solutions for enterprise customers handling sensitive financial data under Indian regulatory standards.
- Architect defenses across AWS security pillars: identity, logging/monitoring, incident response, data protection, infrastructure security.

### Cloud Engineer II – Security — Amazon Web Services (Bangalore)
*Dec 2017 – May 2024*

- Resolved complex issues across AWS security services: IAM, Cognito, SSO, KMS, CloudHSM, GuardDuty, Inspector.
- Recognized SME for AWS IAM (federation, SAML, SSO) and for cryptography (KMS, CloudHSM).
- Designed internal AWS security training on IAM, CloudHSM, SSO, Secrets Manager.
- Fixed SDK issues across Python/Java/C++/C#/JS/Ruby/Go/PHP for cross-language compatibility.
- Onboarded 60+ applications into AWS SSO application catalog.

## Selected projects

**[CloudHSM Management Dashboard](https://github.com/joshikunal94/cloudhsm_management_dashboard)** — open source
A web UI to manage AWS CloudHSM clusters without wrangling command-line tools: create AES/RSA/EC keys,
search, and delete keys through a clean UI, with a connection test before saving. React frontend +
FastAPI backend, PyKCS11 talking directly to the cluster, Dockerized.

## Technical proficiencies

| | |
|---|---|
| **Languages** | Python, Java, C/C++ |
| **IAM** | OAuth, SAML, AWS IAM, Identity Center |
| **Cryptography** | AWS KMS, CloudHSM, PKCS#11, JCE, OpenSSL dynamic engine, Encryption SDK |
| **Security operations** | Cloud SIEM/SOC, threat hunting |
| **Cloud** | AWS security architecture & automation, IaC |

## Certifications

- AWS Certified Security – Specialty
- AWS Certified AI Practitioner
- Anthropic Claude Certified Architect (L300)

## Education

**B.Tech, Computer Science** — College of Technology and Engineering, Udaipur (2017)

---

## About this repository

Source for my personal site at **[joshikunal.com](https://joshikunal.com)** — a Next.js static-export
site hosted on S3 + CloudFront (private bucket, Origin Access Control).

- [`site/`](site/) — the Next.js application.
- [`infra/`](infra/) — CloudFormation template + deploy scripts for the S3/CloudFront hosting.
- [`docs/`](docs/) — technical notes (architecture, SEO).
