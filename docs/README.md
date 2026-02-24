# T2C Documentation

T2C (Tranche 2 Compliance) is a web application that guides Australian businesses through their AML/CTF obligations under the reformed AML/CTF Act (Tranche 2), effective 1 July 2026.

---

## Folder Structure

```
docs/
├── README.md                          ← You are here
├── strategy/
│   └── monetization-strategy.md
├── architecture/
│   ├── auth.md
│   ├── monetization.md
│   └── austrac-sync-pipeline.md
├── guides/
│   ├── auth-setup.md
│   └── monetization-setup.md
├── product/
│   ├── real-estate.md
│   ├── accountants.md
│   └── jewellers.md
└── legal/
    └── lawyer-handoff-pack.md
```

---

## Documents by Category

### Strategy

| Document | Description | Status |
|----------|-------------|--------|
| [monetization-strategy.md](strategy/monetization-strategy.md) | Freemium monetization strategy and market opportunity analysis | Active |

### Architecture

| Document | Description | Status |
|----------|-------------|--------|
| [auth.md](architecture/auth.md) | Authentication service technical design (AWS Cognito) | Active |
| [monetization.md](architecture/monetization.md) | Monetization technical design (Stripe, subscriptions, Lambda) | Active |
| [austrac-sync-pipeline.md](architecture/austrac-sync-pipeline.md) | Pipeline design for syncing content with AUSTRAC source material | Planned |

### Guides

| Document | Description | Status |
|----------|-------------|--------|
| [auth-setup.md](guides/auth-setup.md) | Step-by-step authentication setup, configuration, and troubleshooting | Active |
| [monetization-setup.md](guides/monetization-setup.md) | Manual setup for Stripe, AWS, DNS, and secrets management | Active |
| [stripe-setup.md](guides/stripe-setup.md) | Quick-reference Stripe setup checklist with values to collect | Active |

### Product Specs

| Document | Description | Status |
|----------|-------------|--------|
| [real-estate.md](product/real-estate.md) | Product concept for real estate agents (v2.0) | Active |
| [accountants.md](product/accountants.md) | Product concept for accountants (v1.3) | Active |
| [jewellers.md](product/jewellers.md) | Product concept for jewellers and precious metals dealers (v1.0) | Active |

### Legal

| Document | Description | Status |
|----------|-------------|--------|
| [lawyer-handoff-pack.md](legal/lawyer-handoff-pack.md) | Brief for legal review of terms, disclaimer, and privacy policy | Draft |
