// T2C for Accountants — Static Data
// All content sourced from publicly available AUSTRAC materials

const AMLiqData = {

  // ─── GLOSSARY ──────────────────────────────────────────────────────────────
  glossary: [
    { term: 'AML', definition: 'Anti-Money Laundering — laws and processes to prevent criminals from disguising illegal money as legitimate income.' },
    { term: 'AML/CTF Act', definition: 'The Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) — the primary Australian legislation governing AML/CTF obligations for reporting entities.' },
    { term: 'AML/CTF Program', definition: 'A documented set of policies, procedures, and controls a reporting entity must adopt to identify, mitigate, and manage ML/TF/PF risks. Consists of a risk assessment, policy document, and process document.' },
    { term: 'AML/CTF Rules', definition: 'The Anti-Money Laundering and Counter-Terrorism Financing Rules 2025 — delegated legislation made under the AML/CTF Act that sets out detailed requirements.' },
    { term: 'AUSTRAC', definition: 'Australian Transaction Reports and Analysis Centre — Australia\'s financial intelligence agency and AML/CTF regulator.' },
    { term: 'Beneficial Owner', definition: 'The natural person (individual) who ultimately owns or controls a company, trust, partnership, or other entity — directly or indirectly. Generally anyone owning or controlling 25%+ of a company.' },
    { term: 'CDD', definition: 'Customer Due Diligence — the process of identifying, verifying, and assessing the risk of your clients before providing designated services. Also known as KYC (Know Your Customer).' },
    { term: 'CTF', definition: 'Counter-Terrorism Financing — laws and processes to prevent money being used to fund terrorism.' },
    { term: 'Designated Service', definition: 'A specific type of service captured by the AML/CTF Act. For accountants, there are 8 designated services including entity creation, M&A assistance, nominee roles, registered office provision, and more.' },
    { term: 'DFAT Consolidated List', definition: 'The Australian Government Department of Foreign Affairs and Trade\'s list of persons and entities subject to targeted financial sanctions.' },
    { term: 'EDD', definition: 'Enhanced Due Diligence — additional, more rigorous checks required when a client or engagement presents higher ML/TF/PF risk (e.g., PEPs, complex structures, high-risk jurisdictions).' },
    { term: 'FATF', definition: 'Financial Action Task Force — the international body that sets global AML/CTF standards and evaluates countries\' compliance.' },
    { term: 'FATF Black List', definition: 'Countries with serious strategic deficiencies in their AML/CTF frameworks — considered high-risk jurisdictions (e.g., North Korea, Iran, Myanmar).' },
    { term: 'FATF Grey List', definition: 'Countries with strategic deficiencies in their AML/CTF frameworks that are under increased monitoring by FATF.' },
    { term: 'Gatekeeper', definition: 'A professional (such as an accountant or lawyer) whose expertise in structuring transactions, creating entities, and managing funds makes them attractive targets for criminal exploitation. Accountants are internationally recognised as gatekeeper professionals.' },
    { term: 'Governing Body', definition: 'The board of directors, partners, trustees, or senior management responsible for oversight and governance of the practice. Must exercise ongoing oversight of ML/TF/PF risk.' },
    { term: 'IFTI', definition: 'International Fund Transfer Instruction — a report required when you are involved in sending or receiving international electronic fund transfers.' },
    { term: 'Independent Evaluation', definition: 'A review of the AML/CTF program by someone independent of the program (i.e., not the compliance officer or program designer). Required at least once every 3 years.' },
    { term: 'KYC', definition: 'Know Your Customer — another term for Customer Due Diligence (CDD). The process of verifying who your clients are.' },
    { term: 'ML/TF/PF', definition: 'Money Laundering / Terrorism Financing / Proliferation Financing — the three primary risks that the AML/CTF regime is designed to address.' },
    { term: 'Money Laundering', definition: 'The process by which criminals disguise the origins of illegally obtained money to make it appear legitimate. Accountants may unknowingly assist through entity creation, financing advice, and transaction structuring.' },
    { term: 'PEP', definition: 'Politically Exposed Person — someone who holds or has held a prominent public position (domestically or internationally), or is a family member or close associate of such a person.' },
    { term: 'PF', definition: 'Proliferation Financing — the act of providing funds or financial services to support the development, production, or acquisition of weapons of mass destruction.' },
    { term: 'Reporting Entity', definition: 'A business that provides designated services under the AML/CTF Act and therefore has compliance obligations including enrolment, CDD, and reporting.' },
    { term: 'Reporting Group', definition: 'Two or more reporting entities under common ownership or control that may adopt a joint AML/CTF program. A lead entity is nominated to be responsible for the joint program.' },
    { term: 'Senior Manager', definition: 'The person who personally approves the risk assessment, AML/CTF policies, high-risk client relationships, and PEP engagements. These obligations cannot be delegated.' },
    { term: 'Shelf Company', definition: 'A pre-registered company that has been incorporated but has never traded. Selling shelf companies is Designated Service 5 for accountants.' },
    { term: 'Simplified CDD', definition: 'A reduced level of CDD that may be applied to genuinely low-risk clients — still requires identification but with fewer verification steps. Not the same as no CDD.' },
    { term: 'SMSF', definition: 'Self-Managed Super Fund — a private superannuation fund managed by its members. Setting up an SMSF may be a designated service (Service 6) as it involves creating a legal arrangement (trust).' },
    { term: 'SMR', definition: 'Suspicious Matter Report — a report filed with AUSTRAC when you suspect, on reasonable grounds, that a transaction or activity may involve money laundering, terrorism financing, or another offence.' },
    { term: 'Source of Funds', definition: 'Where the money for a specific transaction is coming from (e.g., business revenue, loan proceeds, personal savings, overseas transfer).' },
    { term: 'Source of Wealth', definition: 'How the client accumulated their overall net worth or assets (e.g., business income, employment, investments, inheritance).' },
    { term: 'Structuring', definition: 'The criminal act of breaking up cash transactions into smaller amounts below the $10,000 TTR threshold to avoid reporting obligations.' },
    { term: 'TFS', definition: 'Targeted Financial Sanctions — sanctions imposed under Australian law (and UN Security Council resolutions) against specific individuals and entities. It is illegal to provide services to sanctioned persons.' },
    { term: 'Tipping Off', definition: 'The criminal act of disclosing to a client (or any other person) that you have filed, or intend to file, a Suspicious Matter Report (SMR) about them.' },
    { term: 'Tranche 2', definition: 'The second wave of Australian AML/CTF reforms, extending obligations to accountants, real estate agents, lawyers, and other professional services — effective 1 July 2026. Brings approximately 90,000 new reporting entities into the regime.' },
    { term: 'TTR', definition: 'Threshold Transaction Report — a report filed with AUSTRAC when you receive $10,000 or more in physical currency (banknotes and coins) in a single transaction.' },
  ],

  // ─── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    {
      q: 'I only do tax returns, BAS work, and bookkeeping. Am I affected?',
      a: 'No. Standard tax return preparation, BAS agent work, bookkeeping, and payroll processing are NOT designated services. If your practice provides ONLY these exempt services, you do not have AML/CTF obligations. However, if you also provide any of the 8 designated services (such as setting up companies or trusts), those activities are captured.',
      topics: ['enrolment', 'general'],
      source: 'AUSTRAC Accounting Sector Reform guidance'
    },
    {
      q: 'What are the 8 designated services for accountants?',
      a: 'The 8 designated services are: (1) Assisting with real estate transactions, (2) Assisting with buying/selling a business or company, (3) Holding or managing client property for a transaction, (4) Assisting with equity/debt financing, (5) Selling shelf companies, (6) Creating or restructuring entities (companies, trusts, SMSFs, partnerships), (7) Acting as or arranging nominee directors/trustees/secretaries, (8) Providing a registered office address for a client entity.',
      topics: ['general', 'enrolment'],
      source: 'AUSTRAC Accounting Sector Reform guidance'
    },
    {
      q: 'I set up companies and trusts for clients. Am I affected?',
      a: 'Yes. Setting up companies, trusts, SMSFs, partnerships, or other legal structures is Designated Service 6 — "creating or restructuring a body corporate or legal arrangement." This is one of the most common designated services for accountants. You will need to enrol with AUSTRAC and implement an AML/CTF program.',
      topics: ['enrolment', 'general'],
      source: 'AUSTRAC Accounting Sector Reform guidance'
    },
    {
      q: 'Does preparing financial statements for a loan application trigger AML/CTF obligations?',
      a: 'It depends. If you are actively assisting in organising, planning, or executing equity or debt financing for a company or trust (Designated Service 4), then yes. Simply preparing financial statements as a standalone service is generally exempt — but if those statements are prepared specifically to facilitate a financing arrangement, the service may be captured.',
      topics: ['general'],
      source: 'AUSTRAC Accounting Sector Reform guidance'
    },
    {
      q: 'Do I need to conduct CDD on all my clients?',
      a: 'No — only on clients to whom you are providing a designated service. If a client only engages you for tax returns or bookkeeping (exempt services), you do not need AML/CTF CDD for that client. However, if you also set up a company for that same client, CDD is required for that designated service engagement.',
      topics: ['cdd'],
      source: 'AUSTRAC CDD reform guidance'
    },
    {
      q: 'How do I conduct CDD on a trust, including an SMSF?',
      a: 'Trusts are rated as high risk by AUSTRAC. You must identify: the trust name and type, all trustees (or beneficial owners of corporate trustees), the settlor, the appointor, any guardian/protector, all beneficiaries (or classes of beneficiaries), and for SMSFs — all members. Verify the trust deed, check PEP/sanctions status for all identified individuals, and apply Enhanced Due Diligence given the inherently higher risk of trusts.',
      topics: ['cdd'],
      source: 'AUSTRAC CDD reform guidance — Trusts'
    },
    {
      q: 'What is a PEP and why does it matter for my practice?',
      a: 'A PEP (Politically Exposed Person) is someone who holds or has held a prominent public position — such as a government minister, senior official, judge, or military leader — or is a family member or close associate of such a person. PEPs carry higher corruption and bribery risk. If a client or their beneficial owner is a PEP, you must apply Enhanced Due Diligence and obtain senior management/partner approval before proceeding with the engagement.',
      topics: ['cdd'],
      source: 'AUSTRAC PEP screening guidance'
    },
    {
      q: 'What if a client refuses to provide identification?',
      a: 'If you cannot complete CDD satisfactorily, you should consider declining or ceasing the designated service engagement. Unlike real estate transactions that may already be in motion, most accounting designated services can be paused or declined before work begins. You should also consider whether the refusal itself is suspicious and warrants filing an SMR.',
      topics: ['cdd', 'reporting'],
      source: 'AUSTRAC CDD reform guidance'
    },
    {
      q: 'What is an SMR and when must I file one?',
      a: 'An SMR (Suspicious Matter Report) is filed with AUSTRAC when you suspect on reasonable grounds that a client or transaction may involve money laundering, terrorism financing, or other criminal activity. You don\'t need certainty — suspicion is enough. File within 3 business days of forming the suspicion, or within 24 hours if it relates to terrorism financing. Never tell the client about the SMR — tipping off is a criminal offence.',
      topics: ['reporting'],
      source: 'AUSTRAC SMR reform guidance'
    },
    {
      q: 'Do accountants need to file an annual compliance report?',
      a: 'Yes. Unlike some other Tranche 2 sectors, accountants (as professional services) are required to submit an annual AML/CTF compliance report to AUSTRAC. This report covers the effectiveness of your AML/CTF program, any suspicious matters identified, training conducted, and any changes to your risk profile.',
      topics: ['reporting'],
      source: 'AUSTRAC Reporting reform guidance'
    },
    {
      q: 'How long must I keep AML/CTF records?',
      a: 'All AML/CTF records must be kept for a minimum of 7 years from when the record was made or the business relationship ended (whichever is later). This includes CDD records, transaction records, training records, program documents, SMR/TTR copies, and personnel due diligence records.',
      topics: ['record-keeping'],
      source: 'AUSTRAC record keeping reform guidance'
    },
    {
      q: 'I\'m a sole practitioner. Do I still need a full AML/CTF program?',
      a: 'Yes — if you provide any designated service, you need an AML/CTF program regardless of practice size. However, AUSTRAC recognises that sole practitioners will wear all hats. You can be the compliance officer, senior manager, and governing body simultaneously. The AUSTRAC starter kit is specifically designed for practices with 15 or fewer personnel.',
      topics: ['general', 'governance'],
      source: 'AUSTRAC governance guidance for sole traders and micro businesses'
    },
    {
      q: 'Can I rely on a lawyer\'s CDD for a shared client?',
      a: 'Yes — through a documented third-party reliance arrangement. If a lawyer (who is also a reporting entity) has already verified a client\'s identity for the same transaction, you may rely on their CDD. However, you must: assess whether the arrangement is appropriate, document it in your AML/CTF program, and you remain responsible if their CDD was inadequate.',
      topics: ['cdd'],
      source: 'AUSTRAC CDD reliance reform guidance'
    },
    {
      q: 'What are the penalties for non-compliance?',
      a: 'Penalties are significant. AUSTRAC\'s enforcement toolkit includes civil penalty orders (up to $28.2 million for body corporates), infringement notices, enforceable undertakings, remedial directions, external audits at your expense, and deregistration. However, AUSTRAC has stated it will focus enforcement on entities that fail to enrol or make no meaningful effort. A genuine, good-faith effort to comply is key.',
      topics: ['general'],
      source: 'AUSTRAC regulatory expectations guidance'
    },
    {
      q: 'When does AUSTRAC enrolment open and what is the deadline?',
      a: 'Enrolment opens 31 March 2026. You must enrol within 28 days of first providing a designated service after 1 July 2026 — meaning the latest possible date is 29 July 2026. Enrolment is free and done via AUSTRAC Online (online.austrac.gov.au).',
      topics: ['enrolment'],
      source: 'AUSTRAC enrolment guidance'
    },
    {
      q: 'Does CGT planning for a property sale make me a regulated accountant?',
      a: 'It depends on your role. If you are actively assisting in planning or executing the property transaction itself (e.g., advising on transaction structure, timing the sale for tax outcomes), this may be Designated Service 1. If you are merely calculating the CGT liability after the sale has occurred, that is likely exempt. The key question is whether you are assisting in planning or executing the transaction, not just reporting on its tax consequences.',
      topics: ['general'],
      source: 'AUSTRAC Accounting Sector Reform guidance'
    },
    {
      q: 'What is simplified CDD and when can I use it?',
      a: 'Simplified CDD is a reduced level of due diligence for genuinely low-risk clients. You may apply it when: the client is well-known and long-standing, the service is routine and low-complexity, the client is a simple domestic entity or individual, and no EDD triggers are present. Simplified CDD still requires identification — it is NOT the same as no CDD.',
      topics: ['cdd'],
      source: 'AUSTRAC CDD reform guidance'
    },
    {
      q: 'What staff training is required?',
      a: 'All staff in AML/CTF-relevant roles must receive initial training before 1 July 2026 and refresher training at least annually. Training must cover: ML/TF/PF awareness, your AML/CTF program, CDD procedures, beneficial ownership identification, PEP/sanctions screening, red flags specific to accounting, reporting procedures, the tipping-off prohibition, and record keeping requirements.',
      topics: ['training'],
      source: 'AUSTRAC training reform guidance'
    },
  ],

  // ─── RED FLAGS ─────────────────────────────────────────────────────────────
  redFlags: [
    // Category 1: Client Risk Indicators
    { id: 'rf1', category: 'client', severity: 'red', title: 'Client obscures purpose of a transaction', detail: 'Vague or shifting explanations for why they need a structure or service. The stated purpose changes over time or doesn\'t make commercial sense.' },
    { id: 'rf2', category: 'client', severity: 'red', title: 'Client obscures ownership details', detail: 'Reluctant to disclose beneficial owners; provides inconsistent information about who ultimately owns or controls the entity.' },
    { id: 'rf3', category: 'client', severity: 'red', title: 'Complex structures with no commercial rationale', detail: 'Multi-layered entities with no apparent business purpose. Requests for unnecessarily complex corporate or trust structures.' },
    { id: 'rf4', category: 'client', severity: 'red', title: "Client's profile is inconsistent", detail: 'A low-income individual seeking to set up multiple companies. Wealth or transaction values don\'t match the client\'s known profile.' },
    { id: 'rf5', category: 'client', severity: 'amber', title: 'Client connected to high-risk industries', detail: 'Cash-intensive businesses, gambling, cryptocurrency, adult services, or other sectors identified as high ML/TF risk.' },
    { id: 'rf6', category: 'client', severity: 'red', title: 'Client has been refused by other professionals', detail: 'Mentions being turned away by other accountants or lawyers. This suggests prior firms identified red flags.' },
    { id: 'rf7', category: 'client', severity: 'amber', title: 'Client pressures for rapid entity creation', detail: 'Urgency with no clear business deadline. Wants companies or trusts created within hours or days without explanation.' },
    { id: 'rf8', category: 'client', severity: 'red', title: 'Client introduces unexpected third parties', detail: 'Unknown individuals appear as directors, trustees, or beneficial owners. Third parties inserted into the structure at the last minute.' },
    { id: 'rf9', category: 'client', severity: 'red', title: 'Instructions received from unidentified persons', detail: 'Someone other than the client directs the engagement. Instructions come from people whose relationship to the client is unclear.' },
    { id: 'rf10', category: 'client', severity: 'amber', title: 'Client is unwilling to meet in person', detail: 'Avoids face-to-face meetings even for significant engagements. Provides excuses to avoid any form of identity verification.' },

    // Category 2: Service/Transaction Risk Indicators
    { id: 'rf11', category: 'service', severity: 'red', title: 'Entity created and immediately used for large transaction', detail: 'Company incorporated and used to purchase property or receive large fund transfers within days. No operational history.' },
    { id: 'rf12', category: 'service', severity: 'red', title: 'Multiple entities created with same/similar structures', detail: 'Pattern of creating shell companies or trusts with identical structures. May indicate layering or entity proliferation for ML purposes.' },
    { id: 'rf13', category: 'service', severity: 'red', title: 'Nominee arrangements for unknown clients', detail: 'Being asked to act as or arrange nominees (directors, secretaries, trustees) for clients you don\'t know well or whose purpose is unclear.' },
    { id: 'rf14', category: 'service', severity: 'amber', title: 'Registered office for entities with no physical presence', detail: 'Client entity has no employees, premises, or operations at the registered address. The entity exists only on paper.' },
    { id: 'rf15', category: 'service', severity: 'red', title: 'Funds flowing through trust accounts with no clear purpose', detail: 'Client money passes through your trust account but the underlying transaction is unclear or the funds are quickly moved on.' },
    { id: 'rf16', category: 'service', severity: 'amber', title: 'Shelf companies requested with urgency', detail: 'Need for immediate, pre-formed companies with no explanation of the commercial urgency.' },
    { id: 'rf17', category: 'service', severity: 'red', title: 'Restructuring designed to hide ownership', detail: 'Changes made to move beneficial ownership behind additional layers. Entity restructuring with no apparent commercial benefit.' },
    { id: 'rf18', category: 'service', severity: 'amber', title: 'Financing arrangements that don\'t match business profile', detail: 'Loan applications or financing structures that don\'t align with the client\'s actual business activities or financial position.' },
    { id: 'rf19', category: 'service', severity: 'red', title: 'Client seeks advice on avoiding reporting thresholds', detail: 'Questions about keeping cash amounts below $10,000. Asking how to structure transactions to avoid AUSTRAC reporting.' },

    // Category 3: Delivery Channel Risk Indicators
    { id: 'rf20', category: 'delivery', severity: 'amber', title: 'Entirely non-face-to-face engagement', detail: 'Client never meets the accountant in person for significant services. All interactions conducted remotely with no video verification.' },
    { id: 'rf21', category: 'delivery', severity: 'red', title: 'Client insists on encrypted/untraceable communication', detail: 'Client refuses to communicate via phone, email, or other traceable methods — insists on encrypted messaging apps or untraceable channels.' },
    { id: 'rf22', category: 'delivery', severity: 'amber', title: 'Third-party intermediary provides all instructions', detail: 'Client is shielded behind other professionals or agents. The actual client is never directly contactable.' },
    { id: 'rf23', category: 'delivery', severity: 'amber', title: 'Engagement initiated by overseas referral with no context', detail: 'Foreign introducer sends a client with minimal background information. No clear reason why the client needs Australian services.' },
    { id: 'rf24', category: 'delivery', severity: 'amber', title: 'Client uses multiple communication channels inconsistently', detail: 'Different instructions received via different channels. Inconsistent information across email, phone, and messaging.' },

    // Category 4: Foreign Jurisdiction Risk Indicators
    { id: 'rf25', category: 'jurisdiction', severity: 'red', title: 'Funds from FATF grey/blacklisted jurisdictions', detail: 'Money originates from countries identified by FATF as high-risk — including blacklisted countries (North Korea, Iran, Myanmar) or grey-listed countries.' },
    { id: 'rf26', category: 'jurisdiction', severity: 'red', title: 'Complex international corporate structures', detail: 'Multiple layers of overseas entities with unclear purpose. Cross-border arrangements with no apparent commercial rationale.' },
    { id: 'rf27', category: 'jurisdiction', severity: 'red', title: 'Client has subsidiaries in secrecy jurisdictions', detail: 'Shell companies in tax havens with no operational substance. Entities in jurisdictions known for corporate secrecy.' },
    { id: 'rf28', category: 'jurisdiction', severity: 'red', title: 'Foreign national seeking Australian entity with no Australian connection', detail: 'No business, family, or residency ties to Australia. Cannot explain why they need an Australian company, trust, or structure.' },
    { id: 'rf29', category: 'jurisdiction', severity: 'red', title: 'Cross-border transactions with no commercial rationale', detail: 'Money flowing between jurisdictions without business justification. Complex transfer paths through multiple countries.' },
    { id: 'rf30', category: 'jurisdiction', severity: 'red', title: 'Foreign nominees used to hold Australian assets', detail: 'Overseas individuals acting as nominee directors, shareholders, or trustees for Australian entities with no clear reason.' },
  ],

  // ─── QUIZ QUESTIONS ───────────────────────────────────────────────────────
  quiz: [
    {
      id: 1,
      question: 'Which of the following is a designated service for accountants under the AML/CTF Act reforms?',
      options: [
        'Preparing a tax return',
        'Processing payroll',
        'Setting up a company for a client',
        'Preparing a BAS'
      ],
      answer: 2,
      explanation: 'Setting up a company (or any entity) is Designated Service 6 — creating a body corporate or legal arrangement. Tax returns, payroll, and BAS preparation are all exempt services that do not trigger AML/CTF obligations.'
    },
    {
      id: 2,
      question: 'A client asks you to set up 5 companies in 3 days and won\'t explain the business purpose. What should you do?',
      options: [
        'Proceed — the client is paying',
        'Treat this as a red flag, conduct enhanced due diligence, and escalate if concerns remain',
        'Refuse all work from this client permanently',
        'Report the client to the police immediately'
      ],
      answer: 1,
      explanation: 'Rapid entity creation with no clear business purpose is a significant red flag. You should apply EDD, investigate further, and escalate to the compliance officer. If concerns remain, consider filing an SMR and whether to proceed with the engagement.'
    },
    {
      id: 3,
      question: 'You file an SMR about a client. Can you tell the client about it?',
      options: [
        'Yes, they have a right to know',
        'No — disclosing an SMR is a criminal offence known as tipping off',
        'Only if they ask directly',
        'Only if your partner approves'
      ],
      answer: 1,
      explanation: 'The tipping-off prohibition is a critical legal requirement. It is a criminal offence (up to 2 years imprisonment) to disclose to a client or anyone who doesn\'t need to know that you have filed or intend to file an SMR.'
    },
    {
      id: 4,
      question: 'Your practice only prepares tax returns and BAS. Are you captured by the AML/CTF reforms?',
      options: [
        'Yes — all accounting practices are captured',
        'No — tax returns and BAS are not designated services'
      ],
      answer: 1,
      explanation: 'Tax return preparation and BAS agent work are NOT designated services. If your practice provides ONLY these exempt services, you do not have AML/CTF obligations under the Tranche 2 reforms.'
    },
    {
      id: 5,
      question: 'A new client requests entity creation. They are evasive about beneficial owners and mention the entity will hold Australian property on behalf of overseas investors. What risk level does this indicate?',
      options: [
        'Low risk — entity creation is routine',
        'Medium risk — worth monitoring',
        'High risk — complex structure, foreign beneficial owners, evasive client'
      ],
      answer: 2,
      explanation: 'This scenario combines multiple red flags: evasive client, unclear beneficial ownership, foreign investors, and property holding. This is high risk requiring Enhanced Due Diligence and senior management approval.'
    },
    {
      id: 6,
      question: 'How long must you keep CDD records?',
      options: [
        '3 years',
        '5 years',
        '7 years',
        '10 years'
      ],
      answer: 2,
      explanation: 'Under the AML/CTF Act, records must be kept for a minimum of 7 years from when the record was made or the business relationship ended (whichever is later).'
    },
    {
      id: 7,
      question: 'A client from a FATF grey-listed country asks you to set up an Australian trust. What should you do?',
      options: [
        'Refuse immediately — you cannot deal with anyone from a grey-listed country',
        'Proceed normally — country of origin is not relevant',
        'Apply enhanced due diligence, verify source of funds, and assess the engagement carefully'
      ],
      answer: 2,
      explanation: 'A FATF grey-listed jurisdiction is a significant risk indicator requiring Enhanced Due Diligence. You are not automatically prohibited from proceeding, but you must verify the source of funds, apply additional measures, and consider whether an SMR is warranted.'
    },
    {
      id: 8,
      question: 'When must you file an SMR if the suspicion relates to terrorism financing?',
      options: [
        'Within 3 business days',
        'Within 10 business days',
        'Within 24 hours',
        'Within 30 days'
      ],
      answer: 2,
      explanation: 'SMRs relating to terrorism financing must be filed within 24 hours of forming the suspicion. For all other suspicious matters, the timeframe is 3 business days.'
    },
    {
      id: 9,
      question: 'A client offers to pay your $12,000 fee in cash. What must you do?',
      options: [
        'Accept and proceed normally',
        'Refuse the cash payment — accountants must not accept cash',
        'Accept the cash, file a TTR with AUSTRAC within 10 business days, and consider whether an SMR is also warranted',
        'Call AUSTRAC before accepting'
      ],
      answer: 2,
      explanation: 'Any physical cash payment of $10,000 or more requires a Threshold Transaction Report (TTR) filed within 10 business days. You should also consider whether the circumstances warrant filing an SMR.'
    },
    {
      id: 10,
      question: 'What is a "shelf company" and why is selling one a designated service?',
      options: [
        'A company that sells shelves — not relevant to AML',
        'A pre-registered company with no activity, sold to clients — it\'s designated because shell companies can be used to launder money'
      ],
      answer: 1,
      explanation: 'A shelf company is a pre-registered company that has never traded. Selling one is Designated Service 5 because shell companies can be used as vehicles for money laundering.'
    },
    {
      id: 11,
      question: 'Can you apply simplified CDD to a low-risk client?',
      options: [
        'Yes — AUSTRAC allows reduced measures for genuinely low-risk clients, but you must still identify them and document the assessment',
        'No — all clients require the same level of CDD regardless of risk'
      ],
      answer: 0,
      explanation: 'AUSTRAC guidance allows simplified CDD for genuinely low-risk clients. However, simplified CDD is NOT the same as no CDD — you must still identify the client and document the basis for the simplified approach.'
    },
    {
      id: 12,
      question: 'Who must be appointed to oversee your AML/CTF program?',
      options: [
        'An external lawyer with compliance experience',
        'An AML/CTF compliance officer at management level who is an Australian resident and fit and proper person',
        'A government inspector appointed by AUSTRAC',
        'The most junior staff member for fresh perspective'
      ],
      answer: 1,
      explanation: 'The AML/CTF Act requires the appointment of a compliance officer who: (1) is at management level, (2) is an Australian resident (if the business has an Australian establishment), and (3) is a fit and proper person. AUSTRAC must be notified within 14 days.'
    },
    {
      id: 13,
      question: 'How often must an independent evaluation of your AML/CTF program be conducted?',
      options: [
        'Every year',
        'Every 2 years',
        'At least every 3 years',
        'Every 5 years'
      ],
      answer: 2,
      explanation: 'The AML/CTF Act requires an independent evaluation at least once every 3 years. The evaluator must be independent of the program — they cannot be the compliance officer or anyone who designed it.'
    },
    {
      id: 14,
      question: 'You suspect a client is using your services to structure transactions to avoid reporting thresholds. What should you do?',
      options: [
        'Help them — it\'s their money',
        'Recognise structuring as a criminal offence and a red flag; escalate internally and consider filing an SMR'
      ],
      answer: 1,
      explanation: 'Structuring (breaking cash payments into amounts below $10,000 to avoid TTR requirements) is a criminal offence under the AML/CTF Act. It is a red flag that should be escalated internally and may warrant filing an SMR.'
    },
    {
      id: 15,
      question: 'An existing tax-return-only client asks you to also set up a trust. Does this change your AML/CTF obligations for this client?',
      options: [
        'No — they are an existing client so no further action needed',
        'Yes — trust creation is a designated service (Service 6); you now need to conduct CDD on this client for the designated service'
      ],
      answer: 1,
      explanation: 'Trust creation is Designated Service 6. Even though this is an existing client, providing a designated service triggers CDD obligations for that engagement. The fact they are a known tax client does not exempt you from CDD requirements.'
    },
  ],

  // ─── CHECKLIST ITEMS ──────────────────────────────────────────────────────
  checklists: {
    riskAssessment: [
      { id: 'ra1', text: 'Identify all designated services your practice provides', detail: 'Document which of the 8 designated services your practice provides. Use the "Am I Regulated?" service checker.' },
      { id: 'ra2', text: 'Assess ML/TF/PF risks across 4 categories: client, service, delivery channel, geographic', detail: 'Use AUSTRAC\'s 4-category risk framework. The Risk Assessment Wizard in this tool guides you through each category.' },
      { id: 'ra3', text: 'Document risk indicators for each category', detail: 'For each of the 4 risk categories, document the specific indicators relevant to your practice.' },
      { id: 'ra4', text: 'Identify controls to mitigate each risk', detail: 'For each risk identified, document what control you will implement (e.g., EDD for foreign clients, additional verification for trusts).' },
      { id: 'ra5', text: 'Document your risk appetite (what level of risk is acceptable)', detail: 'Your risk assessment should explicitly state what level of ML/TF/PF risk your practice is willing to accept.' },
      { id: 'ra6', text: 'Identify high-risk scenarios specific to your practice', detail: 'Consider your specific client types, services, delivery channels, and geographic exposure to identify where risk is elevated.' },
      { id: 'ra7', text: "Consider AUSTRAC's risk insights for accountants", detail: "AUSTRAC has published specific risk insights for the accounting sector. These should inform your risk assessment." },
      { id: 'ra8', text: 'Have risk assessment approved by senior management / governing body', detail: 'The risk assessment must be formally approved by senior management. Document the date and who approved it.' },
      { id: 'ra9', text: 'Set a schedule to review the risk assessment (and define review triggers)', detail: 'Your program should specify when the risk assessment will be reviewed — at least annually or when practice circumstances change.' },
    ],
    governance: [
      { id: 'gov1', text: 'Appoint an AML/CTF compliance officer', detail: 'Every reporting entity must appoint a compliance officer who is at management level, an Australian resident, and a fit and proper person.' },
      { id: 'gov2', text: 'Ensure compliance officer meets eligibility requirements', detail: 'Must be: (1) employed/engaged at management level, (2) an Australian resident (if practice has Australian establishment), (3) a fit and proper person.' },
      { id: 'gov3', text: 'Notify AUSTRAC of compliance officer appointment within 14 days', detail: 'After appointing a compliance officer, you must notify AUSTRAC within 14 days via AUSTRAC Online.' },
      { id: 'gov4', text: 'Define AML/CTF roles and responsibilities', detail: 'Document who is responsible for CDD, engagement monitoring, escalation, training, record keeping, and senior management oversight.' },
      { id: 'gov5', text: 'Assign responsibilities to specific staff', detail: 'Use a roles and responsibilities form to document each AML/CTF function and who performs it.' },
      { id: 'gov6', text: 'Establish governing body / senior management oversight', detail: 'Senior management must approve the AML/CTF program and receive regular compliance reports.' },
      { id: 'gov7', text: 'Set up compliance officer annual reporting to governing body', detail: 'The compliance officer should report to the governing body at least annually on the effectiveness of the AML/CTF program.' },
      { id: 'gov8', text: 'Conduct personnel due diligence on all staff in AML/CTF roles', detail: 'Anyone performing AML/CTF functions requires appropriate due diligence including identity verification, reference checks, and police checks.' },
    ],
    cddProcedures: [
      { id: 'cdd1', text: 'Define initial CDD procedures for individual clients / sole traders', detail: 'Document the step-by-step process for identifying and verifying individual clients, including acceptable ID documents.' },
      { id: 'cdd2', text: 'Define initial CDD procedures for company clients', detail: 'Document the process for verifying companies, including ASIC registration checks and beneficial owner identification (25%+ ownership).' },
      { id: 'cdd3', text: 'Define initial CDD procedures for trust clients (including SMSFs)', detail: 'Trusts are rated as high-risk. Document comprehensive process including settlor, appointor, trustee, beneficiary, and guardian identification.' },
      { id: 'cdd4', text: 'Define initial CDD procedures for partnership clients', detail: 'Document the process for verifying partnerships and all partners.' },
      { id: 'cdd5', text: 'Define initial CDD procedures for foreign clients', detail: 'Document additional requirements for foreign clients, including foreign document verification and source-of-funds requirements.' },
      { id: 'cdd6', text: 'Define beneficial owner identification procedures', detail: 'For entities (companies, trusts, partnerships), document how you will trace through to the natural persons who ultimately own or control the entity.' },
      { id: 'cdd7', text: 'Define PEP and TFS screening procedures', detail: 'Document the process for asking about PEP status and checking the DFAT Consolidated List for every client.' },
      { id: 'cdd8', text: 'Define Enhanced Due Diligence (EDD) triggers and procedures', detail: 'Document when EDD is required (PEPs, high-risk jurisdictions, complex structures, trusts) and what additional steps you will take.' },
      { id: 'cdd9', text: 'Define simplified CDD criteria and procedures', detail: 'Document when simplified CDD may be applied (low-risk, well-known clients) and what reduced measures are acceptable.' },
      { id: 'cdd10', text: 'Define ongoing CDD procedures and monitoring frequency', detail: 'Document how you will monitor existing client relationships and how frequently you will review client information.' },
      { id: 'cdd11', text: 'Define procedures for when CDD cannot be completed (decline/cease service)', detail: 'Document your policy for situations where you cannot complete CDD satisfactorily, including when to decline or cease the engagement.' },
      { id: 'cdd12', text: 'Define reliance arrangements (if relying on third parties for CDD)', detail: 'If you plan to rely on another party\'s CDD (e.g., a lawyer on a shared transaction), document the arrangement.' },
      { id: 'cdd13', text: 'Document acceptable identity verification documents and methods', detail: 'Create a reference list of acceptable ID documents for individuals, companies, trusts, and other entity types.' },
    ],
    monitoring: [
      { id: 'mon1', text: 'Establish process for monitoring engagements for suspicious indicators', detail: 'Document how and by whom engagements will be monitored for red flags and suspicious activity.' },
      { id: 'mon2', text: "Document AUSTRAC's red flag indicators for accountants", detail: 'Incorporate AUSTRAC\'s published red flag indicators across all 4 categories (client, service, delivery channel, jurisdiction) into your procedures.' },
      { id: 'mon3', text: 'Define internal escalation process (staff → compliance officer → report)', detail: 'Document the step-by-step internal process for escalating suspicious activity concerns to the compliance officer.' },
      { id: 'mon4', text: 'Assign responsibility for engagement monitoring', detail: 'Specify which staff member(s) are responsible for monitoring designated service engagements.' },
      { id: 'mon5', text: 'Create a suspicious activity log template', detail: 'Have a standard form for documenting observations of suspicious activity, including date, client, concern, and action taken.' },
    ],
    reporting: [
      { id: 'rep1', text: 'Establish procedure for filing Suspicious Matter Reports (SMRs)', detail: 'Document the internal process for deciding whether to file an SMR and the steps for filing via AUSTRAC Online.' },
      { id: 'rep2', text: 'Define SMR timeframes (24 hours for terrorism, 3 business days for other)', detail: 'Ensure staff know the filing deadlines: 24 hours for terrorism financing suspicions; 3 business days for all other suspicious matters.' },
      { id: 'rep3', text: 'Establish procedure for Threshold Transaction Reports (TTRs) — $10,000+ physical cash', detail: 'Document the process for identifying and filing TTRs for any physical cash receipt of $10,000 or more.' },
      { id: 'rep4', text: 'Define TTR timeframe (10 business days)', detail: 'TTRs must be filed within 10 business days of the transaction.' },
      { id: 'rep5', text: 'Establish procedure for IFTI reports (if applicable)', detail: 'Document when IFTIs apply — mainly if you hold client funds in trust and receive international wire transfers.' },
      { id: 'rep6', text: 'Establish procedure for annual AML/CTF compliance report', detail: 'Document the process for preparing and submitting the annual compliance report to AUSTRAC.' },
      { id: 'rep7', text: 'Document the tipping-off prohibition and train staff on it', detail: 'Ensure all staff understand they must not disclose an SMR to the client. This is a criminal offence (up to 2 years imprisonment).' },
      { id: 'rep8', text: 'Set up access to AUSTRAC Online for report filing', detail: 'Ensure your compliance officer has access to AUSTRAC Online (online.austrac.gov.au) to file reports.' },
      { id: 'rep9', text: 'Establish internal escalation flowchart', detail: 'Create a clear visual diagram showing the internal escalation path from staff observation to compliance officer to AUSTRAC report.' },
    ],
    recordKeeping: [
      { id: 'rk1', text: 'Define what records to keep (CDD, engagements, program, training, reports)', detail: 'Document a comprehensive list of all records that must be retained under the AML/CTF Act.' },
      { id: 'rk2', text: 'Establish 7-year retention policy', detail: 'Implement a policy ensuring all AML/CTF records are kept for a minimum of 7 years.' },
      { id: 'rk3', text: 'Define secure storage method (digital and/or physical)', detail: 'Specify how records will be stored securely, with protection against unauthorised access, loss, or damage.' },
      { id: 'rk4', text: 'Ensure records are retrievable within a reasonable timeframe', detail: 'Records must be accessible if AUSTRAC requests them. Your storage system must allow for timely retrieval.' },
      { id: 'rk5', text: 'Confirm storage complies with privacy obligations (APPs)', detail: 'Ensure your record storage complies with the Australian Privacy Principles (APP) under the Privacy Act 1988.' },
    ],
    training: [
      { id: 'tr1', text: 'Develop AML/CTF training content for staff', detail: 'Create training materials covering ML/TF/PF awareness, the gatekeeper role, your AML/CTF program, CDD procedures, red flags, reporting, tipping-off, and record keeping.' },
      { id: 'tr2', text: 'Schedule initial training before 1 July 2026', detail: 'All relevant staff should receive initial AML/CTF training before obligations commence on 1 July 2026.' },
      { id: 'tr3', text: 'Plan ongoing refresher training (at least annually)', detail: 'AML/CTF training should be refreshed at least annually, or more frequently when the program changes.' },
      { id: 'tr4', text: 'Include all required topics in training content', detail: 'Training must cover: ML/TF/PF risks, the 8 designated services, CDD, beneficial ownership, PEP/sanctions, red flags, reporting, tipping-off, record keeping.' },
      { id: 'tr5', text: 'Maintain training attendance and completion records', detail: 'Keep records of who attended training, when, what was covered, and results of any assessments. Keep for 7 years.' },
    ],
    evaluation: [
      { id: 'ev1', text: 'Plan for independent evaluation of AML/CTF program', detail: 'An independent evaluation is required at least every 3 years. Begin planning who will conduct it and what it will cover.' },
      { id: 'ev2', text: 'Schedule first evaluation (required at least every 3 years)', detail: 'Set a date for the first independent evaluation and build it into your compliance calendar.' },
      { id: 'ev3', text: 'Identify who will conduct the evaluation (must be independent)', detail: 'The evaluator must be independent of the program. Consider another accounting firm (peer review), an external compliance consultant, or internal audit (if independent).' },
      { id: 'ev4', text: 'Document how adverse findings will be addressed', detail: 'Your AML/CTF program should specify how you will respond to and remediate any adverse findings from an evaluation.' },
    ],
    seniorApproval: [
      { id: 'sa1', text: 'Present completed AML/CTF program to senior management / governing body', detail: 'The full program (risk assessment, policies, processes, governance, training, and review arrangements) should be presented to the partners or senior management for approval.' },
      { id: 'sa2', text: 'Obtain formal approval (documented sign-off)', detail: 'Senior management approval must be formally documented with the date, the approver\'s name, and their position.' },
      { id: 'sa3', text: 'Ensure program is accessible to all relevant staff', detail: 'Once approved, make the AML/CTF program available to all staff who need to understand and implement it.' },
      { id: 'sa4', text: 'Integrate forms into existing practice management systems', detail: 'Where possible, integrate AML/CTF forms and checklists into your existing workflow and practice management software.' },
      { id: 'sa5', text: 'Schedule launch briefing for all staff', detail: 'Brief all staff on the new AML/CTF program before obligations commence on 1 July 2026.' },
    ],
    enrolment: [
      { id: 'en1', text: 'Confirmed I provide at least one designated service', detail: 'Use the "Am I Regulated?" service checker to confirm your practice provides at least one of the 8 designated services.' },
      { id: 'en2', text: 'Gathered all required practice information', detail: 'Collect: ABN, practice name and structure, contact person, compliance officer details, description of designated services, and practice address(es).' },
      { id: 'en3', text: 'Appointed a compliance officer', detail: 'A compliance officer must be appointed and notified to AUSTRAC within 14 days of appointment.' },
      { id: 'en4', text: 'Enrolled via AUSTRAC Online', detail: 'Complete enrolment at online.austrac.gov.au. Enrolment opens 31 March 2026.' },
      { id: 'en5', text: 'Notified AUSTRAC of compliance officer', detail: 'Notify AUSTRAC of your compliance officer\'s details within 14 days of their appointment via AUSTRAC Online.' },
      { id: 'en6', text: 'Saved enrolment confirmation to records', detail: 'Keep a copy of your enrolment confirmation for your records (retain for 7 years).' },
    ],
    recordAudit: [
      { id: 'rka1', text: 'All CDD forms are being saved systematically', detail: 'Ensure every designated service engagement has a completed CDD form saved and filed.' },
      { id: 'rka2', text: 'ID document copies are stored securely', detail: 'Copies of identity documents (passports, licences, etc.) must be stored with restricted access.' },
      { id: 'rka3', text: 'Engagement records are linked to client CDD records', detail: 'Your record system should allow you to find the CDD record for any given designated service engagement.' },
      { id: 'rka4', text: 'SMR/TTR/compliance report copies are kept separately from client files', detail: 'Report copies should be stored separately from client files to protect the tipping-off prohibition.' },
      { id: 'rka5', text: 'Training records include dates, attendees, and content covered', detail: 'Training records should be specific enough to demonstrate what each person was trained on and when.' },
      { id: 'rka6', text: 'Personnel due diligence records are maintained', detail: 'Due diligence records for all AML/CTF staff must be kept and updated.' },
      { id: 'rka7', text: 'Program review records document what was reviewed and any changes made', detail: 'Every time the program is reviewed, document what was reviewed, what changed, and who approved the changes.' },
      { id: 'rka8', text: 'All records are set for minimum 7-year retention', detail: 'Review your retention policies to confirm all AML/CTF records will be kept for the required 7 years.' },
      { id: 'rka9', text: 'Storage method is secure and privacy-compliant', detail: 'Digital storage should be access-controlled and backed up. Physical storage should be locked. Both must comply with privacy law.' },
      { id: 'rka10', text: 'Records can be retrieved within a reasonable timeframe', detail: 'Test your retrieval process to ensure you could respond to an AUSTRAC request within a reasonable timeframe.' },
    ],
    ongoingCDD: [
      { id: 'ocdd1', text: 'Client information is current (name, address, contact, structure)', detail: 'Verify that the contact, identification, and structural details you hold are still accurate.' },
      { id: 'ocdd2', text: "Engagement is consistent with client's known profile", detail: 'Assess whether this engagement makes sense given what you know about the client\'s business and financial situation.' },
      { id: 'ocdd3', text: 'No new red flags or suspicious indicators identified', detail: 'Review the engagement against AUSTRAC\'s red flag indicators for accountants. Note any concerns.' },
      { id: 'ocdd4', text: 'Source of funds/wealth remains consistent', detail: 'Confirm the source of funds is consistent with the client\'s known financial profile.' },
      { id: 'ocdd5', text: 'PEP/TFS status re-checked', detail: 'Re-screen the client against PEP lists and the DFAT Consolidated List.' },
      { id: 'ocdd6', text: 'Beneficial ownership information re-confirmed', detail: 'Verify that beneficial ownership information is still current and accurate.' },
      { id: 'ocdd7', text: 'Risk rating reviewed and confirmed / updated', detail: 'Reassess whether the client\'s risk rating has changed based on new information.' },
      { id: 'ocdd8', text: 'Review date recorded', detail: 'Document the date of this ongoing CDD review and who conducted it.' },
    ],
    programReview: [
      { id: 'pr1', text: 'Identify what triggered the review', detail: 'Document the specific trigger (scheduled review, practice change, regulatory update, incident, etc.).' },
      { id: 'pr2', text: 'Review and update the risk assessment (if risk profile has changed)', detail: 'Assess whether your risk profile has changed and update the risk assessment accordingly.' },
      { id: 'pr3', text: 'Review and update policies and procedures', detail: 'Check that all policies and procedures remain current and fit for purpose.' },
      { id: 'pr4', text: 'Review and update forms and templates', detail: 'Ensure all CDD forms, templates, and checklists reflect current requirements.' },
      { id: 'pr5', text: 'Review and update controls (are existing controls still adequate?)', detail: 'Assess whether your risk controls are still appropriate given any changes to your risk profile.' },
      { id: 'pr6', text: 'Confirm risks remain within your risk appetite', detail: 'Verify that identified risks are being managed within the levels acceptable to your practice.' },
      { id: 'pr7', text: 'Communicate changes to relevant staff', detail: 'Ensure any updates to the program are communicated to all staff affected by the changes.' },
      { id: 'pr8', text: 'Provide additional training if needed', detail: 'If changes are significant, schedule training to bring staff up to date.' },
      { id: 'pr9', text: 'Document the review (what was reviewed, what changed, who approved)', detail: 'Keep a record of this review in your change log.' },
      { id: 'pr10', text: 'Update the change log', detail: 'Add an entry to the change log recording this review.' },
    ],
  },

  // ─── OBLIGATIONS ──────────────────────────────────────────────────────────
  obligations: [
    { num: 1, title: 'Determine which designated services you provide', icon: '🔍', summary: 'Identify which of the 8 designated services your practice provides. This determines the scope of your AML/CTF obligations.', section: 'am-i-regulated' },
    { num: 2, title: 'Enrol with AUSTRAC', icon: '✅', summary: 'Enrol as a reporting entity within 28 days of first providing a designated service. Latest: 29 July 2026.', section: 'enrolment' },
    { num: 3, title: 'Appoint a compliance officer', icon: '👤', summary: 'Appoint an AML/CTF compliance officer at management level who is an Australian resident and fit and proper person.', section: 'governance' },
    { num: 4, title: 'Conduct a risk assessment', icon: '⚠️', summary: 'Assess your ML/TF/PF risks across client, service, delivery channel, and geographic categories.', section: 'risk-assessment' },
    { num: 5, title: 'Develop an AML/CTF program', icon: '🏗️', summary: 'Document your risk assessment, policies, and processes for managing AML/CTF risks. Must be approved by senior management.', section: 'program-builder' },
    { num: 6, title: 'Conduct initial CDD for designated service clients', icon: '🪪', summary: 'Identify and verify clients before providing any designated service. CDD only applies to designated service engagements, not exempt services.', section: 'cdd' },
    { num: 7, title: 'Conduct ongoing CDD', icon: '🔄', summary: 'Monitor client relationships throughout the engagement. Keep client information up to date and re-assess risk as circumstances change.', section: 'cdd' },
    { num: 8, title: 'Screen for PEPs and sanctions', icon: '🔎', summary: 'Screen all designated service clients against PEP lists and the DFAT Consolidated Sanctions List as part of initial and ongoing CDD.', section: 'cdd' },
    { num: 9, title: 'Report to AUSTRAC', icon: '📤', summary: 'File SMRs, TTRs, IFTIs (if applicable), and an annual compliance report. Never tip off clients about reports.', section: 'reporting' },
    { num: 10, title: 'Keep records, train staff, plan evaluation', icon: '🗂️', summary: 'Retain all records for 7 years. Conduct initial and annual staff training. Plan an independent evaluation at least every 3 years.', section: 'record-keeping' },
  ],

  // ─── AUSTRAC LINKS ────────────────────────────────────────────────────────
  austracLinks: [
    // Starter Kit & Guidance Hub
    { category: 'Starter Kit & Guidance Hub', title: 'Accounting Guidance (main page)', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/accounting-guidance', desc: 'AUSTRAC\'s main guidance hub for accounting sector obligations.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Accounting Program Starter Kit', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/accounting-guidance/accounting-program-starter-kit', desc: 'The official starter kit — use this as your primary resource for building your AML/CTF program.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Getting Started with the Starter Kit', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/accounting-guidance/accounting-program-starter-kit/accounting-program-starter-kit-getting-started', desc: 'How to get started with AUSTRAC\'s accounting program starter kit.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 1: Customise Your Program', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/accounting-guidance/accounting-program-starter-kit/step-1-customise-your-accounting-program-using-starter-kit', desc: 'How to customise the starter kit for your specific practice.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 2: Use Your Program', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/accounting-guidance/accounting-program-starter-kit/step-2-use-your-accounting-program', desc: 'How to use your AML/CTF program day-to-day, including CDD and reporting.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 3: Maintain and Review', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/accounting-guidance/accounting-program-starter-kit/step-3-maintain-and-review-your-accounting-program', desc: 'AUSTRAC guidance on ongoing program maintenance and review obligations.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Starter Kit Document Library', url: 'https://www.austrac.gov.au/reforms/program-starter-kits/accounting-guidance/accounting-program-starter-kit/accounting-program-starter-kit-document-library', desc: 'All template documents from the starter kit in one place.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Starter Kit Media Release (30 Jan 2026)', url: 'https://www.austrac.gov.au/news-and-media/media-release/austrac-backs-newly-regulated-sectors-release-amlctf-program-starter-kits', desc: 'AUSTRAC\'s announcement of the program starter kit releases.' },
    // Reform Guidance
    { category: 'Reform Guidance', title: 'Professional Services Reform Overview', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/before-you-start/new-industries-and-services-be-regulated-reform/professional-services-reform', desc: 'Overview of how the reforms specifically affect accounting and professional services businesses.' },
    { category: 'Reform Guidance', title: 'Summary of Obligations — Tranche 2', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/summary-amlctf-obligations-tranche-2-entities', desc: 'Summary of all AML/CTF obligations for newly regulated Tranche 2 entities.' },
    { category: 'Reform Guidance', title: 'Regulatory Expectations for Implementation', url: 'https://www.austrac.gov.au/austrac-regulatory-expectations-implementation-amlctf-reforms', desc: 'What AUSTRAC expects from newly regulated entities during implementation.' },
    { category: 'Reform Guidance', title: 'Risk Insights — Accountant Suspicious Activity Indicators', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/risk-insights-and-indicators-suspicious-activity-accountants', desc: 'AUSTRAC\'s published red flag indicators and risk insights specific to the accounting sector.' },
    // Customer Due Diligence
    { category: 'Customer Due Diligence', title: 'Initial CDD — Individuals (Reform)', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-individuals-reform', desc: 'Detailed AUSTRAC guidance on conducting initial CDD for individual clients.' },
    { category: 'Customer Due Diligence', title: 'Initial CDD — Trusts (Reform)', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-trust-reform', desc: 'Detailed AUSTRAC guidance on conducting initial CDD for trust clients (including SMSFs).' },
    { category: 'Customer Due Diligence', title: 'Enhanced CDD (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/enhanced-customer-due-diligence-reform', desc: 'AUSTRAC guidance on when and how to apply Enhanced Due Diligence.' },
    { category: 'Customer Due Diligence', title: 'Delayed Initial CDD (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform', desc: 'When and how you may delay CDD in accounting engagements.' },
    { category: 'Customer Due Diligence', title: 'CDD Before Providing a Designated Service', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service', desc: 'Guidance on the requirement to complete CDD before providing a designated service.' },
    { category: 'Customer Due Diligence', title: 'Reliance Under CDD Arrangements (Reform)', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform', desc: 'When and how you can rely on another party\'s CDD (e.g., a lawyer on a shared transaction).' },
    { category: 'Customer Due Diligence', title: 'Beneficial Owners', url: 'https://www.austrac.gov.au/business/core-guidance/customer-identification-and-verification/beneficial-owners', desc: 'How to identify and verify beneficial owners of entities.' },
    // Governance & Personnel
    { category: 'Governance & Personnel', title: 'AML/CTF Compliance Officer (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/amlctf-compliance-officer-reform', desc: 'AUSTRAC guidance on appointing and notifying your compliance officer.' },
    { category: 'Governance & Personnel', title: 'Senior Manager (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/senior-manager-reform', desc: 'AUSTRAC guidance on the specific non-delegable obligations of the senior manager.' },
    { category: 'Governance & Personnel', title: 'Governing Body (Reform)', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/governing-body-reform', desc: 'AUSTRAC guidance on governing body oversight responsibilities.' },
    { category: 'Governance & Personnel', title: 'Governance for Sole Traders & Micro Businesses', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/governance-and-oversight-sole-traders-and-micro-businesses-reform', desc: 'Specific guidance for sole practitioners who hold all governance roles.' },
    { category: 'Governance & Personnel', title: 'Personnel Due Diligence & Training (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/identifying-personnel-roles-require-due-diligence-and-training-reform', desc: 'Who requires due diligence and training, and what is required.' },
    // Reporting
    { category: 'Reporting', title: 'Reporting to AUSTRAC (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform', desc: 'Overview of all reporting obligations for Tranche 2 entities.' },
    { category: 'Reporting', title: 'Suspicious Matter Reports (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/suspicious-matter-reports-reform', desc: 'When and how to file Suspicious Matter Reports.' },
    { category: 'Reporting', title: 'Threshold Transaction Reports (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/threshold-transaction-reports-reform', desc: 'When and how to file Threshold Transaction Reports for physical cash.' },
    { category: 'Reporting', title: 'Tipping Off', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/current-reporting-entities/tipping-off', desc: 'AUSTRAC guidance on the tipping-off prohibition — what you must not disclose.' },
    { category: 'Reporting', title: 'AUSTRAC Online (Enrolment & Reporting)', url: 'https://online.austrac.gov.au', desc: 'The AUSTRAC Online portal — where you enrol and file reports (SMRs, TTRs, IFTIs, Annual Reports).' },
    // External References
    { category: 'External References', title: 'DFAT Consolidated Sanctions List', url: 'https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list', desc: 'The Australian Government\'s list of persons and entities subject to targeted financial sanctions. Check this for every client.' },
    { category: 'External References', title: 'Money Laundering National Risk Assessment 2024', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/money-laundering-australia-national-risk-assessment-2024', desc: 'AUSTRAC\'s 2024 national risk assessment — identifies accounting as a HIGH risk sector for money laundering.' },
    { category: 'External References', title: 'AUSTRAC Business Profile Form (ABPF) Guide', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/austrac-business-profile-form-abpf-guides', desc: 'Guide to completing the AUSTRAC Business Profile Form for enrolment.' },
    { category: 'External References', title: 'Geographical Link Requirement', url: 'https://www.austrac.gov.au/business/new-to-austrac/geographical-link-requirement', desc: 'AUSTRAC guidance on when AML/CTF obligations apply based on geographical connection to Australia.' },
  ],

  // ─── RISK QUESTIONS ───────────────────────────────────────────────────────
  riskQuestions: {
    client: [
      { id: 'rc1', text: 'Do you work with clients whose business structures make identifying the true beneficial owner difficult?', risk: 'high', reason: 'Ownership opacity is a key ML vulnerability.' },
      { id: 'rc2', text: 'Do you have clients who obscure details about the purpose, ownership, or nature of a transaction?', risk: 'high', reason: 'Deliberate concealment is a major red flag.' },
      { id: 'rc3', text: 'Do you work with clients connected to industries with higher ML/TF risk (e.g., cash-intensive, gambling, crypto)?', risk: 'high', reason: 'Higher-risk sector exposure increases ML vulnerability.' },
      { id: 'rc4', text: 'Do you work with PEPs or their associates?', risk: 'high', reason: 'PEPs carry higher risk of corruption and bribery exposure.' },
      { id: 'rc5', text: 'Do you have clients who are trusts or complex multi-layered corporate structures?', risk: 'high', reason: 'Trust opacity is rated as a high national ML risk by AUSTRAC.' },
      { id: 'rc6', text: 'Do you have clients whose source of wealth is unclear or inconsistent with their profile?', risk: 'high', reason: 'Unexplained wealth is a key proceeds-of-crime indicator.' },
      { id: 'rc7', text: 'Do you have clients who are reluctant to provide identification or business information?', risk: 'high', reason: 'Reluctance to provide ID may indicate identity concealment.' },
      { id: 'rc8', text: 'Do you have many one-off or short-term client engagements (e.g., entity setup with no ongoing relationship)?', risk: 'high', reason: 'Transactional relationships reduce ongoing monitoring ability.' },
      { id: 'rc9', text: 'Do you act for clients who have been refused services by other professionals?', risk: 'high', reason: 'Prior refusal suggests other firms identified red flags.' },
    ],
    service: [
      { id: 'rs1', text: 'Do you create or restructure companies, trusts, or other entities? (Service 6)', risk: 'high', reason: 'Entity creation is a key ML vector — criminals need structures to layer funds.' },
      { id: 'rs2', text: 'Do you act as a nominee director, secretary, or trustee? (Service 7)', risk: 'high', reason: 'Professional enabler role — directly facilitating entity control.' },
      { id: 'rs3', text: 'Do you provide registered office addresses for client entities? (Service 8)', risk: 'medium', reason: 'Address lending for entities with no physical presence.' },
      { id: 'rs4', text: 'Do you hold or manage client funds in trust? (Service 3)', risk: 'high', reason: 'Fund management creates direct exposure to ML through your accounts.' },
      { id: 'rs5', text: 'Do you sell shelf companies? (Service 5)', risk: 'high', reason: 'Shell companies are a well-known ML vehicle.' },
      { id: 'rs6', text: 'Do you assist with M&A or business transfers? (Service 2)', risk: 'medium', reason: 'Business transfers involve significant value movement.' },
      { id: 'rs7', text: 'Do you assist with financing arrangements? (Service 4)', risk: 'medium', reason: 'Financial complexity creates layering opportunities.' },
      { id: 'rs8', text: 'Do you assist with property transactions? (Service 1)', risk: 'medium', reason: 'Real estate is a high-risk ML vector identified by AUSTRAC.' },
      { id: 'rs9', text: 'Do you set up Self-Managed Super Funds (SMSFs)?', risk: 'medium', reason: 'SMSFs are legal arrangements (trusts) with inherent opacity risk.' },
    ],
    delivery: [
      { id: 'rd1', text: 'Do you provide services to clients you\'ve never met face-to-face?', risk: 'high', reason: 'Identity verification is more challenging for non-face-to-face clients.' },
      { id: 'rd2', text: 'Do you accept new client instructions entirely via email or online without in-person verification?', risk: 'high', reason: 'Non-face-to-face channels increase identity fraud risk.' },
      { id: 'rd3', text: 'Do you use third-party intermediaries or referral partners to introduce clients?', risk: 'high', reason: 'Reliance on third parties for client introduction introduces additional risk.' },
      { id: 'rd4', text: 'Do clients communicate through intermediaries (e.g., lawyers, other advisors) rather than directly?', risk: 'medium', reason: 'Layered relationships can obscure the true client identity.' },
      { id: 'rd5', text: 'Do you provide services across state or national borders?', risk: 'medium', reason: 'Geographic complexity increases regulatory and verification challenges.' },
    ],
    geographic: [
      { id: 'rg1', text: 'Do you have clients based in or connected to countries identified as high-risk by FATF?', risk: 'high', reason: 'FATF grey/blacklisted jurisdictions are subject to enhanced scrutiny.' },
      { id: 'rg2', text: 'Do you help clients with transactions involving overseas entities or assets?', risk: 'high', reason: 'Cross-border transactions carry higher ML risk.' },
      { id: 'rg3', text: 'Do you set up entities for clients with overseas beneficial owners?', risk: 'high', reason: 'Foreign ownership opacity is a significant ML indicator.' },
      { id: 'rg4', text: 'Do you deal with clients who have complex international corporate structures?', risk: 'high', reason: 'Multi-jurisdictional structures facilitate layering.' },
      { id: 'rg5', text: 'Do you have clients with subsidiaries in secrecy jurisdictions or tax havens?', risk: 'high', reason: 'Secrecy jurisdictions enable ownership concealment.' },
    ],
  },

  // ─── FATF HIGH-RISK JURISDICTIONS (Feb 2026 reference) ───────────────────
  fatfHighRisk: {
    blacklist: ['Democratic People\'s Republic of Korea (North Korea)', 'Iran', 'Myanmar'],
    greylist: [
      'Algeria', 'Angola', 'Bulgaria', 'Burkina Faso', 'Cameroon', 'Côte d\'Ivoire',
      'Croatia', 'Democratic Republic of the Congo', 'Ethiopia', 'Haiti', 'Kenya',
      'Laos', 'Lebanon', 'Libya', 'Mali', 'Monaco', 'Mozambique', 'Namibia',
      'Nigeria', 'Philippines', 'Senegal', 'South Africa', 'South Sudan', 'Syria',
      'Tanzania', 'Venezuela', 'Vietnam', 'Yemen'
    ]
  },

};
