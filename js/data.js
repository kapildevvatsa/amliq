// AMLiq — Static Data
// All content sourced from publicly available AUSTRAC materials

const AMLiqData = {

  // ─── GLOSSARY ──────────────────────────────────────────────────────────────
  glossary: [
    { term: 'AML', definition: 'Anti-Money Laundering — laws and processes to prevent criminals from disguising illegal money as legitimate income.' },
    { term: 'AML/CTF Act', definition: 'The Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) — the primary Australian legislation governing AML/CTF obligations for reporting entities.' },
    { term: 'AML/CTF Program', definition: 'A documented set of policies, procedures, and controls a reporting entity must adopt to identify, mitigate, and manage ML/TF/PF risks.' },
    { term: 'AML/CTF Rules', definition: 'The Anti-Money Laundering and Counter-Terrorism Financing Rules 2025 — delegated legislation made under the AML/CTF Act that sets out detailed requirements.' },
    { term: 'AUSTRAC', definition: 'Australian Transaction Reports and Analysis Centre — Australia\'s financial intelligence agency and AML/CTF regulator.' },
    { term: 'Beneficial Owner', definition: 'The natural person (individual) who ultimately owns or controls a company, trust, partnership, or other entity — directly or indirectly.' },
    { term: 'CDD', definition: 'Customer Due Diligence — the process of identifying, verifying, and assessing the risk of your customers before providing services. Also known as KYC (Know Your Customer).' },
    { term: 'CTF', definition: 'Counter-Terrorism Financing — laws and processes to prevent money being used to fund terrorism.' },
    { term: 'Designated Service', definition: 'A specific type of service captured by the AML/CTF Act. For real estate, this includes brokering property transactions and direct property sales.' },
    { term: 'DFAT Consolidated List', definition: 'The Australian Government Department of Foreign Affairs and Trade\'s list of persons and entities subject to targeted financial sanctions.' },
    { term: 'EDD', definition: 'Enhanced Due Diligence — additional, more rigorous checks required when a customer or transaction presents higher ML/TF/PF risk.' },
    { term: 'FATF', definition: 'Financial Action Task Force — the international body that sets global AML/CTF standards and evaluates countries\' compliance.' },
    { term: 'FATF Black List', definition: 'Countries with serious strategic deficiencies in their AML/CTF frameworks — considered high-risk jurisdictions (e.g., North Korea, Iran).' },
    { term: 'FATF Grey List', definition: 'Countries with strategic deficiencies in their AML/CTF frameworks that are under increased monitoring by FATF.' },
    { term: 'Governing Body', definition: 'The board of directors, partners, trustees, or senior management responsible for oversight and governance of the business.' },
    { term: 'IFTI', definition: 'International Fund Transfer Instruction — a report required when you are involved in sending or receiving international electronic fund transfers.' },
    { term: 'Independent Evaluation', definition: 'A review of the AML/CTF program by someone independent of the program (i.e., not the compliance officer or program designer). Required at least once every 3 years.' },
    { term: 'KYC', definition: 'Know Your Customer — another term for Customer Due Diligence (CDD). The process of verifying who your customers are.' },
    { term: 'ML/TF/PF', definition: 'Money Laundering / Terrorism Financing / Proliferation Financing — the three primary risks that the AML/CTF regime is designed to address.' },
    { term: 'Money Laundering', definition: 'The process by which criminals disguise the origins of illegally obtained money to make it appear legitimate.' },
    { term: 'PEP', definition: 'Politically Exposed Person — someone who holds or has held a prominent public position (domestically or internationally), or is a family member or close associate of such a person.' },
    { term: 'PF', definition: 'Proliferation Financing — the act of providing funds or financial services to support the development, production, or acquisition of weapons of mass destruction.' },
    { term: 'Reporting Entity', definition: 'A business that provides designated services under the AML/CTF Act and therefore has compliance obligations including enrolment, CDD, and reporting.' },
    { term: 'SMR', definition: 'Suspicious Matter Report — a report filed with AUSTRAC when you suspect, on reasonable grounds, that a transaction or activity may involve money laundering, terrorism financing, or another offence.' },
    { term: 'Source of Funds', definition: 'Where the money for a specific transaction is coming from (e.g., savings, sale of another property, loan, inheritance).' },
    { term: 'Source of Wealth', definition: 'How the customer accumulated their overall net worth or assets (e.g., business income, employment, investments).' },
    { term: 'Structuring', definition: 'The criminal act of breaking up cash transactions into smaller amounts below the $10,000 TTR threshold to avoid reporting obligations.' },
    { term: 'TFS', definition: 'Targeted Financial Sanctions — sanctions imposed under Australian law (and UN Security Council resolutions) against specific individuals and entities. It is illegal to provide services to sanctioned persons.' },
    { term: 'Tipping Off', definition: 'The criminal act of disclosing to a customer (or any other person) that you have filed, or intend to file, a Suspicious Matter Report (SMR) about them.' },
    { term: 'Tranche 2', definition: 'The second wave of Australian AML/CTF reforms, extending obligations to real estate agents, lawyers, accountants, and other professional services — effective 1 July 2026.' },
    { term: 'TTR', definition: 'Threshold Transaction Report — a report filed with AUSTRAC when you receive $10,000 or more in physical currency (banknotes and coins) in a single transaction.' },
  ],

  // ─── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    {
      q: 'I only do property management, not sales. Am I affected?',
      a: 'No. Property management (including residential rentals) is not a designated service under these reforms. You do not have AML/CTF obligations under the Tranche 2 reforms. However, if you also conduct property sales, those activities are captured.',
      topics: ['enrolment', 'general'],
      source: 'AUSTRAC Real Estate Services Reform guidance'
    },
    {
      q: "I'm a buyer's agent. Am I affected?",
      a: "Yes. Brokering the purchase of real estate on behalf of a buyer is a designated service under the reforms. As a buyer's agent, you will need to enrol with AUSTRAC, develop an AML/CTF program, and conduct CDD on your clients.",
      topics: ['enrolment', 'general'],
      source: 'AUSTRAC Real Estate Services Reform guidance'
    },
    {
      q: "I'm a property developer with an in-house sales team. Am I affected?",
      a: 'Yes. Selling real estate directly to customers without using an independent real estate agent (including house-and-land packages, off-the-plan apartments, and land subdivisions) is a designated service. Your business will need to comply.',
      topics: ['enrolment', 'general'],
      source: 'AUSTRAC Real Estate Services Reform guidance'
    },
    {
      q: 'Do I need to verify the identity of both buyer and seller?',
      a: 'Yes. According to AUSTRAC, if you broker a property sale, both the buyer and the seller are your customers regardless of which party engaged you. CDD obligations apply to both parties.',
      topics: ['cdd'],
      source: 'AUSTRAC Step 2 — Use Your Real Estate Program (austrac.gov.au)'
    },
    {
      q: 'What if my customer refuses to provide ID?',
      a: 'If you cannot complete CDD satisfactorily, you should consider whether to decline or cease providing the designated service. You may also need to file an SMR if the refusal itself raises suspicion about the customer\'s motives.',
      topics: ['cdd', 'reporting'],
      source: 'AUSTRAC CDD reform guidance'
    },
    {
      q: 'How much does it cost to enrol with AUSTRAC?',
      a: 'Enrolment with AUSTRAC is free. There is no fee to enrol as a reporting entity.',
      topics: ['enrolment'],
      source: 'AUSTRAC enrolment guidance'
    },
    {
      q: 'Can I use a digital ID verification service?',
      a: 'AUSTRAC guidance permits the use of electronic verification methods as part of CDD, subject to your risk assessment. If you use a digital verification service, it should be part of a documented process that meets AUSTRAC\'s requirements for identity verification.',
      topics: ['cdd'],
      source: 'AUSTRAC CDD reform guidance'
    },
    {
      q: "What if I suspect money laundering but I'm not sure?",
      a: "You don't need to be certain. If you have suspicion on reasonable grounds, you should file an SMR. AUSTRAC would rather receive reports that turn out to be unfounded than miss genuine suspicious activity. The threshold is suspicion — not proof.",
      topics: ['reporting'],
      source: 'AUSTRAC SMR reform guidance'
    },
    {
      q: 'What are the penalties for non-compliance?',
      a: 'Penalties vary depending on the breach. AUSTRAC has stated it will focus enforcement on entities that fail to enrol or make no meaningful compliance effort. Civil penalties can be significant. AUSTRAC has committed to taking a proportionate, risk-based approach for newly regulated sectors.',
      topics: ['general'],
      source: 'AUSTRAC regulatory expectations guidance'
    },
    {
      q: 'Do I need to report every cash transaction?',
      a: 'No — only cash transactions of $10,000 or more in physical currency require a TTR. However, any cash transaction that raises suspicion, regardless of amount, may require an SMR. Watch out for structuring (breaking payments into smaller amounts to avoid the threshold).',
      topics: ['reporting'],
      source: 'AUSTRAC TTR reform guidance'
    },
    {
      q: 'Can I outsource my AML/CTF program to a third party?',
      a: 'You can use external consultants to help build your program, and you can appoint an external compliance officer if they meet the eligibility criteria (management level, Australian resident, fit and proper person). However, you remain ultimately responsible for compliance.',
      topics: ['general', 'governance'],
      source: 'AUSTRAC governance reform guidance'
    },
    {
      q: 'Does a leasehold count as "real estate" under the reforms?',
      a: 'Only if the leasehold interest exceeds 30 years. Short-term leases and standard residential tenancies are not captured.',
      topics: ['general'],
      source: 'AUSTRAC Real Estate Services Reform guidance'
    },
    {
      q: 'What is the difference between a risk assessment and the AML/CTF program?',
      a: 'The risk assessment is a component of the AML/CTF program. The full program also includes policies, processes, governance arrangements, CDD procedures, training, record keeping, and reporting. The risk assessment informs the design of the program.',
      topics: ['general', 'program'],
      source: 'AUSTRAC program development guidance'
    },
    {
      q: "Can I rely on another agent's CDD?",
      a: 'Yes, through a documented reliance arrangement. If you rely on another reporting entity or eligible introducer to conduct CDD on your behalf, you must have a written arrangement in place. However, you remain responsible for ensuring CDD was properly conducted.',
      topics: ['cdd'],
      source: 'AUSTRAC CDD reform guidance'
    },
    {
      q: 'Do I need to screen every customer for sanctions?',
      a: 'Yes — PEP and Targeted Financial Sanctions (TFS) screening is a component of initial CDD for every customer. You should ask customers whether they are a PEP, and check the DFAT Consolidated List for all customers.',
      topics: ['cdd'],
      source: 'AUSTRAC CDD reform guidance'
    },
  ],

  // ─── RED FLAGS ─────────────────────────────────────────────────────────────
  redFlags: [
    // Category 1: Customer Risk
    { id: 'rf1', category: 'customer', severity: 'amber', title: 'Customer reluctant to provide ID', detail: 'Customer avoids, delays, or provides inconsistent identity documents. They may give excuses, provide documents that don\'t match other information, or refuse verification requests.' },
    { id: 'rf2', category: 'customer', severity: 'red', title: 'Customer uses different names', detail: 'The name on the contract of sale differs from the name on ID documents or bank account details. May indicate identity fraud or use of an alias.' },
    { id: 'rf3', category: 'customer', severity: 'red', title: 'Customer uses nominees or shell companies', detail: 'The customer attempts to conceal the true buyer or owner through the use of nominees, shell companies, or complex corporate structures with no clear commercial purpose.' },
    { id: 'rf4', category: 'customer', severity: 'red', title: 'Customer evasive about source of funds', detail: 'The customer cannot or will not explain where their purchase funds originate. Vague answers like "savings" without supporting documentation, or explanations that don\'t match the customer\'s apparent financial profile.' },
    { id: 'rf5', category: 'customer', severity: 'amber', title: 'Customer unconcerned about price', detail: 'The buyer willingly overpays or shows no interest in negotiating, accepting the asking price or above without question. This may indicate the purpose is to move money rather than make a sound investment.' },
    { id: 'rf6', category: 'customer', severity: 'amber', title: 'No apparent connection to property location', detail: 'The buyer has no work, family, business, or investment ties to the area where the property is located. Cannot provide a plausible reason for wanting to invest in this specific location.' },
    { id: 'rf7', category: 'customer', severity: 'red', title: 'Customer is a PEP or PEP associate', detail: 'The customer is a Politically Exposed Person — a prominent public official (domestic or foreign) — or a family member or close associate of a PEP. This is a recognised higher-risk category requiring Enhanced Due Diligence.' },
    { id: 'rf8', category: 'customer', severity: 'red', title: "Customer's wealth is inconsistent with profile", detail: "A low-income or otherwise modest individual purchasing a high-value property without a clear explanation. Their apparent income, assets, or lifestyle don't match the transaction value." },
    { id: 'rf9', category: 'customer', severity: 'amber', title: 'Customer pressures for rapid completion', detail: 'The customer pushes to settle unusually quickly without apparent legitimate reason. Urgency to complete before normal due diligence can be conducted may indicate an attempt to avoid scrutiny.' },
    { id: 'rf10', category: 'customer', severity: 'red', title: 'Complex ownership structures', detail: 'Multiple layers of companies, trusts, or partnerships with no clear commercial rationale. Beneficial ownership is unclear or involves nominees in multiple jurisdictions.' },

    // Category 2: Service/Transaction
    { id: 'rf11', category: 'transaction', severity: 'red', title: 'Cash payments for large amounts', detail: 'The buyer wants to pay all or part of the purchase price in physical cash (banknotes). Any cash payment of $10,000+ requires a Threshold Transaction Report (TTR). Cash is the most common ML method.' },
    { id: 'rf12', category: 'transaction', severity: 'red', title: 'Funds from unrelated third parties', detail: 'The purchase is funded by someone with no clear connection to the buyer — an unrelated third party whose relationship to the buyer cannot be explained. This is a significant ML red flag.' },
    { id: 'rf13', category: 'transaction', severity: 'amber', title: 'Significantly above or below market value', detail: 'Property is purchased at a price that doesn\'t match market conditions — either significantly above (to move illicit funds) or below (to facilitate an undisclosed payment to the vendor).' },
    { id: 'rf14', category: 'transaction', severity: 'amber', title: 'Quick buy-and-sell (rapid flip)', detail: 'Property is bought and resold rapidly without any renovations, improvements, or apparent legitimate profit motive. May indicate use of property to layer illicit funds.' },
    { id: 'rf15', category: 'transaction', severity: 'amber', title: 'Back-to-back transactions', detail: 'Multiple transactions on the same property in a short period, often at varying prices, with no clear commercial justification.' },
    { id: 'rf16', category: 'transaction', severity: 'red', title: 'Deposit from overseas with no explanation', detail: 'International funds used for the deposit or purchase with no clear explanation of the source or reason for the international transfer. May indicate cross-border layering.' },
    { id: 'rf17', category: 'transaction', severity: 'amber', title: 'Unusual contract terms', detail: 'Side agreements, undisclosed rebates, unusual settlement conditions, or contract terms that don\'t reflect the apparent commercial reality of the transaction.' },
    { id: 'rf18', category: 'transaction', severity: 'red', title: 'Structuring — breaking cash to avoid $10K threshold', detail: 'A customer pays cash in multiple instalments just under $10,000 to avoid the Threshold Transaction Report requirement. Structuring is itself a criminal offence under the AML/CTF Act.' },

    // Category 3: Delivery Channel
    { id: 'rf19', category: 'delivery', severity: 'amber', title: 'Entirely non-face-to-face transaction', detail: 'The customer never meets the agent in person — all interactions are conducted remotely. While legitimate, non-face-to-face transactions present higher identity verification challenges.' },
    { id: 'rf20', category: 'delivery', severity: 'red', title: 'Customer insists on encrypted/untraceable communication', detail: 'The customer refuses to communicate via phone, email, or other traceable methods — insisting on encrypted messaging apps or other channels that leave no audit trail.' },
    { id: 'rf21', category: 'delivery', severity: 'amber', title: 'Third-party intermediary controls all instructions', detail: 'The actual customer is entirely shielded behind lawyers, agents, or other intermediaries. The real buyer or seller is never directly contactable and their identity cannot be verified.' },
    { id: 'rf22', category: 'delivery', severity: 'amber', title: 'Instructions change frequently or inconsistently', detail: 'The requirements, identities, or instructions keep changing throughout the transaction without plausible explanation. This may indicate the identity of the true principal is being concealed.' },

    // Category 4: Foreign/Jurisdiction
    { id: 'rf23', category: 'jurisdiction', severity: 'red', title: 'Funds from FATF grey/blacklisted jurisdictions', detail: 'Money originates from countries identified by FATF as high-risk — including blacklisted countries (North Korea, Iran) or grey-listed countries with strategic AML deficiencies.' },
    { id: 'rf24', category: 'jurisdiction', severity: 'red', title: 'Customer from jurisdiction with weak AML controls', detail: 'The customer is based in, or funds originate from, a country known for poor AML/CTF regulatory frameworks, high corruption, or significant organised crime activity.' },
    { id: 'rf25', category: 'jurisdiction', severity: 'red', title: 'Multiple international transfers involved', detail: 'Funds are routed through several countries before reaching Australia, with no apparent commercial reason for the complex transfer path. This is a classic "layering" technique.' },
    { id: 'rf26', category: 'jurisdiction', severity: 'amber', title: 'Customer has no connection to Australia', detail: 'The customer has no residency, business, employment, family, or other clear ties to Australia. Cannot explain why they specifically want to purchase Australian property.' },
    { id: 'rf27', category: 'jurisdiction', severity: 'red', title: 'Foreign corporate structures used to purchase', detail: 'Offshore companies, foreign trusts, or other overseas legal structures are used to hold Australian property, obscuring beneficial ownership and making it difficult to identify the real owner.' },
  ],

  // ─── QUIZ QUESTIONS ───────────────────────────────────────────────────────
  quiz: [
    {
      id: 1,
      question: 'Which of the following are designated services for real estate under the AML/CTF Act reforms?',
      options: [
        'Property management (managing rental properties)',
        'Brokering a property sale on behalf of a vendor',
        'Commercial leasing',
        'Conveyancing'
      ],
      answer: 1,
      explanation: 'Only brokering real estate transactions (acting on behalf of buyer or seller) and direct property sales are designated services. Property management, commercial leasing, and conveyancing are NOT designated services under these real estate reforms.'
    },
    {
      id: 2,
      question: 'A buyer offers to pay a $15,000 deposit entirely in cash. What must you do?',
      options: [
        'Accept the cash and proceed normally',
        'Refuse the cash payment — you must not accept large cash amounts',
        'Accept the cash, file a TTR with AUSTRAC within 10 business days, and consider whether an SMR is also warranted',
        'Call the police immediately'
      ],
      answer: 2,
      explanation: 'You are not required to refuse cash payments. However, any physical cash payment of $10,000 or more requires a Threshold Transaction Report (TTR) filed within 10 business days. You should also consider whether the circumstances warrant filing an SMR.'
    },
    {
      id: 3,
      question: 'You file an SMR about a customer. Can you tell the customer about it?',
      options: [
        'Yes, they have a right to know',
        'No — disclosing an SMR is a criminal offence known as tipping off',
        'Only if they ask directly',
        'Only if your manager approves'
      ],
      answer: 1,
      explanation: 'The tipping-off prohibition is a critical legal requirement. It is a criminal offence to disclose to a customer (or anyone else who doesn\'t need to know) that you have filed, or intend to file, an SMR. This applies even if the customer directly asks.'
    },
    {
      id: 4,
      question: 'What is a Politically Exposed Person (PEP)?',
      options: [
        'A Personal Equity Plan holder',
        'Someone who holds or has held a prominent public position, or is a family member or close associate of such a person',
        'A Property Evaluation Protocol designation',
        'A Pre-Exchange Procedure participant'
      ],
      answer: 1,
      explanation: 'A PEP is a person who holds or has held a prominent public position — such as a head of state, government minister, senior official, senior military figure, or senior executive of a state-owned enterprise — domestically or internationally. Their family members and close associates are also considered PEPs.'
    },
    {
      id: 5,
      question: 'A customer wants to buy a property using a complex trust structure with multiple layers of corporate trustees. The beneficial owners are unclear. What risk level does this indicate?',
      options: [
        'Low risk — trusts are standard in property transactions',
        'Medium risk — worth monitoring',
        'High risk — trusts with opaque beneficial ownership are a key ML vulnerability',
        'No risk — the legal structure provides transparency'
      ],
      answer: 2,
      explanation: 'AUSTRAC\'s 2024 National Risk Assessment rated trusts as a high national money laundering risk due to poor transparency. When beneficial ownership through a trust structure is unclear, this is a high-risk indicator requiring Enhanced Due Diligence (EDD).'
    },
    {
      id: 6,
      question: 'How long must you keep CDD records (such as ID documents and customer identification forms)?',
      options: [
        '1 year',
        '3 years',
        '5 years',
        '7 years'
      ],
      answer: 3,
      explanation: 'Under the AML/CTF Act, records must be kept for a minimum of 7 years from when the record was made or the business relationship ended (whichever is later). This applies to CDD records, transaction records, training records, and all other AML/CTF documentation.'
    },
    {
      id: 7,
      question: 'A buyer from a FATF-blacklisted country wants to purchase a property. What should you do?',
      options: [
        'Refuse the sale immediately — you cannot deal with anyone from a blacklisted country',
        'Proceed normally — country of origin is not relevant to property transactions',
        'Apply enhanced due diligence, verify source of funds thoroughly, and consider filing an SMR if concerns remain',
        'Report the customer to the immigration department'
      ],
      answer: 2,
      explanation: 'Having a customer from a FATF high-risk jurisdiction is a significant risk indicator that requires Enhanced Due Diligence (EDD). You should verify the source of funds, apply additional verification, and consider whether an SMR is warranted. However, you are not automatically prohibited from dealing with them.'
    },
    {
      id: 8,
      question: 'When must you file an SMR if your suspicion relates to terrorism financing?',
      options: [
        'Within 3 business days',
        'Within 10 business days',
        'Within 24 hours',
        'Within 30 days'
      ],
      answer: 2,
      explanation: 'SMRs relating to terrorism financing must be filed within 24 hours of forming the suspicion. For all other suspicious matters, the timeframe is 3 business days. The 24-hour rule reflects the urgent national security implications of terrorism financing.'
    },
    {
      id: 9,
      question: 'A customer is buying a property significantly above market value and seems unconcerned about the price difference. Is this a red flag for money laundering?',
      options: [
        'No — buyers sometimes pay premium prices for emotional reasons',
        'Yes — willingness to overpay without concern about the price premium is a recognised ML indicator in real estate'
      ],
      answer: 1,
      explanation: 'Purchasing property above market value without any concern about the price is a recognised money laundering indicator. It may indicate the buyer\'s primary purpose is to place illicit funds rather than make a sound investment. This should trigger further inquiries and potentially EDD.'
    },
    {
      id: 10,
      question: 'You are a property manager handling only residential rentals. Do you have AML/CTF obligations under the Tranche 2 reforms?',
      options: [
        'Yes — all real estate professionals are captured by the reforms',
        'No — property management is exempt from the designated services under these reforms'
      ],
      answer: 1,
      explanation: 'Property management (including residential rentals and commercial leasing) is specifically excluded from the designated services under the Tranche 2 reforms. Only brokering property transactions and direct property sales are captured. Property managers do not need to enrol with AUSTRAC for their property management activities.'
    },
    {
      id: 11,
      question: 'Who must be appointed to oversee your AML/CTF program?',
      options: [
        'An external lawyer with property law experience',
        'An AML/CTF compliance officer at management level who is an Australian resident and a fit and proper person',
        'A government inspector appointed by AUSTRAC',
        'The newest employee to ensure fresh perspectives'
      ],
      answer: 1,
      explanation: 'The AML/CTF Act requires the appointment of a compliance officer who: (1) is at management level, (2) is an Australian resident (if the business has a permanent Australian establishment), and (3) is a fit and proper person. AUSTRAC must be notified of the appointment within 14 days.'
    },
    {
      id: 12,
      question: "A customer's deposit funds come from an unrelated third party with no apparent connection to the transaction. What should you do?",
      options: [
        "Proceed — it's the customer's choice where their funds come from",
        'Treat this as a significant red flag, conduct further inquiries about the third-party relationship, and escalate internally if concerns remain'
      ],
      answer: 1,
      explanation: 'Third-party payments are a key money laundering indicator. When deposit or purchase funds come from an unrelated third party, this is a red flag that should trigger further inquiries, possible EDD, and — if concerns remain — escalation to the compliance officer for assessment of whether an SMR should be filed.'
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
      explanation: 'The AML/CTF Act requires an independent evaluation at least once every 3 years. The evaluator must be independent of the program — they cannot be the compliance officer or anyone who designed the program. They can be an external consultant, internal audit function (if independent), or an industry body service.'
    },
    {
      id: 14,
      question: 'Can you rely on a third party (e.g., a lawyer or another agent) to conduct CDD on your behalf?',
      options: [
        'No — you must always conduct CDD yourself',
        'Yes — but you remain ultimately responsible and must have a documented reliance arrangement in place'
      ],
      answer: 1,
      explanation: 'You can rely on another reporting entity or eligible introducer to conduct CDD on your behalf, but you must have a written reliance arrangement in place. Critically, you remain responsible for ensuring that CDD was properly conducted. If the third party made errors, you could still be liable.'
    },
    {
      id: 15,
      question: 'What is "structuring" and why is it relevant to real estate agents?',
      options: [
        'Building a property — not relevant to AML compliance',
        'Breaking cash payments into amounts just under $10,000 to avoid the TTR reporting threshold — this is a criminal offence and an ML red flag you must recognise and report'
      ],
      answer: 1,
      explanation: 'Structuring is the deliberate act of breaking cash payments into smaller amounts to stay below the $10,000 TTR threshold. It is a criminal offence under the AML/CTF Act. Real estate agents should be alert to customers making multiple cash payments of amounts just under $10,000, which is a red flag that may warrant an SMR.'
    },
  ],

  // ─── CHECKLIST ITEMS ──────────────────────────────────────────────────────
  checklists: {
    riskAssessment: [
      { id: 'ra1', text: 'Identify the designated services your business provides', detail: 'AUSTRAC requires you to document which designated services apply to your business — brokering, direct sales, or both.' },
      { id: 'ra2', text: 'Assess ML/TF/PF risks across 4 categories: customer, service, delivery channel, geographic', detail: 'Use AUSTRAC\'s 4-category risk framework. The Risk Assessment Wizard in this tool guides you through each category.' },
      { id: 'ra3', text: 'Document your risk appetite (what level of risk is acceptable)', detail: 'Your risk assessment should explicitly state what level of ML/TF/PF risk your business is willing to accept and what level triggers additional controls.' },
      { id: 'ra4', text: 'Identify high-risk scenarios specific to your agency', detail: 'Consider your specific customer types, property types, geographic areas, and delivery channels to identify scenarios where your risk may be higher.' },
      { id: 'ra5', text: "Consider AUSTRAC's risk insights and indicators for real estate", detail: "AUSTRAC has published specific risk insights for the real estate sector. These should inform your risk assessment." },
      { id: 'ra6', text: 'Document risk mitigation controls for each identified risk', detail: 'For each risk identified, document what control you will implement to manage or mitigate it (e.g., EDD for foreign customers, additional verification for trust structures).' },
      { id: 'ra7', text: 'Have risk assessment approved by senior management / governing body', detail: 'The risk assessment must be formally approved by senior management. Document the date and who approved it.' },
      { id: 'ra8', text: 'Set a schedule to review the risk assessment (and define review triggers)', detail: 'Your program should specify when the risk assessment will be reviewed — at least annually or when business circumstances change.' },
    ],
    governance: [
      { id: 'gov1', text: 'Appoint an AML/CTF compliance officer', detail: 'Every reporting entity must appoint a compliance officer who is at management level, an Australian resident, and a fit and proper person.' },
      { id: 'gov2', text: 'Ensure compliance officer meets eligibility requirements', detail: 'The compliance officer must be: (1) employed/engaged at management level, (2) an Australian resident (if business has Australian establishment), (3) a fit and proper person.' },
      { id: 'gov3', text: 'Notify AUSTRAC of compliance officer appointment within 14 days', detail: 'After appointing a compliance officer, you must notify AUSTRAC within 14 days via AUSTRAC Online.' },
      { id: 'gov4', text: 'Define AML/CTF roles and responsibilities', detail: 'Document who is responsible for CDD, transaction monitoring, escalation, training, record keeping, and senior management oversight.' },
      { id: 'gov5', text: 'Assign responsibilities to specific staff', detail: 'Use a roles and responsibilities form to document each AML/CTF function and who performs it.' },
      { id: 'gov6', text: 'Establish governing body / senior management oversight', detail: 'Senior management must be involved in approving the AML/CTF program and receiving regular compliance reports.' },
      { id: 'gov7', text: 'Set up compliance officer annual reporting to governing body', detail: 'The compliance officer should report to the governing body at least annually on the effectiveness of the AML/CTF program.' },
      { id: 'gov8', text: 'Conduct personnel due diligence on all staff in AML/CTF roles', detail: 'Anyone performing AML/CTF functions requires appropriate due diligence including identity verification, reference checks, and police checks.' },
    ],
    cddProcedures: [
      { id: 'cdd1', text: 'Define initial CDD procedures for individual customers', detail: 'Document the step-by-step process for identifying and verifying individual customers, including acceptable ID documents.' },
      { id: 'cdd2', text: 'Define initial CDD procedures for company customers', detail: 'Document the process for verifying companies, including ASIC registration checks and beneficial owner identification.' },
      { id: 'cdd3', text: 'Define initial CDD procedures for trust customers', detail: 'Trusts are rated as high-risk. Document the comprehensive process including settlor, appointor, trustee, and beneficiary identification.' },
      { id: 'cdd4', text: 'Define initial CDD procedures for partnership customers', detail: 'Document the process for verifying partnerships and all partners.' },
      { id: 'cdd5', text: 'Define initial CDD procedures for foreign customers', detail: 'Document additional requirements for foreign customers, including foreign document verification and source-of-funds requirements.' },
      { id: 'cdd6', text: 'Define beneficial owner identification procedures', detail: 'For entities (companies, trusts, partnerships), document how you will identify the natural persons who ultimately own or control the entity.' },
      { id: 'cdd7', text: 'Define PEP and TFS screening procedures', detail: 'Document the process for asking about PEP status and checking the DFAT Consolidated List for every customer.' },
      { id: 'cdd8', text: 'Define Enhanced Due Diligence (EDD) triggers and procedures', detail: 'Document when EDD is required and what additional steps you will take (e.g., for PEPs, high-risk jurisdictions, complex structures).' },
      { id: 'cdd9', text: 'Define ongoing CDD procedures and monitoring frequency', detail: 'Document how you will monitor existing customer relationships and how frequently you will review customer information.' },
      { id: 'cdd10', text: 'Define procedures for when CDD cannot be completed (decline/cease service)', detail: 'Document your policy for situations where you cannot complete CDD satisfactorily, including when to decline or cease providing the service.' },
      { id: 'cdd11', text: 'Define reliance arrangements (if relying on third parties for CDD)', detail: 'If you plan to rely on another party\'s CDD, document the arrangement including responsibilities and accountability.' },
      { id: 'cdd12', text: 'Document acceptable identity verification documents and methods', detail: 'Create a reference list of acceptable ID documents for individuals, companies, trusts, and other entity types.' },
    ],
    monitoring: [
      { id: 'mon1', text: 'Establish process for monitoring transactions for suspicious indicators', detail: 'Document how and by whom transactions will be monitored for red flags and suspicious activity.' },
      { id: 'mon2', text: "Document AUSTRAC's red flag indicators relevant to real estate", detail: 'Incorporate AUSTRAC\'s published red flag indicators across all 4 categories (customer, transaction, delivery channel, jurisdiction) into your procedures.' },
      { id: 'mon3', text: 'Define internal escalation process (agent → compliance officer → report)', detail: 'Document the step-by-step internal process for escalating suspicious activity concerns to the compliance officer.' },
      { id: 'mon4', text: 'Assign responsibility for transaction monitoring', detail: 'Specify which staff member(s) are responsible for monitoring transactions and how concerns should be escalated.' },
      { id: 'mon5', text: 'Create a suspicious activity log template', detail: 'Have a standard form for documenting observations of suspicious activity, including date, customer, concern, and action taken.' },
    ],
    reporting: [
      { id: 'rep1', text: 'Establish procedure for filing Suspicious Matter Reports (SMRs)', detail: 'Document the internal process for deciding whether to file an SMR and the steps for filing via AUSTRAC Online.' },
      { id: 'rep2', text: 'Define SMR timeframes (24 hours for terrorism, 3 business days for other)', detail: 'Ensure staff know the filing deadlines: 24 hours for terrorism financing suspicions; 3 business days for all other suspicious matters.' },
      { id: 'rep3', text: 'Establish procedure for Threshold Transaction Reports (TTRs) — $10,000+ physical cash', detail: 'Document the process for identifying and filing TTRs for any physical cash receipt of $10,000 or more.' },
      { id: 'rep4', text: 'Define TTR timeframe (10 business days)', detail: 'TTRs must be filed within 10 business days of the transaction. Ensure your process allows for timely filing.' },
      { id: 'rep5', text: 'Establish procedure for IFTI reports', detail: 'Document when and how IFTIs are required (relevant if you are directly involved in international fund transfers).' },
      { id: 'rep6', text: 'Document the tipping-off prohibition and train staff on it', detail: 'Ensure all staff understand they must not disclose an SMR to the customer. This is a criminal offence.' },
      { id: 'rep7', text: 'Set up access to AUSTRAC Online for report filing', detail: 'Ensure your compliance officer has access to AUSTRAC Online (online.austrac.gov.au) to file reports.' },
      { id: 'rep8', text: 'Establish internal escalation flowchart', detail: 'Create a clear visual diagram showing the internal escalation path from agent observation to compliance officer to AUSTRAC report.' },
    ],
    recordKeeping: [
      { id: 'rk1', text: 'Define what records to keep (CDD, transactions, program, training, reports)', detail: 'Document a comprehensive list of all records that must be retained under the AML/CTF Act.' },
      { id: 'rk2', text: 'Establish 7-year retention policy', detail: 'Implement a policy ensuring all AML/CTF records are kept for a minimum of 7 years.' },
      { id: 'rk3', text: 'Define secure storage method (digital and/or physical)', detail: 'Specify how records will be stored securely, with protection against unauthorised access, loss, or damage.' },
      { id: 'rk4', text: 'Ensure records are retrievable within a reasonable timeframe', detail: 'Records must be accessible if AUSTRAC requests them. Your storage system must allow for timely retrieval.' },
      { id: 'rk5', text: 'Confirm storage complies with privacy obligations', detail: 'Ensure your record storage complies with the Australian Privacy Principles (APP) under the Privacy Act 1988.' },
    ],
    training: [
      { id: 'tr1', text: 'Develop AML/CTF training content for staff', detail: 'Create training materials covering ML/TF/PF awareness, your AML/CTF program, CDD procedures, red flags, reporting, tipping-off, and record keeping.' },
      { id: 'tr2', text: 'Schedule initial training before 1 July 2026', detail: 'All relevant staff should receive initial AML/CTF training before obligations commence on 1 July 2026.' },
      { id: 'tr3', text: 'Plan ongoing refresher training (at least annually)', detail: 'AML/CTF training should be refreshed at least annually, or more frequently when the program changes.' },
      { id: 'tr4', text: 'Include all required topics in training content', detail: 'Training must cover: ML/TF/PF risks, obligations, CDD, beneficial ownership, PEP/sanctions, red flags, reporting, tipping-off, and record keeping.' },
      { id: 'tr5', text: 'Maintain training attendance and completion records', detail: 'Keep records of who attended training, when, what was covered, and results of any assessments. Keep for 7 years.' },
    ],
    evaluation: [
      { id: 'ev1', text: 'Plan for independent evaluation of AML/CTF program', detail: 'An independent evaluation is required at least every 3 years. Begin planning who will conduct it and what it will cover.' },
      { id: 'ev2', text: 'Schedule first evaluation (required at least every 3 years)', detail: 'Set a date for the first independent evaluation and build it into your compliance calendar.' },
      { id: 'ev3', text: 'Identify who will conduct the evaluation (must be independent)', detail: 'The evaluator must be independent of the program — not the compliance officer or anyone who designed it. Consider external consultants or internal audit (if independent).' },
      { id: 'ev4', text: 'Document how adverse findings will be addressed', detail: 'Your AML/CTF program should specify how you will respond to and remediate any adverse findings from an evaluation.' },
    ],
    seniorApproval: [
      { id: 'sa1', text: 'Present completed AML/CTF program to senior management / governing body', detail: 'The full program (risk assessment, policies, processes, governance, training, and review arrangements) should be presented to senior management for approval.' },
      { id: 'sa2', text: 'Obtain formal approval (documented sign-off)', detail: 'Senior management approval must be formally documented with the date, the approver\'s name, and their position.' },
      { id: 'sa3', text: 'Ensure program is accessible to all relevant staff', detail: 'Once approved, make the AML/CTF program available to all staff who need to understand and implement it.' },
    ],
    enrolment: [
      { id: 'en1', text: 'Confirmed I am providing a designated service', detail: 'Use the "Am I Regulated?" decision tree to confirm you are providing a designated service before enrolling.' },
      { id: 'en2', text: 'Gathered all required business information', detail: 'Collect: ABN, business name and structure, contact person, compliance officer details, description of designated services, and business address(es).' },
      { id: 'en3', text: 'Appointed a compliance officer', detail: 'A compliance officer must be appointed and notified to AUSTRAC within 14 days of appointment.' },
      { id: 'en4', text: 'Enrolled via AUSTRAC Online', detail: 'Complete enrolment at online.austrac.gov.au. Enrolment opens 31 March 2026.' },
      { id: 'en5', text: 'Notified AUSTRAC of compliance officer', detail: 'Notify AUSTRAC of your compliance officer\'s details within 14 days of their appointment via AUSTRAC Online.' },
      { id: 'en6', text: 'Saved enrolment confirmation to records', detail: 'Keep a copy of your enrolment confirmation for your records (retain for 7 years).' },
    ],
    recordAudit: [
      { id: 'rka1', text: 'All CDD forms are being saved systematically', detail: 'Ensure every customer interaction that requires CDD has a completed form saved and filed.' },
      { id: 'rka2', text: 'ID document copies are stored securely', detail: 'Copies of identity documents (passports, licences, etc.) must be stored with restricted access.' },
      { id: 'rka3', text: 'Transaction records are linked to customer CDD records', detail: 'Your record system should allow you to find the CDD record for any given transaction.' },
      { id: 'rka4', text: 'SMR/TTR/IFTI copies are kept separately from customer files', detail: 'Report copies should be stored separately from customer files to protect the tipping-off prohibition.' },
      { id: 'rka5', text: 'Training records include dates, attendees, and content covered', detail: 'Training records should be specific enough to demonstrate what each person was trained on and when.' },
      { id: 'rka6', text: 'Personnel due diligence records are maintained', detail: 'Due diligence records for all AML/CTF staff must be kept and updated.' },
      { id: 'rka7', text: 'Program review records document what was reviewed and any changes made', detail: 'Every time the program is reviewed, document what was reviewed, what changed, and who approved the changes.' },
      { id: 'rka8', text: 'All records are set for minimum 7-year retention', detail: 'Review your retention policies to confirm all AML/CTF records will be kept for the required 7 years.' },
      { id: 'rka9', text: 'Storage method is secure and privacy-compliant', detail: 'Digital storage should be access-controlled and backed up. Physical storage should be locked. Both must comply with privacy law.' },
      { id: 'rka10', text: 'Records can be retrieved within a reasonable timeframe', detail: 'Test your retrieval process to ensure you could respond to an AUSTRAC request within a reasonable timeframe.' },
    ],
    ongoingCDD: [
      { id: 'ocdd1', text: 'Customer information is current (name, address, contact)', detail: 'Verify that the contact and identification details you hold are still accurate.' },
      { id: 'ocdd2', text: "Transaction is consistent with customer's known profile", detail: 'Assess whether this transaction makes sense given what you know about the customer\'s financial situation and history.' },
      { id: 'ocdd3', text: 'No new red flags or suspicious indicators identified', detail: 'Review the transaction against AUSTRAC\'s red flag indicators. Note any concerns.' },
      { id: 'ocdd4', text: 'Source of funds remains consistent with expectations', detail: 'Confirm the source of funds is consistent with the customer\'s known financial profile.' },
      { id: 'ocdd5', text: 'PEP/TFS status re-checked', detail: 'Re-screen the customer against PEP lists and the DFAT Consolidated List.' },
      { id: 'ocdd6', text: 'Risk rating reviewed and confirmed / updated', detail: 'Reassess whether the customer\'s risk rating has changed based on new information.' },
      { id: 'ocdd7', text: 'Review date recorded', detail: 'Document the date of this ongoing CDD review and who conducted it.' },
    ],
    programReview: [
      { id: 'pr1', text: 'Identify what triggered the review', detail: 'Document the specific trigger (scheduled review, business change, regulatory update, incident, etc.).' },
      { id: 'pr2', text: 'Review and update the risk assessment (if risk profile has changed)', detail: 'Assess whether your risk profile has changed and update the risk assessment accordingly.' },
      { id: 'pr3', text: 'Review and update policies and procedures', detail: 'Check that all policies and procedures remain current and fit for purpose.' },
      { id: 'pr4', text: 'Review and update forms and templates', detail: 'Ensure all CDD forms, templates, and checklists reflect current requirements.' },
      { id: 'pr5', text: 'Review and update controls (are existing controls still adequate?)', detail: 'Assess whether your risk controls are still appropriate given any changes to your risk profile.' },
      { id: 'pr6', text: 'Confirm risks remain within your risk appetite', detail: 'Verify that identified risks are being managed within the levels acceptable to your business.' },
      { id: 'pr7', text: 'Communicate changes to relevant staff', detail: 'Ensure any updates to the program are communicated to all staff affected by the changes.' },
      { id: 'pr8', text: 'Provide additional training if needed', detail: 'If changes are significant, schedule training to bring staff up to date.' },
      { id: 'pr9', text: 'Document the review (what was reviewed, what changed, who approved)', detail: 'Keep a record of this review in your change log.' },
      { id: 'pr10', text: 'Update the change log', detail: 'Add an entry to the change log recording this review.' },
    ],
  },

  // ─── OBLIGATIONS ──────────────────────────────────────────────────────────
  obligations: [
    { num: 1, title: 'Enrol with AUSTRAC', icon: '✅', summary: 'Enrol as a reporting entity within 28 days of first providing a designated service. Latest: 29 July 2026.', section: 'enrolment' },
    { num: 2, title: 'Appoint a compliance officer', icon: '👤', summary: 'Appoint an AML/CTF compliance officer at management level who is an Australian resident and fit and proper person.', section: 'governance' },
    { num: 3, title: 'Conduct a risk assessment', icon: '⚠️', summary: 'Assess your ML/TF/PF risks across customer, service, delivery channel, and geographic categories.', section: 'risk-assessment' },
    { num: 4, title: 'Develop an AML/CTF program', icon: '🏗️', summary: 'Document your policies, processes, and controls for managing AML/CTF risks. Must be approved by senior management.', section: 'program-builder' },
    { num: 5, title: 'Conduct initial CDD', icon: '🪪', summary: 'Identify and verify your customers before providing any designated service. Applies to all entity types.', section: 'cdd' },
    { num: 6, title: 'Conduct ongoing CDD', icon: '🔄', summary: 'Monitor customer relationships throughout the engagement and keep customer information up to date.', section: 'cdd' },
    { num: 7, title: 'Screen for PEPs and sanctions', icon: '🔎', summary: 'Screen all customers against PEP lists and the DFAT Consolidated Sanctions List as part of initial and ongoing CDD.', section: 'cdd' },
    { num: 8, title: 'Report to AUSTRAC', icon: '📤', summary: 'File SMRs, TTRs, and IFTIs with AUSTRAC as required. Never tip off customers about reports.', section: 'reporting' },
    { num: 9, title: 'Keep records for 7 years', icon: '🗂️', summary: 'Retain all CDD, transaction, program, training, and reporting records for a minimum of 7 years.', section: 'record-keeping' },
    { num: 10, title: 'Train staff', icon: '🎓', summary: 'Conduct initial and annual AML/CTF training for all staff in relevant roles. Maintain training records.', section: 'training' },
  ],

  // ─── AUSTRAC LINKS ────────────────────────────────────────────────────────
  austracLinks: [
    // Starter Kit & Guidance Hub
    { category: 'Starter Kit & Guidance Hub', title: 'Real Estate Guidance (main page)', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance', desc: 'AUSTRAC\'s main guidance hub for real estate sector obligations.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Real Estate Program Starter Kit', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit', desc: 'The official starter kit — use this as your primary resource for building your AML/CTF program.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Getting Started with the Starter Kit', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/real-estate-program-starter-kit-getting-started', desc: 'How to get started with AUSTRAC\'s real estate program starter kit.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 1: Customise Your Program', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-1-customise-your-real-estate-program-using-starter-kit', desc: 'How to customise the starter kit for your specific business.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 2: Use Your Program', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program', desc: 'How to use your AML/CTF program day-to-day, including CDD and reporting.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 3: Maintain and Review', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-3-maintain-and-review-your-real-estate-program', desc: 'AUSTRAC guidance on ongoing program maintenance and review obligations.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Starter Kit Document Library', url: 'https://www.austrac.gov.au/reforms/program-starter-kits/real-estate-guidance/real-estate-program-starter-kit/real-estate-program-starter-kit-document-library', desc: 'All template documents from the starter kit in one place.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Examples of Dealing with Customers', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit-examples-dealing-customers', desc: 'AUSTRAC worked examples for low, medium, and high-risk customers.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Starter Kit Media Release (30 Jan 2026)', url: 'https://www.austrac.gov.au/news-and-media/media-release/austrac-backs-newly-regulated-sectors-release-amlctf-program-starter-kits', desc: 'AUSTRAC\'s announcement of the real estate program starter kit release.' },
    // Downloadable Templates
    { category: 'Downloadable Templates (Word)', title: 'Customise Guide (1.13 MB)', url: 'https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Customise%20guide%20-%20January%202026.docx', desc: 'Official Word template — customise this to set up your AML/CTF program.' },
    { category: 'Downloadable Templates (Word)', title: 'Risk Assessment Template (995 KB)', url: 'https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Risk%20assessment%20-%20January%202026.docx', desc: 'Official Word template for your ML/TF/PF risk assessment.' },
    { category: 'Downloadable Templates (Word)', title: 'Policy Document Template (1.07 MB)', url: 'https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Policy%20document%20-%20January%202026.docx', desc: 'Official Word template for your AML/CTF policy document.' },
    { category: 'Downloadable Templates (Word)', title: 'Process Document Template (977 KB)', url: 'https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Process%20document%20-%20January%202026.docx', desc: 'Official Word template for your AML/CTF process document.' },
    // Reform Guidance
    { category: 'Reform Guidance', title: 'Real Estate Services Reform Overview', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/before-you-start/new-industries-and-services-be-regulated-reform/real-estate-services-reform', desc: 'Overview of how the reforms specifically affect real estate businesses.' },
    { category: 'Reform Guidance', title: 'Summary of Obligations — Tranche 2', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/summary-amlctf-obligations-tranche-2-entities', desc: 'Summary of all AML/CTF obligations for newly regulated Tranche 2 entities.' },
    { category: 'Reform Guidance', title: 'Regulatory Expectations for Implementation', url: 'https://www.austrac.gov.au/austrac-regulatory-expectations-implementation-amlctf-reforms', desc: 'What AUSTRAC expects from newly regulated entities during implementation.' },
    { category: 'Reform Guidance', title: 'Risk Insights — Real Estate Suspicious Activity Indicators', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/risk-insights-and-indicators-suspicious-activity-real-estate-sector', desc: 'AUSTRAC\'s published red flag indicators and risk insights specific to the real estate sector.' },
    // Customer Due Diligence
    { category: 'Customer Due Diligence', title: 'Initial CDD — Individuals (Reform)', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-individuals-reform', desc: 'Detailed AUSTRAC guidance on conducting initial CDD for individual customers.' },
    { category: 'Customer Due Diligence', title: 'Initial CDD — Trusts (Reform)', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-trust-reform', desc: 'Detailed AUSTRAC guidance on conducting initial CDD for trust customers.' },
    { category: 'Customer Due Diligence', title: 'Enhanced CDD (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/enhanced-customer-due-diligence-reform', desc: 'AUSTRAC guidance on when and how to apply Enhanced Due Diligence.' },
    { category: 'Customer Due Diligence', title: 'Delayed Initial CDD (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform', desc: 'When and how you may delay CDD in real estate transactions.' },
    { category: 'Customer Due Diligence', title: 'CDD Before Providing a Designated Service', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service', desc: 'Guidance on the requirement to complete CDD before providing a service.' },
    { category: 'Customer Due Diligence', title: 'Reliance Under CDD Arrangements (Reform)', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform', desc: 'When and how you can rely on another party\'s CDD.' },
    { category: 'Customer Due Diligence', title: 'Beneficial Owners', url: 'https://www.austrac.gov.au/business/core-guidance/customer-identification-and-verification/beneficial-owners', desc: 'How to identify and verify beneficial owners of entities.' },
    // Governance & Personnel
    { category: 'Governance & Personnel', title: 'AML/CTF Compliance Officer (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/amlctf-compliance-officer-reform', desc: 'AUSTRAC guidance on appointing and notifying your compliance officer.' },
    { category: 'Governance & Personnel', title: 'Personnel Due Diligence & Training (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/identifying-personnel-roles-require-due-diligence-and-training-reform', desc: 'Who requires due diligence and training, and what is required.' },
    // Reporting
    { category: 'Reporting', title: 'Reporting to AUSTRAC (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform', desc: 'Overview of all reporting obligations for Tranche 2 entities.' },
    { category: 'Reporting', title: 'Suspicious Matter Reports (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/suspicious-matter-reports-reform', desc: 'When and how to file Suspicious Matter Reports.' },
    { category: 'Reporting', title: 'Threshold Transaction Reports (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/threshold-transaction-reports-reform', desc: 'When and how to file Threshold Transaction Reports for physical cash.' },
    { category: 'Reporting', title: 'AUSTRAC Online (Enrolment & Reporting)', url: 'https://online.austrac.gov.au', desc: 'The AUSTRAC Online portal — where you enrol and file reports (SMRs, TTRs, IFTIs, Annual Reports).' },
    // External References
    { category: 'External References', title: 'DFAT Consolidated Sanctions List', url: 'https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list', desc: 'The Australian Government\'s list of persons and entities subject to targeted financial sanctions. Check this for every customer.' },
    { category: 'External References', title: 'Money Laundering National Risk Assessment 2024', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/money-laundering-australia-national-risk-assessment-2024', desc: 'AUSTRAC\'s 2024 assessment rating real estate as HIGH risk for money laundering.' },
  ],

  // ─── RISK QUESTIONS ───────────────────────────────────────────────────────
  riskQuestions: {
    customer: [
      { id: 'rc1', text: 'Do you deal with customers you have never met face-to-face?', risk: 'high', reason: 'Identity verification is harder for non-face-to-face customers.' },
      { id: 'rc2', text: 'Do you deal with foreign buyers or sellers?', risk: 'high', reason: 'Foreign customers introduce additional jurisdiction and identity verification risk.' },
      { id: 'rc3', text: 'Do you transact with trusts, companies, or complex legal structures?', risk: 'high', reason: 'Complex structures may obscure beneficial ownership.' },
      { id: 'rc4', text: 'Do you deal with Politically Exposed Persons (PEPs) or their associates?', risk: 'high', reason: 'PEPs carry higher risk of corruption and bribery exposure.' },
      { id: 'rc5', text: 'Do you have customers where the source of wealth is unclear?', risk: 'high', reason: 'Unexplained wealth is a key proceeds-of-crime indicator.' },
      { id: 'rc6', text: 'Do you deal with customers who are reluctant to provide identification?', risk: 'high', reason: 'Reluctance to provide ID may indicate identity concealment.' },
      { id: 'rc7', text: 'Do you deal with professional investors or high-net-worth individuals?', risk: 'medium', reason: 'Larger transaction values increase the attractiveness for money laundering.' },
      { id: 'rc8', text: 'Do you have many one-off or short-term customer relationships?', risk: 'high', reason: 'Less opportunity for ongoing monitoring of customer behaviour.' },
    ],
    service: [
      { id: 'rs1', text: 'Do you handle residential property sales?', risk: 'medium', reason: 'Residential property is the most common ML vehicle in real estate.' },
      { id: 'rs2', text: 'Do you handle commercial or industrial property?', risk: 'medium', reason: 'Higher values and complex structures increase ML risk.' },
      { id: 'rs3', text: 'Do you handle off-the-plan sales?', risk: 'high', reason: 'Time gap between contract and settlement creates layering opportunity.' },
      { id: 'rs4', text: 'Do you sell house-and-land packages directly to customers?', risk: 'high', reason: 'Developer direct sales without independent agents carry higher risk.' },
      { id: 'rs5', text: 'Do you handle property valued above $5 million?', risk: 'high', reason: 'High-value transactions are more attractive for large-scale money laundering.' },
      { id: 'rs6', text: 'Do you handle auction sales?', risk: 'medium', reason: 'Compressed due diligence timeframes at auctions can create challenges.' },
    ],
    delivery: [
      { id: 'rd1', text: 'Are any of your transactions conducted entirely online or remotely?', risk: 'high', reason: 'Non-face-to-face verification is more challenging.' },
      { id: 'rd2', text: 'Do you use third-party agents, introducers, or referral partners?', risk: 'high', reason: 'Reliance on third parties for CDD introduces additional risk.' },
      { id: 'rd3', text: 'Do customers interact through intermediaries (lawyers, accountants) rather than directly?', risk: 'medium', reason: 'Layered relationships can obscure the true customer identity.' },
      { id: 'rd4', text: 'Do you accept instructions via email or messaging without in-person contact?', risk: 'high', reason: 'Digital-only contact makes identity verification more difficult.' },
    ],
    geographic: [
      { id: 'rg1', text: 'Do you deal with buyers or sellers from countries identified as high-risk by FATF?', risk: 'high', reason: 'FATF grey/blacklisted jurisdictions are subject to enhanced scrutiny.' },
      { id: 'rg2', text: 'Do funds for your transactions originate from overseas?', risk: 'high', reason: 'International fund flows carry higher ML risk.' },
      { id: 'rg3', text: 'Do your customers have no apparent connection to the area where the property is located?', risk: 'medium', reason: 'Lack of geographic connection is an ML indicator.' },
      { id: 'rg4', text: 'Do you deal with customers from countries with weak AML/CTF frameworks?', risk: 'high', reason: 'Regulatory arbitrage — exploiting weaker AML regimes.' },
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
