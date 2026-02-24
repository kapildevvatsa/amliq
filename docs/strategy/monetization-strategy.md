# T2C Monetization Strategy

## Executive Summary

T2C (Tranche 2 Compliance) is positioned at the intersection of a regulatory deadline (1 July 2026) and a large underserved market (~90,000+ newly regulated entities). The free-tier educational approach creates a strong acquisition funnel. This strategy outlines how to monetize through a freemium model that converts free users into paying customers via premium tools, document generation, and professional services referrals.

---

## 1. Market Opportunity

### Total Addressable Market (TAM)

| Sector | Estimated Entities | Notes |
|---|---|---|
| Real estate agents | ~46,000 | Agents, buyers' agents, developers with in-house sales |
| Accountants & tax agents | ~30,000 | Registered tax agents, BAS agents, forensic accountants |
| Lawyers & conveyancers | ~13,000 | Property lawyers, commercial lawyers, conveyancers |
| Jewellers & precious metals | ~3,000 | Dealers above $10K threshold, bullion dealers |
| Trust & company service providers | ~2,000 | TCSP providers, formation agents |
| Financial advisors | ~5,000+ | Planners, investment advisors |
| **Total** | **~99,000+** | |

### Market Timing

- **Now → Jul 2026**: Panic phase — entities discovering obligations, scrambling to comply
- **Jul 2026 → Dec 2026**: Enforcement phase — AUSTRAC begins monitoring, first penalties
- **2027+**: Steady state — ongoing compliance, annual reviews, new staff training

### Competitor Landscape

| Competitor | Pricing | Model | Strengths | Weaknesses |
|---|---|---|---|---|
| easyAML | $179/mo | SaaS subscription | Full platform, automated CDD | Expensive for sole traders, overkill for small ops |
| TrustEasy | ~$1,200/yr | Annual licence | Established RegTech brand | Enterprise-focused, complex onboarding |
| HeadStart Docs | From $679 one-time | Template packs | One-time purchase, simple | No ongoing support, no interactive tools |
| InfoTrack | Custom pricing | Identity verification | Strong ID verification | Not a compliance program builder |
| OverSEER | Custom pricing | SaaS | Risk monitoring | Expensive, enterprise-focused |
| Law firm packages | $2,000–$10,000+ | Professional services | Bespoke, legally sound | Very expensive, not scalable |

### T2C's Competitive Advantage

1. **Free entry point** — no competitor offers a free educational tier this comprehensive
2. **Entity-specific** — tailored content per profession (not one-size-fits-all)
3. **Self-serve simplicity** — no sales calls, no demos, no onboarding required
4. **Built-in trust** — legal disclaimers, AUSTRAC source attribution, educational framing
5. **Low overhead** — static site + 2 serverless Lambda functions; AWS costs effectively $0 at launch scale

---

## 2. Monetization Model: Freemium + Premium

### Target Customer Profile

The typical T2C customer is a **sole trader or micro-business with 1–3 people** — a real estate agent with one assistant, a two-partner accounting firm, or a jeweller with a shop manager. These businesses:

- Have no dedicated compliance staff
- Need a simple, affordable solution (not enterprise RegTech)
- Want to "set and forget" their AML/CTF program
- Will share one login across the 2–3 people in the business

This means multi-seat management and enterprise tiers add complexity with no real demand. A simple two-tier model (Free + Pro) is the right fit.

### Tier Structure

```
┌─────────────────────────────────────────────────────────────┐
│  FREE TIER (current site)                                    │
│  ─────────────────────────                                   │
│  • Full educational content (all phases)                     │
│  • Glossary, FAQ, AUSTRAC links                             │
│  • Basic checklists (view-only progress)                    │
│  • Red flags reference                                       │
│  • "Am I Regulated?" tool                                   │
│  • Key dates & timeline                                      │
│  • Enrolment guide                                           │
│  • Reporting to AUSTRAC guide                                │
│  Goal: Acquire users, build trust, demonstrate value         │
├─────────────────────────────────────────────────────────────┤
│  PRO — $29/month or $249/year                                │
│  ─────────────────────────────                               │
│  Everything in Free, plus:                                   │
│  • Fillable CDD forms with save/print/export                │
│  • Risk assessment tool with scoring                        │
│  • AML/CTF Program Builder (generate program document)      │
│  • PDF export — generate your AML/CTF Program as a PDF      │
│  • Starter Kit Forms library                                 │
│  • Governance setup wizard                                   │
│  • Record keeping templates                                  │
│  • Staff training quiz with completion tracking              │
│  • Program review checklist (annual compliance cycle)        │
│  • Independent evaluation preparation guide                  │
│  • Customer examples (low/medium/high risk)                  │
│  • Data export (JSON backup)                                │
│  • Shared login (one account per business)                   │
│  • Email support                                             │
│  Goal: Give sole traders and small firms everything they     │
│        need to build and maintain their AML/CTF program      │
└─────────────────────────────────────────────────────────────┘

  Optional add-on (not a separate tier):
  • One-time AML/CTF Program PDF purchase: $149
    For users who want the generated document without
    an ongoing subscription. No access to other Pro tools.
```

### Why Only Two Tiers

| Rejected Tier | Why It Was Dropped |
|---|---|
| Team ($79/mo, 5 seats) | Target businesses have 2–3 people. Multi-seat management adds engineering complexity for no real demand. Pro uses a shared login instead. |
| Enterprise ($199/mo+, unlimited seats) | No franchise groups or large firms in the target market. Industry body licensing (Section 4c) is the better route for scale. |

### Pricing Rationale

- **$29/mo Pro**: Significantly cheaper than easyAML ($179/mo) and HeadStart ($679 one-time). Low enough for a sole-trader real estate agent to justify as a business expense. Annual discount ($249/yr = ~30% off) incentivises commitment and reduces churn.
- **$149 one-time PDF**: For businesses that just want the program document and won't use the ongoing tools. Lower friction than a subscription. Still cheaper than HeadStart ($679+) and law firm packages ($2,000+).
- **No per-seat pricing**: Businesses with 2–3 people share one login. Simpler billing, no seat-management UI to build, no "how many licenses do I need?" friction.

---

## 3. What Moves Behind the Paywall

### Current Free Features → Proposed Tier Allocation

| Feature | Currently | Proposed Tier |
|---|---|---|
| Educational content (all sections) | Free | **Stays Free** |
| Glossary, FAQ, AUSTRAC Links | Free | **Stays Free** |
| "Am I Regulated?" quiz | Free | **Stays Free** |
| Key Dates & Timeline | Free | **Stays Free** |
| Obligations Overview | Free | **Stays Free** |
| Red Flags reference | Free | **Stays Free** |
| Dashboard with progress tracking | Free | **Stays Free** (limited) |
| Enrolment Guide | Free | **Stays Free** (AUSTRAC enrolment is free/public) |
| Reporting to AUSTRAC guide | Free | **Stays Free** |
| Risk Assessment tool | Free | **Pro** |
| AML/CTF Program Builder | Free | **Pro** |
| CDD fillable forms | Free | **Pro** |
| Governance Setup wizard | Free | **Pro** |
| Forms Library (all templates) | Free | **Pro** |
| Starter Kit Forms | Free | **Pro** |
| Customer Examples | Free | **Pro** |
| Staff Training quizzes | Free | **Pro** |
| Program Review | Free | **Pro** |
| Independent Evaluation guide | Free | **Pro** |
| Data export/import | Free | **Pro** |
| Record Keeping templates | Free | **Pro** |
| PDF Program Document generation | N/A (new) | **Pro** (or $149 one-time) |

### Key Principle: Keep the "Why" Free, Charge for the "How"

- **Free**: Understanding obligations, knowing if you're regulated, knowing deadlines, understanding red flags
- **Paid**: Actually building your program, filling out forms, running risk assessments, training staff

This ensures the free tier is genuinely valuable (builds trust and SEO), while the paid tiers offer actionable tools that save real time and money.

---

## 4. Additional Revenue Streams

### 4a. Document Generation (High Value Add)

**What**: "Generate My AML/CTF Program" button that produces a branded, professional PDF document based on user inputs in the Program Builder.

**Why it's valuable**: This is what HeadStart charges $679+ for. A well-formatted, entity-specific program document is the #1 deliverable every newly regulated entity needs.

**Pricing options**:
- Included in Pro tier (ongoing subscription value)
- OR one-time purchase: $149–$299 per generated document (no subscription needed)
- OR both: subscription includes unlimited regeneration, one-time purchase for non-subscribers

**Implementation**: Generate PDF client-side using jsPDF + html2canvas (lazy-loaded on demand). No backend needed.

### 4b. Affiliate / Referral Partnerships

| Partner Type | Revenue Model | Potential Partners |
|---|---|---|
| Digital identity verification | Commission per verification | InfoTrack, Equifax IDMatrix, GreenID |
| Professional indemnity insurance | Referral fee | BizCover, Aon, QBE |
| Compliance consultants | Referral fee | Local AML/CTF consultants, law firms |
| Practice management software | Affiliate commission | AgentBox, Rex, MYOB, Xero |
| AUSTRAC-approved training | Referral fee | ACAMS, AML Academy |

**Implementation**: Add a "Recommended Partners" section or contextual recommendations within relevant tools (e.g., "Need help with digital ID verification? See our verified partners").

### 4c. Industry Body / Group Licensing

**What**: White-label or bulk licensing deals with industry associations.

| Organisation | Members | Opportunity |
|---|---|---|
| Real Estate Institute of Australia (REIA) | ~46,000 agents | Bulk licence for members at discounted rate |
| CPA Australia | ~170,000 members | Accountants module licence |
| Law Council of Australia | ~66,000 practitioners | Lawyers module (when built) |
| Jewellers Association of Australia | ~1,500 members | Jewellers module licence |

**Model**: $5–$15 per member per year, paid by the association. Even REIA alone at $10/member = $460K/year.

### 4d. Advertising (Low Priority)

Not recommended in early stages — ads undermine the trust-based brand. Consider only if user base exceeds 10,000+ monthly actives and only for highly relevant, non-competing advertisers (e.g., compliance training providers).

### 4e. Compliance Certification Badge

**What**: "T2C Compliance Ready" digital badge that businesses can display on their website/marketing.

**How it works**: User completes all checklist items, passes the quiz, generates their program document → earns a verifiable badge.

**Value**: Social proof for their clients ("We take AML/CTF seriously").

**Pricing**: Included in Pro tier, or $99/year standalone.

---

## 5. Technical Implementation Roadmap

### Phase 1: Payments + Feature Gating + PDF (Weeks 1–4)

| Task | Effort | Notes |
|---|---|---|
| Set up Stripe account + 3 products | Low | Dashboard only: Pro Monthly, Pro Annual, PDF One-Time |
| Create 3 Payment Links | Low | No-code checkout URLs configured in Stripe Dashboard |
| Enable Stripe built-in emails | Low | Receipts, failed payments, trial reminders — Dashboard config |
| Configure Stripe Customer Portal | Low | Self-service plan switching, cancellation, payment method |
| Add Cognito custom attributes | Low | `subscription_tier`, `stripe_customer_id`, `pdf_purchased` |
| Create pricing page | Low | New HTML page with Free vs Pro comparison + Payment Link URLs |
| Build paywall / feature gating | Medium | `subscription.js` — tier check, upgrade prompts, Payment Link URL builder |
| Create 2 Lambda functions | Medium | `stripe-webhook` (updates Cognito from Stripe events) + `check-subscription` (reads Cognito attrs) |
| Set up API Gateway (2 routes) | Low | POST /webhook/stripe + GET /subscription with Cognito authorizer |
| Build PDF document generation | Medium | Client-side PDF with jsPDF + html2canvas (lazy-loaded) |
| Migrate auth to PKCE | Medium | Authorization Code + PKCE replaces deprecated implicit grant |
| End-to-end testing + go live | Low | Stripe test mode → live mode |

**Architecture decision**: Stripe is the source of truth for all payment/subscription state. Cognito custom attributes cache the tier in the JWT for instant client-side reads. No custom database. Stripe Payment Links handle checkout (zero backend code). Stripe built-in emails handle all payment communications. SES is used only for the welcome email (via Cognito post-confirmation trigger). Businesses share one login — no multi-seat management.

### Phase 2: Analytics + Welcome Email (Weeks 5–6)

| Task | Effort | Notes |
|---|---|---|
| Set up Plausible Analytics | Low | Privacy-first, no cookies, no cookie banner needed |
| Create analytics.js wrapper | Low | Custom event tracking (upgrade clicks, form saves, PDF generated) |
| Set up SES for welcome email | Low | Cognito post-confirmation trigger, verify domain, DKIM |

The entire monetization stack is complete after Phase 2.

### Phase 3: Growth + Partners (Months 3–6)

| Task | Effort | Notes |
|---|---|---|
| Launch remaining entity types | High | Lawyers, TCSPs, Financial Advisors |
| SEO content pages | Medium | Blog/guides targeting long-tail keywords |
| Build partner referral system | Low | Tracked outbound links |
| Compliance badge system | Medium | Verification logic, badge generation |
| Industry body outreach | Medium | Sales outreach to REIA, CPA Australia, etc. |
| Branded PDF exports | Low | Add business name/logo to generated documents |
| Referral program | Low | "Invite a colleague, get 1 month free" |

---

## 6. Revenue Projections

### Conservative Scenario

**Assumptions**: 5% of TAM visits site (4,950 users), 3% free→paid conversion, $29/mo Pro.

| Metric | Month 6 | Month 12 | Month 24 |
|---|---|---|---|
| Free users | 1,500 | 4,000 | 8,000 |
| Pro subscribers | 45 | 120 | 300 |
| MRR (subs only) | $1,305 | $3,480 | $8,700 |
| One-time PDF sales | $500/mo | $1,500/mo | $2,000/mo |
| Total MRR | $1,805 | $4,980 | $10,700 |
| Annual run rate (ARR) | $21,660 | $59,760 | $128,400 |

### Moderate Scenario

**Assumptions**: 10% of TAM visits (9,900 users), 5% conversion, blended $29/mo.

| Metric | Month 6 | Month 12 | Month 24 |
|---|---|---|---|
| Free users | 3,000 | 8,000 | 15,000 |
| Pro subscribers | 150 | 400 | 750 |
| MRR (subs) | $4,350 | $11,600 | $21,750 |
| One-time PDF sales | $1,500/mo | $3,000/mo | $4,000/mo |
| Partner referrals/mo | $200 | $1,000 | $2,000 |
| Total MRR | $6,050 | $15,600 | $27,750 |
| ARR | $72,600 | $187,200 | $333,000 |

### Optimistic Scenario (with industry body deal)

**Assumptions**: REIA or CPA partnership at $10/member + direct subscribers.

| Metric | Year 1 | Year 2 |
|---|---|---|
| Direct Pro subscribers | 200 | 500 |
| Direct MRR | $5,800 | $14,500 |
| One-time PDF sales | $20,000/yr | $35,000/yr |
| Industry body licence | $100,000 | $200,000 |
| **Total annual revenue** | **$189,600** | **$409,000** |

> Note: Revenue projections are simpler with one paid tier. The one-time PDF purchase
> provides an alternative conversion path for businesses that resist subscriptions.

---

## 7. Go-to-Market Strategy

### Pre-Launch (Now → 1 Month Before Paywall)

1. **SEO**: Target long-tail keywords:
   - "AML/CTF program real estate agent Australia"
   - "AUSTRAC Tranche 2 compliance guide"
   - "anti money laundering accountants Australia 2026"
   - "do jewellers need AML program Australia"
2. **Content marketing**: Publish a blog section with practical guides
3. **Social proof**: Add user count ("Join 2,000+ professionals preparing for Tranche 2")
4. **Email capture**: Add email signup for "Compliance deadline reminders" — builds mailing list before monetisation
5. **LinkedIn outreach**: Post in Australian real estate, accounting, and legal groups

### Launch

1. **Soft paywall**: Show first 2 weeks free, then gate premium features
2. **Founder pricing**: "Early adopter" rate ($19/mo instead of $29/mo, locked in for life)
3. **One-time PDF option**: Prominently offer the $149 one-time purchase for businesses that just want the document
4. **PR**: Pitch to:
   - RealEstateExcellence, Elite Agent, Australian Property Investor magazine
   - InTheBlack (CPA Australia magazine), Taxation in Australia
   - Jeweller Magazine, Jewellery Business magazine

### Ongoing

1. **Webinars**: Free "AML/CTF 101 for [Entity Type]" webinars → funnel to paid
2. **AUSTRAC deadline urgency**: Countdown timer (already on site) drives conversion
3. **Case studies**: "How [Agency Name] set up their AML program in 2 hours with T2C"
4. **Drip email**: After signup, 5-email sequence educating on obligations → CTA to upgrade

---

## 8. Key Metrics to Track

| Metric | Target | Tool |
|---|---|---|
| Monthly unique visitors | 5,000+ by launch | Plausible Analytics |
| Free → Paid conversion rate | 3–5% | Stripe + custom tracking |
| Monthly churn rate | <5% | Stripe |
| Average revenue per user (ARPU) | $29+ | Stripe |
| Net Promoter Score (NPS) | 40+ | In-app survey |
| Feature usage (which tools used most) | Track top 5 | Custom analytics |
| Time to first form save | <10 minutes | Custom tracking |
| Trial → Paid conversion | 30%+ | Stripe |

---

## 9. Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AUSTRAC provides free tools that compete | Medium | High | Differentiate on UX, entity-specific guidance, forms. AUSTRAC tools are typically generic. |
| Tranche 2 deadline delayed | Low | High | Pivot messaging to "be ready early". Content stays relevant regardless. |
| Large RegTech enters market with free tier | Medium | Medium | Maintain price advantage, community, and simplicity. |
| Users expect everything to stay free | Medium | Medium | Grandfather early users with extended free access. Clear communication about sustainability. |
| Legal risk from users relying on tool | Medium | High | Maintain strong disclaimers. Pro tier could include "reviewed by compliance consultant" badge on generated documents. |
| Low conversion rate | Medium | Medium | A/B test pricing, offer one-time document purchase as alternative to subscription. |

---

## 10. Immediate Next Steps (Priority Order)

1. **Add email capture** to landing page (e.g., "Get notified when Premium launches" + deadline reminders). This costs nothing and starts building a mailing list immediately.

2. **Add Plausible Analytics** to understand current traffic and user behaviour before making paywall decisions. Privacy-first, no cookies, no cookie banner needed.

3. **Build the pricing page** (static HTML) to test demand — even before implementing payments, a pricing page with "Join waitlist" buttons validates willingness to pay.

4. **Set up Stripe Payment Links** for Pro tier ($29/mo, $249/yr) with 14-day free trial, plus $149 one-time PDF purchase — all configured in Stripe Dashboard with zero backend code.

5. **Build PDF document generation** for the AML/CTF Program Builder — this is the single highest-value premium feature and the one-time purchase product.

6. **Outreach to REIA and state REIs** about bulk licensing — one deal here could exceed all individual subscriber revenue.

---

## Summary

T2C's monetization strategy leverages the classic **"give the map, sell the tools"** approach, kept deliberately simple for the micro-business market:

- **Free tier** = comprehensive education that builds trust and SEO authority
- **Pro tier** ($29/mo) = all actionable tools, forms, PDF generation, training — everything a 1–3 person business needs
- **One-time PDF** ($149) = alternative for subscription-resistant businesses
- **Industry body licensing** ($5–$15/member/yr) = scale play via REIA, CPA Australia, etc.
- **Target Year 1 ARR**: $60K–$190K (conservative to optimistic)
- **Target Year 2 ARR**: $128K–$409K

No complex seat management. No enterprise sales. Just one clear upgrade path for sole traders and small firms, with an industry licensing channel for scale. The regulatory deadline creates natural urgency — every day closer to 1 July 2026 increases conversion pressure. The window to capture this market is **now**.
