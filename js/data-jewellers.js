// AMLiq — Jewellers & Precious Goods Dealers — Static Data
// All content sourced from publicly available AUSTRAC materials
// localStorage prefix: amliq_jewl_

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
    { term: 'Designated Service', definition: 'A specific type of service captured by the AML/CTF Act. For jewellers, this is buying or selling precious metals, stones, or products for $10,000 or more in physical currency or virtual assets.' },
    { term: 'DFAT Consolidated List', definition: 'The Australian Government Department of Foreign Affairs and Trade\'s list of persons and entities subject to targeted financial sanctions.' },
    { term: 'EDD', definition: 'Enhanced Due Diligence — additional, more rigorous checks required when a customer or transaction presents higher ML/TF/PF risk.' },
    { term: 'FATF', definition: 'Financial Action Task Force — the international body that sets global AML/CTF standards and evaluates countries\' compliance.' },
    { term: 'FATF Black List', definition: 'Countries with serious strategic deficiencies in their AML/CTF frameworks — considered high-risk jurisdictions (e.g., North Korea, Iran).' },
    { term: 'FATF Grey List', definition: 'Countries with strategic deficiencies in their AML/CTF frameworks that are under increased monitoring by FATF.' },
    { term: 'Gemstone Pipeline', definition: 'The journey a gemstone takes from extraction to final product — can hide origin, value, and ownership at each stage.' },
    { term: 'Governing Body', definition: 'The board of directors, partners, trustees, or senior management responsible for oversight and governance of the business.' },
    { term: 'IFTI', definition: 'International Fund Transfer Instruction — a report required when you are involved in sending or receiving international electronic fund transfers.' },
    { term: 'Independent Evaluation', definition: 'A review of the AML/CTF program by someone independent of the program (i.e., not the compliance officer or program designer). Required at least once every 3 years.' },
    { term: 'KYC', definition: 'Know Your Customer — another term for Customer Due Diligence (CDD). The process of verifying who your customers are.' },
    { term: 'Linked Transactions', definition: 'Multiple transactions that are connected (e.g., by customer, invoice, date, or purpose) and counted together towards the $10,000 threshold. Includes lay-by, instalments, and same-day cumulative purchases.' },
    { term: 'ML/TF/PF', definition: 'Money Laundering / Terrorism Financing / Proliferation Financing — the three primary risks that the AML/CTF regime is designed to address.' },
    { term: 'Money Laundering', definition: 'The process by which criminals disguise the origins of illegally obtained money to make it appear legitimate.' },
    { term: 'PEP', definition: 'Politically Exposed Person — someone who holds or has held a prominent public position (domestically or internationally), or is a family member or close associate of such a person.' },
    { term: 'PF', definition: 'Proliferation Financing — the act of providing funds or financial services to support the development, production, or acquisition of weapons of mass destruction.' },
    { term: 'Physical Currency', definition: 'Banknotes and coins (Australian or foreign). Does NOT include electronic transfers, cheques, or card payments.' },
    { term: 'Precious Metals', definition: 'Gold, silver, platinum, iridium, osmium, palladium, rhodium, ruthenium, or an alloy with at least 2% weight of any of these (manufactured or unmanufactured).' },
    { term: 'Precious Products', definition: 'Items made of, containing, or having attached precious metals or stones: jewellery, watches, items of personal adornment, goldsmith/silversmith wares.' },
    { term: 'Precious Stones', definition: 'Substances of gem quality with market-recognised beauty, rarity and value — including beryl, corundum, diamond, garnet, jadeite jade, opal, pearl, topaz (natural, synthetic, or man-made).' },
    { term: 'Reporting Entity', definition: 'A business that provides designated services under the AML/CTF Act and therefore has compliance obligations including enrolment, CDD, and reporting.' },
    { term: 'Scrap Jewellery', definition: 'Previously used or broken jewellery bought for its metal or stone value — higher ML risk as source is difficult to trace.' },
    { term: 'SMR', definition: 'Suspicious Matter Report — a report filed with AUSTRAC when you suspect, on reasonable grounds, that a transaction or activity may involve money laundering, terrorism financing, or another offence.' },
    { term: 'Source of Funds', definition: 'Where the money for a specific transaction is coming from (e.g., savings, business income, sale of assets).' },
    { term: 'Source of Wealth', definition: 'How the customer accumulated their overall net worth or assets (e.g., business income, employment, investments).' },
    { term: 'Structuring', definition: 'The criminal act of breaking up cash transactions into smaller amounts below the $10,000 threshold to avoid reporting obligations.' },
    { term: 'TFS', definition: 'Targeted Financial Sanctions — sanctions imposed under Australian law (and UN Security Council resolutions) against specific individuals and entities. It is illegal to provide services to sanctioned persons.' },
    { term: 'Tipping Off', definition: 'The criminal act of disclosing to a customer (or any other person) that you have filed, or intend to file, a Suspicious Matter Report (SMR) about them.' },
    { term: 'Tranche 2', definition: 'The second wave of Australian AML/CTF reforms, extending obligations to jewellers, real estate agents, lawyers, accountants, and other professional services — effective 1 July 2026.' },
    { term: 'TTR', definition: 'Threshold Transaction Report — a report filed with AUSTRAC when you receive $10,000 or more in physical currency (banknotes and coins) in a single transaction.' },
    { term: 'Virtual Assets', definition: 'Digital assets such as cryptocurrency that can be used for payment. Transactions in virtual assets at or above $10,000 trigger AML/CTF obligations for jewellers.' },
  ],

  // ─── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "I'm a jeweller who only accepts credit cards and bank transfers. Am I regulated?",
      a: 'No. If you never accept physical currency (cash) or virtual assets (cryptocurrency) as payment, you are not providing a designated service under these reforms (Option 1). You have no AML/CTF obligations for precious goods sales.',
      topics: ['enrolment', 'general'],
      source: 'AUSTRAC Regulation Options for Dealers in Precious Metals, Stones and Products'
    },
    {
      q: 'I sometimes accept small cash payments under $10,000. Am I regulated?',
      a: 'Potentially. While a single cash transaction under $10,000 does not trigger the designated service, you must monitor for linked or structured transactions that cumulatively reach $10,000 or more. If they do, you need an AML/CTF program. Consider adopting Option 2 policies to monitor for this risk.',
      topics: ['enrolment', 'general'],
      source: 'AUSTRAC Regulation Options for Dealers in Precious Metals, Stones and Products'
    },
    {
      q: 'What if a customer pays $5,000 in cash today and $5,000 in cash next week for the same purchase?',
      a: 'These are likely linked transactions. Once they exceed $10,000 cumulatively in physical currency or virtual assets, you are providing a designated service. You must complete CDD on the customer before or as soon as practicable after the linked transactions reach the threshold.',
      topics: ['cdd', 'general'],
      source: 'AUSTRAC Precious Metals, Stones and Products Services (Reform)'
    },
    {
      q: 'Can I avoid regulation by telling customers to pay by bank transfer instead of cash?',
      a: 'Yes, for legitimate customers — redirecting them to electronic payment means you are not providing a designated service. However, if you already suspect criminal activity, redirecting to bank transfer does NOT remove your obligation to file an SMR if suspicion has already formed, and could make you complicit.',
      topics: ['reporting', 'general'],
      source: 'AUSTRAC Regulation Options for Dealers in Precious Metals, Stones and Products'
    },
    {
      q: 'Do watches count as precious products?',
      a: 'Yes, if they contain precious metals or precious stones. For example, a stainless-steel watch with diamonds set on the face is a precious product. A plain stainless-steel watch with no precious metals or stones is NOT a precious product.',
      topics: ['general'],
      source: 'AUSTRAC Precious Metals, Stones and Products Services (Reform)'
    },
    {
      q: 'Is a gold-plated item a precious product?',
      a: 'Only if it contains precious metals at or above the defined threshold — an alloy with at least 2% weight of gold, silver, platinum, or other precious metals. Thin gold plating on a base metal item may not meet this threshold.',
      topics: ['general'],
      source: 'AUSTRAC Precious Metals, Stones and Products Services (Reform)'
    },
    {
      q: 'What about costume jewellery?',
      a: 'Costume jewellery that contains NO precious metals or precious stones is NOT a precious product under the AML/CTF Act and is NOT regulated, regardless of its sale price or payment method.',
      topics: ['general'],
      source: 'AUSTRAC Precious Metals, Stones and Products Services (Reform)'
    },
    {
      q: "I'm a bullion dealer. Does this guidance apply to me?",
      a: 'No. Bullion dealing is a separate designated service regulated independently under the AML/CTF Act. This guidance is specifically for dealers in precious metals, stones, and products (jewellers). Refer to AUSTRAC\'s bullion dealer guidance for your obligations.',
      topics: ['general'],
      source: 'AUSTRAC Precious Metals, Stones and Products Services (Reform)'
    },
    {
      q: "What if I suspect money laundering but I'm not sure?",
      a: "You don't need to be certain. If you have suspicion on reasonable grounds, you should file a Suspicious Matter Report (SMR) with AUSTRAC. The threshold is suspicion — not proof. AUSTRAC would rather receive reports that turn out to be unfounded than miss genuine suspicious activity.",
      topics: ['reporting'],
      source: 'AUSTRAC Suspicious Matter Reports (Reform)'
    },
    {
      q: 'What are the penalties for non-compliance?',
      a: 'Non-compliance with the AML/CTF Act carries significant civil and criminal penalties. AUSTRAC has stated it will focus enforcement on entities that fail to enrol or make no meaningful compliance effort. For newly regulated sectors, AUSTRAC has committed to a proportionate, risk-based approach to enforcement.',
      topics: ['general'],
      source: 'AUSTRAC Regulatory Expectations for Implementation'
    },
    {
      q: 'How much does it cost to enrol with AUSTRAC?',
      a: 'Enrolment with AUSTRAC is free. There is no fee to enrol as a reporting entity. You can enrol through AUSTRAC Online.',
      topics: ['enrolment'],
      source: 'AUSTRAC enrolment guidance'
    },
    {
      q: 'A customer wants to buy $50,000 worth of loose diamonds with cash. What do I do?',
      a: 'This is an automatic HIGH risk transaction — $50,000+ in physical currency for easily transportable, high-value items. You must escalate to your AML/CTF compliance officer immediately. Enhanced Due Diligence (EDD) is required, including source of funds and source of wealth checks. If the customer cannot satisfactorily explain the source of funds, you may need to file an SMR and consider refusing the transaction.',
      topics: ['cdd', 'reporting'],
      source: 'AUSTRAC Jeweller Program Starter Kit — Examples of Dealing with Customers'
    },
    {
      q: 'Are scrap metal dealers always high risk?',
      a: "AUSTRAC identifies scrap metal/jewellery dealers as a higher-risk customer type because it is difficult to trace the origin of scrap jewellery. Scrap could be stolen goods or proceeds of crime. When buying scrap from these dealers, consider applying Enhanced Due Diligence measures.",
      topics: ['cdd'],
      source: 'AUSTRAC Risk Insights for Dealers in Precious Stones, Metals and Other Products'
    },
    {
      q: 'Do I need to screen every cash customer for sanctions?',
      a: 'Yes — PEP and Targeted Financial Sanctions (TFS) screening is part of initial Customer Due Diligence for every customer in a regulated transaction (i.e., a transaction involving $10,000+ in physical currency or virtual assets). You must check the DFAT Consolidated Sanctions List.',
      topics: ['cdd'],
      source: 'AUSTRAC Jeweller Program Starter Kit'
    },
    {
      q: 'Can I outsource my AML/CTF program?',
      a: 'You can use external consultants to help build your program and you can appoint an external AML/CTF compliance officer. However, you (or your business) remain ultimately responsible for compliance. You cannot outsource accountability.',
      topics: ['general'],
      source: 'AUSTRAC AML/CTF Compliance Officer (Reform)'
    },
  ],

  // ─── OBLIGATIONS ──────────────────────────────────────────────────────────
  obligations: [
    { num: 1, title: 'Determine your regulation option', icon: '🔍', summary: 'Choose from 4 AUSTRAC regulation options based on your business model — from exempt (Option 1) to full program (Option 4).', section: 'am-i-regulated' },
    { num: 2, title: 'Enrol with AUSTRAC', icon: '✅', summary: 'Enrol as a reporting entity within 28 days of first providing a designated service. Latest: 29 July 2026.', section: 'enrolment' },
    { num: 3, title: 'Appoint a compliance officer', icon: '👤', summary: 'Appoint an AML/CTF compliance officer at management level who is an Australian resident and fit and proper person.', section: 'governance' },
    { num: 4, title: 'Conduct a risk assessment', icon: '⚠️', summary: 'Assess your ML/TF/PF risks across customer, service/product, delivery channel, and geographic categories.', section: 'risk-assessment' },
    { num: 5, title: 'Develop an AML/CTF program', icon: '🏗️', summary: 'Document your policies, processes, and controls for managing AML/CTF risks. Must be approved by senior management.', section: 'program-builder' },
    { num: 6, title: 'Establish transaction detection systems', icon: '💰', summary: 'Set up systems to detect regulated transactions ($10,000+ in cash/virtual assets) including linked transactions.', section: 'cdd' },
    { num: 7, title: 'Conduct initial CDD', icon: '🪪', summary: 'Identify and verify customers before providing any designated service. Applies to individuals, companies, trusts, and partnerships.', section: 'cdd' },
    { num: 8, title: 'Conduct ongoing CDD', icon: '🔄', summary: 'Monitor customer relationships throughout the engagement and keep customer information up to date.', section: 'cdd' },
    { num: 9, title: 'Screen for PEPs and sanctions', icon: '🔎', summary: 'Screen all customers against PEP lists and the DFAT Consolidated Sanctions List. Foreign PEPs are always high-risk.', section: 'cdd' },
    { num: 10, title: 'Report to AUSTRAC', icon: '📤', summary: 'File SMRs (suspicion), TTRs ($10,000+ cash), and annual compliance reports. Never tip off customers about reports.', section: 'reporting' },
    { num: 11, title: 'Keep records for 7 years', icon: '🗂️', summary: 'Retain all CDD, transaction, program, training, and reporting records for a minimum of 7 years.', section: 'record-keeping' },
    { num: 12, title: 'Train staff', icon: '🎓', summary: 'Conduct initial and annual AML/CTF training for all staff. Include transaction detection, red flags, and tipping-off.', section: 'training' },
  ],

  // ─── RED FLAGS ─────────────────────────────────────────────────────────────
  redFlags: [
    // Category 1: Customer Behaviour
    { id: 'rf1', category: 'customerBehaviour', severity: 'amber', title: 'Customer tries to avoid KYC processes', detail: 'Reluctant to provide identification or complete CDD forms. Makes excuses, provides documents that don\'t match other information, or refuses verification requests.' },
    { id: 'rf2', category: 'customerBehaviour', severity: 'amber', title: 'Customer seeks unusual degree of anonymity', detail: 'Wants to transact without providing personal details. May use intermediaries or third parties to shield identity.' },
    { id: 'rf3', category: 'customerBehaviour', severity: 'red', title: 'Customer uses cash to buy precious goods', detail: 'Physical currency is a major ML risk factor for precious goods. Transactions of $50,000+ in cash are automatic high-risk.' },
    { id: 'rf4', category: 'customerBehaviour', severity: 'red', title: 'Customer uses or includes a third party in transactions', detail: 'Layering to obscure the true buyer. A third party not enrolled with AUSTRAC representing the customer is a medium risk factor.' },
    { id: 'rf5', category: 'customerBehaviour', severity: 'amber', title: 'Customer quickly sells products or re-sells to dealer', detail: 'Rapid buy-sell pattern may indicate use of precious goods to launder money — converting cash to goods and back to funds.' },
    { id: 'rf6', category: 'customerBehaviour', severity: 'amber', title: 'Customer appears to be working for a third party', detail: 'May be a "cleanskin" acting on behalf of criminals. Someone with no criminal record used as a front for illicit purchases.' },
    { id: 'rf7', category: 'customerBehaviour', severity: 'amber', title: 'Customer doesn\'t understand precious goods industry', detail: 'Not interested in product quality, craftsmanship, or features — just wants "something worth $X". Buying to store value rather than for genuine interest.' },

    // Category 2: Customer Profile
    { id: 'rf8', category: 'customerProfile', severity: 'red', title: 'Subject to negative media reports linked to criminal activity', detail: 'Adverse media linking the customer to profit-generating crime, fraud, corruption, drug trafficking, or other criminal activity.' },
    { id: 'rf9', category: 'customerProfile', severity: 'red', title: 'Is a PEP or closely linked to one', detail: 'Foreign PEPs must always be treated as high-risk customers. Domestic PEPs and international organisation PEPs are medium-risk factors.' },
    { id: 'rf10', category: 'customerProfile', severity: 'amber', title: 'Frequently changes bank details, addresses, or business names', detail: 'Pattern of identity concealment. Regular changes to contact or financial details without clear reason.' },
    { id: 'rf11', category: 'customerProfile', severity: 'amber', title: 'Makes high-volume purchases', detail: 'Unusual buying pattern inconsistent with stated occupation or business. Multiple large purchases over a short period.' },
    { id: 'rf12', category: 'customerProfile', severity: 'amber', title: 'Business doesn\'t usually deal in precious goods', detail: 'Customer\'s stated occupation or business is inconsistent with purchasing precious metals, stones, or products.' },
    { id: 'rf13', category: 'customerProfile', severity: 'red', title: 'From a high-risk country for ML, corruption, or terrorism', detail: 'Customer is from a FATF grey/blacklist jurisdiction, tax haven, or secrecy jurisdiction.' },

    // Category 3: Service/Transaction Risk
    { id: 'rf14', category: 'serviceTransactionRisk', severity: 'red', title: 'Large cash payments ($50,000+)', detail: 'Automatic high-risk trigger per AUSTRAC risk table. Physical currency transactions of $50,000+ for precious goods require immediate escalation to compliance officer.' },
    { id: 'rf15', category: 'serviceTransactionRisk', severity: 'red', title: 'Unknown source of wealth or funds', detail: 'Customer unable to explain where funds come from. Low income doesn\'t support the purchase value. Cannot provide supporting documentation.' },
    { id: 'rf16', category: 'serviceTransactionRisk', severity: 'amber', title: 'Unusual level of knowledge about AML/CTF requirements', detail: 'Customer asks detailed questions about reporting thresholds or CDD processes. May be attempting to circumvent controls.' },
    { id: 'rf17', category: 'serviceTransactionRisk', severity: 'red', title: 'Payments structured below $10,000 threshold', detail: 'Possible structuring — breaking cash payments into amounts under $10,000 to avoid TTR reporting. This is a criminal offence.' },
    { id: 'rf18', category: 'serviceTransactionRisk', severity: 'amber', title: 'Unusual transaction methods', detail: 'Payment methods that don\'t match normal business practices. Mix of cash and virtual assets. Unusual payment arrangements.' },
    { id: 'rf19', category: 'serviceTransactionRisk', severity: 'amber', title: 'Transaction doesn\'t match customer profile', detail: 'Inconsistent with customer\'s known income, occupation, or business. A low-income individual purchasing high-value items.' },
    { id: 'rf20', category: 'serviceTransactionRisk', severity: 'red', title: 'Complex company ownership structure used', detail: 'Multiple layers of companies, trusts, or partnerships used to hide beneficial ownership. No clear commercial rationale.' },
    { id: 'rf21', category: 'serviceTransactionRisk', severity: 'red', title: 'Purchasing loose precious stones (especially diamonds)', detail: 'Easily transportable, retain value, and are difficult to trace. AUSTRAC identifies loose diamonds as particularly high-risk.' },
    { id: 'rf22', category: 'serviceTransactionRisk', severity: 'amber', title: 'Purchasing items easily melted, refined, or reshaped', detail: 'Gold bars, scrap metals, unmanufactured precious metals — easily transformed to hide origin and ownership.' },

    // Category 4: Delivery Channel Risk
    { id: 'rf23', category: 'deliveryChannelRisk', severity: 'amber', title: 'Customer avoids face-to-face meetings', detail: 'Prefers remote transactions to avoid identification. Non-face-to-face verification is more challenging.' },
    { id: 'rf24', category: 'deliveryChannelRisk', severity: 'amber', title: 'Customer insists on online identity verification only', detail: 'Avoids in-person document checks. May be using fraudulent or stolen identity documents.' },
    { id: 'rf25', category: 'deliveryChannelRisk', severity: 'amber', title: 'Customer reluctant to provide identity or financial details', detail: 'Evasive during CDD process. Gives incomplete answers or delays providing required information.' },
    { id: 'rf26', category: 'deliveryChannelRisk', severity: 'amber', title: 'Customer nervous during CDD process', detail: 'May indicate deception. Appears anxious, provides rehearsed answers, or shows discomfort when asked about transaction details.' },
    { id: 'rf27', category: 'deliveryChannelRisk', severity: 'amber', title: 'Customer engages through a third party with no clear reason', detail: 'Unnecessary intermediary layering. A third party not enrolled with AUSTRAC is a medium risk factor.' },

    // Category 5: Foreign Jurisdiction Risk
    { id: 'rf28', category: 'foreignJurisdictionRisk', severity: 'red', title: 'Customer from a high-risk jurisdiction for ML, corruption, or terrorism', detail: 'FATF grey/blacklist countries. Jurisdictions with weak AML/CTF frameworks or known for significant organised crime.' },
    { id: 'rf29', category: 'foreignJurisdictionRisk', severity: 'red', title: 'Customer from a tax haven or secrecy jurisdiction', detail: 'Financial opacity risk. Jurisdictions that offer banking secrecy or low transparency make it harder to verify source of funds.' },
    { id: 'rf30', category: 'foreignJurisdictionRisk', severity: 'amber', title: 'Customer lives or works far from the jeweller\'s location', detail: 'No apparent connection to the area. Cannot explain why they specifically want to purchase from this particular business.' },
    { id: 'rf31', category: 'foreignJurisdictionRisk', severity: 'amber', title: 'Imported scrap material with unclear origin', detail: 'Difficult to trace the true source of imported scrap jewellery or precious metals. May be stolen or linked to criminal activity.' },
    { id: 'rf32', category: 'foreignJurisdictionRisk', severity: 'red', title: 'Gemstone pipeline complexity', detail: 'Multiple intermediaries across countries hide origin, owner, and value of precious stones at each stage of the pipeline.' },
  ],

  // ─── QUIZ QUESTIONS ────────────────────────────────────────────────────────
  quiz: [
    {
      id: 1,
      question: 'A customer wants to buy a gold necklace worth $12,000 and pay entirely in cash. What must you do?',
      options: [
        'Accept the cash and proceed normally',
        'Refuse the cash payment',
        'Complete CDD on the customer, accept the cash, and file a TTR with AUSTRAC within 10 business days',
        'Call the police'
      ],
      answer: 2,
      explanation: 'A cash transaction of $10,000+ triggers a designated service. You must conduct CDD on the customer and file a Threshold Transaction Report (TTR) with AUSTRAC within 10 business days.'
    },
    {
      id: 2,
      question: 'A customer wants to buy loose diamonds worth $8,000 in cash today and $8,000 in cash tomorrow. Are these linked transactions?',
      options: [
        'No — each transaction is under $10,000',
        'Yes — these transactions appear linked and collectively exceed $10,000, triggering a designated service'
      ],
      answer: 1,
      explanation: 'These are likely linked transactions — same customer, close in time, for the same type of product. Once they exceed $10,000 cumulatively in cash/virtual assets, you are providing a designated service and must complete CDD.'
    },
    {
      id: 3,
      question: 'You file an SMR about a customer. Can you tell the customer about it?',
      options: [
        'Yes, they have a right to know',
        'No — disclosing an SMR is a criminal offence (tipping off)',
        'Only if they ask directly',
        'Only if your manager approves'
      ],
      answer: 1,
      explanation: 'The tipping-off prohibition is a critical legal requirement. It is a criminal offence to disclose to a customer (or anyone else) that you have filed, or intend to file, an SMR.'
    },
    {
      id: 4,
      question: 'A customer approaches to buy $50,000 in gold with cash. You suspect the funds may be illicit. Can you just suggest they pay by bank transfer instead?',
      options: [
        'Yes — bank transfer avoids your AML/CTF obligations',
        'No — you must still file an SMR if you hold a suspicion. Diverting to bank transfer when suspicious could make you complicit.'
      ],
      answer: 1,
      explanation: 'AUSTRAC explicitly warns: accepting payment through alternative means when you hold a suspicion could make you complicit in criminal conduct. If you suspect ML/TF, you must file an SMR regardless of payment method.'
    },
    {
      id: 5,
      question: 'Your jewellery shop only accepts credit/debit cards and bank transfers — never cash or crypto. Do you have AML/CTF obligations?',
      options: [
        'Yes — all jewellers are regulated',
        'No — if you don\'t accept physical currency or virtual assets, you are not providing a designated service (Option 1)'
      ],
      answer: 1,
      explanation: 'If you never accept physical currency or virtual assets for precious goods sales, you are not providing a designated service and have no AML/CTF obligations (Regulation Option 1).'
    },
    {
      id: 6,
      question: 'A foreign government official wants to purchase $30,000 in jewellery with cash. What is their risk rating?',
      options: [
        'Low risk',
        'Medium risk',
        'High risk — foreign PEPs must always be treated as high-risk'
      ],
      answer: 2,
      explanation: 'AUSTRAC requires that foreign Politically Exposed Persons (PEPs) are always treated as high-risk customers. Enhanced Due Diligence must be applied, including source of funds and source of wealth checks.'
    },
    {
      id: 7,
      question: 'What is "structuring" in the context of AML/CTF?',
      options: [
        'Designing jewellery structures',
        'Breaking cash payments into amounts under $10,000 to avoid TTR reporting — this is a criminal offence'
      ],
      answer: 1,
      explanation: 'Structuring is the deliberate act of breaking cash payments into smaller amounts to stay below the $10,000 TTR threshold. It is a criminal offence under the AML/CTF Act and should trigger an SMR.'
    },
    {
      id: 8,
      question: 'A scrap metal dealer wants to sell you $15,000 worth of scrap gold jewellery for cash. What risk level does AUSTRAC assign?',
      options: [
        'Low risk',
        'Medium risk',
        'High risk — scrap metal dealers are identified as a high-risk customer type'
      ],
      answer: 2,
      explanation: 'AUSTRAC identifies scrap metal dealers as a high-risk customer type because the origin of scrap jewellery is difficult to trace. It could be stolen goods or proceeds of crime.'
    },
    {
      id: 9,
      question: 'How long must you keep CDD records?',
      options: [
        '1 year',
        '3 years',
        '5 years',
        '7 years'
      ],
      answer: 3,
      explanation: 'Under the AML/CTF Act, records must be kept for a minimum of 7 years from when the record was made or the business relationship ended (whichever is later).'
    },
    {
      id: 10,
      question: 'When must you file an SMR if the suspicion relates to terrorism financing?',
      options: [
        'Within 3 business days',
        'Within 10 business days',
        'Within 24 hours',
        'Within 30 days'
      ],
      answer: 2,
      explanation: 'SMRs relating to terrorism financing must be filed within 24 hours. For all other suspicious matters, the deadline is 3 business days.'
    },
    {
      id: 11,
      question: 'A customer buys a $15,000 bracelet with cash but doesn\'t seem interested in the quality or design — they just want "something worth $15,000". Is this a red flag?',
      options: [
        'No — customers can buy for any reason',
        'Yes — buying to store value rather than for genuine interest is a recognised ML indicator'
      ],
      answer: 1,
      explanation: 'AUSTRAC identifies customers who don\'t understand or have experience with precious goods as a risk factor. Buying to store value rather than for genuine interest in the product is a recognised money laundering indicator.'
    },
    {
      id: 12,
      question: 'Can you avoid AML/CTF regulation entirely as a jeweller?',
      options: [
        'No — all jewellers are automatically regulated',
        'Yes — by choosing not to accept physical currency or virtual assets for your sales (Option 1)'
      ],
      answer: 1,
      explanation: 'Unlike other Tranche 2 sectors, jewellers can avoid regulation entirely by choosing not to accept physical currency or virtual assets for transactions of $10,000 or more (Regulation Option 1).'
    },
    {
      id: 13,
      question: 'How often must an independent evaluation of your AML/CTF program be conducted?',
      options: [
        'Every year',
        'Every 2 years',
        'At least every 3 years'
      ],
      answer: 2,
      explanation: 'An independent evaluation is required at least once every 3 years. The evaluator must be independent of the program — not the compliance officer or anyone who designed it.'
    },
    {
      id: 14,
      question: 'A customer buys a $11,500 belt buckle containing gold and rubies plus $3,000 leather shoes in a single cash transaction. Is this a regulated transaction?',
      options: [
        'Yes — the total exceeds $10,000',
        'No — only the precious product ($11,500 belt buckle) counts, and mixed transactions only count the regulated items'
      ],
      answer: 0,
      explanation: 'The belt buckle containing gold and rubies is a precious product worth $11,500, which exceeds the $10,000 threshold. The leather shoes are not precious products and don\'t count towards the threshold, but the precious product alone triggers the designated service.'
    },
    {
      id: 15,
      question: 'Who must be appointed to oversee your AML/CTF program?',
      options: [
        'An external lawyer',
        'An AML/CTF compliance officer at management level who is an Australian resident and a fit and proper person',
        'A government inspector'
      ],
      answer: 1,
      explanation: 'The AML/CTF Act requires appointment of a compliance officer who is at management level, an Australian resident (if the business has a permanent establishment), and a fit and proper person. AUSTRAC must be notified within 14 days.'
    },
  ],

  // ─── CHECKLIST ITEMS ───────────────────────────────────────────────────────
  checklists: {
    riskAssessment: [
      { id: 'ra1', text: 'Identify the designated services your business provides', detail: 'Buying/selling precious metals, stones, or products for $10,000+ in physical currency or virtual assets.' },
      { id: 'ra2', text: 'Identify which items you sell/buy qualify as precious metals, stones, or products', detail: 'Review AUSTRAC definitions: precious metals (gold, silver, platinum, etc.), precious stones (diamonds, rubies, etc.), precious products (jewellery, watches, etc.).' },
      { id: 'ra3', text: 'Establish systems to detect regulated transactions (including linked transactions)', detail: 'Systems to detect $10,000+ in cash/virtual assets, including lay-by, instalments, and same-day cumulative purchases.' },
      { id: 'ra4', text: 'Assess ML/TF/PF risks across 4 categories', detail: 'Customer risk, service/product risk, delivery channel risk, and geographic/jurisdiction risk.' },
      { id: 'ra5', text: 'Document your risk appetite (what level of risk is acceptable)', detail: 'Explicitly state what level of ML/TF/PF risk your business is willing to accept.' },
      { id: 'ra6', text: 'Identify high-risk scenarios specific to your business', detail: 'Consider AUSTRAC\'s risk insights for precious goods dealers — loose diamonds, scrap dealers, cash $50,000+, virtual assets.' },
      { id: 'ra7', text: 'Consider AUSTRAC\'s risk insights for precious goods dealers', detail: 'AUSTRAC rates the retail jewellery sector as HIGH for money laundering risk. Precious goods are among the most at-risk.' },
      { id: 'ra8', text: 'Document risk mitigation controls for each identified risk', detail: 'For each risk, document what control you will implement (e.g., EDD for scrap dealers, enhanced monitoring for cash).' },
      { id: 'ra9', text: 'Have risk assessment approved by senior management / governing body', detail: 'The risk assessment must be formally approved. Document the date and who approved it.' },
      { id: 'ra10', text: 'Set a schedule to review the risk assessment (and define review triggers)', detail: 'Review at least annually or when business circumstances change (e.g., new payment methods, new customer types).' },
    ],
    governance: [
      { id: 'gov1', text: 'Appoint an AML/CTF compliance officer', detail: 'Must be at management level, an Australian resident, and a fit and proper person. For small jewellers, the owner may serve.' },
      { id: 'gov2', text: 'Ensure compliance officer meets eligibility requirements', detail: 'Management level (authority-based), Australian resident, fit and proper. External compliance officers are permitted.' },
      { id: 'gov3', text: 'Notify AUSTRAC of compliance officer appointment within 14 days', detail: 'After appointing a compliance officer, notify AUSTRAC within 14 days via AUSTRAC Online.' },
      { id: 'gov4', text: 'Define AML/CTF roles and responsibilities', detail: 'Document who is responsible for transaction detection, CDD, escalation, training, record keeping, and oversight.' },
      { id: 'gov5', text: 'Assign responsibilities to specific staff', detail: 'Use a roles assignment form to document each AML/CTF function and who performs it.' },
      { id: 'gov6', text: 'Establish governing body / senior management oversight', detail: 'Senior management must approve the AML/CTF program and receive regular compliance reports.' },
      { id: 'gov7', text: 'Set up compliance officer annual reporting to governing body', detail: 'The compliance officer should report to senior management at least annually on program effectiveness.' },
      { id: 'gov8', text: 'Conduct personnel due diligence on all staff in AML/CTF roles', detail: 'Identity verification, reference checks, police checks for compliance officer. Scalable for other roles.' },
    ],
    transactionDetection: [
      { id: 'td1', text: 'Establish systems to detect purchases/sales of $10,000+ in physical currency or virtual assets', detail: 'Clear process for identifying when a transaction reaches the $10,000 threshold.' },
      { id: 'td2', text: 'Establish systems to detect linked or structured transactions exceeding $10,000', detail: 'Monitor for lay-by, instalments, same-day cumulative, and split payments from same customer.' },
      { id: 'td3', text: 'Define what payment methods are accepted and any limits', detail: 'Document which payment methods your business accepts and any cash/virtual asset limits.' },
      { id: 'td4', text: 'Document process for referring physical currency transactions to store owner/manager', detail: 'Under the streamlined model (Option 3), sales staff refer cash transactions to the owner/manager.' },
      { id: 'td5', text: 'Create a process for determining if a transaction is regulated', detail: 'Step-by-step process to assess if a transaction meets the designated service criteria.' },
    ],
    cddProcedures: [
      { id: 'cdd1', text: 'Define initial CDD procedures for individual customers', detail: 'Step-by-step process for identifying and verifying individuals, including acceptable ID documents.' },
      { id: 'cdd2', text: 'Define streamlined CDD process for low/medium risk individuals (Option 3)', detail: 'Simplified process for individual customers paying in physical currency under the streamlined model.' },
      { id: 'cdd3', text: 'Define initial CDD procedures for company customers', detail: 'Process for verifying companies including ASIC checks and beneficial owner identification.' },
      { id: 'cdd4', text: 'Define initial CDD procedures for trust customers', detail: 'Trusts are high-risk. Comprehensive process for trustees, settlors, appointors, and beneficiaries.' },
      { id: 'cdd5', text: 'Define initial CDD procedures for partnership customers', detail: 'Process for verifying partnerships and all partners.' },
      { id: 'cdd6', text: 'Define initial CDD procedures for foreign customers', detail: 'Additional requirements including foreign document verification. Foreign PEPs always high-risk.' },
      { id: 'cdd7', text: 'Define beneficial owner identification procedures', detail: 'For entities, document how you will identify the natural persons who ultimately own or control the entity.' },
      { id: 'cdd8', text: 'Define PEP and TFS screening procedures', detail: 'Process for asking about PEP status and checking the DFAT Consolidated List for every customer.' },
      { id: 'cdd9', text: 'Define Enhanced Due Diligence (EDD) triggers and procedures', detail: 'Document when EDD is required: $50,000+ cash, foreign PEPs, scrap dealers, unclear source of funds.' },
      { id: 'cdd10', text: 'Define ongoing CDD procedures and monitoring frequency', detail: 'How you will monitor existing relationships and review customer information.' },
      { id: 'cdd11', text: 'Define procedures for when CDD cannot be completed', detail: 'Policy for declining or ceasing service when CDD cannot be satisfactorily completed.' },
      { id: 'cdd12', text: 'Define reliance arrangements (if relying on third parties for CDD)', detail: 'If relying on another party\'s CDD, document the arrangement and accountability.' },
      { id: 'cdd13', text: 'Document acceptable identity verification documents and methods', detail: 'Reference list of acceptable ID documents for individuals, companies, trusts, and partnerships.' },
    ],
    monitoring: [
      { id: 'mon1', text: 'Establish process for monitoring transactions for suspicious indicators', detail: 'Document how and by whom transactions will be monitored for red flags.' },
      { id: 'mon2', text: 'Document AUSTRAC\'s red flag indicators for precious goods dealers', detail: 'Incorporate all 5 categories of red flags into your procedures (customer behaviour, profile, service/transaction, delivery channel, jurisdiction).' },
      { id: 'mon3', text: 'Define internal escalation process (staff → compliance officer → report)', detail: 'Step-by-step process for escalating suspicious activity concerns.' },
      { id: 'mon4', text: 'Assign responsibility for transaction monitoring', detail: 'Specify which staff are responsible for monitoring and how concerns should be escalated.' },
      { id: 'mon5', text: 'Create a suspicious activity log template', detail: 'Standard form for documenting suspicious activity observations, including date, customer, concern, and action.' },
    ],
    reporting: [
      { id: 'rep1', text: 'Establish procedure for filing Suspicious Matter Reports (SMRs)', detail: 'Internal process for deciding whether to file an SMR and the steps for filing via AUSTRAC Online.' },
      { id: 'rep2', text: 'Define SMR timeframes (24 hours for terrorism, 3 business days for other)', detail: 'Ensure staff know the filing deadlines and the process for urgent terrorism-related reports.' },
      { id: 'rep3', text: 'Establish procedure for Threshold Transaction Reports (TTRs)', detail: 'Process for identifying and filing TTRs for physical cash receipts of $10,000 or more.' },
      { id: 'rep4', text: 'Define TTR timeframe (10 business days)', detail: 'TTRs must be filed within 10 business days of the transaction.' },
      { id: 'rep5', text: 'Document the tipping-off prohibition and train staff on it', detail: 'All staff must understand they must not disclose an SMR to the customer. This is a criminal offence.' },
      { id: 'rep6', text: 'Set up access to AUSTRAC Online for report filing', detail: 'Ensure your compliance officer has access to AUSTRAC Online (online.austrac.gov.au).' },
      { id: 'rep7', text: 'Establish internal escalation flowchart', detail: 'Visual diagram showing the path from staff observation to compliance officer to AUSTRAC report.' },
    ],
    recordKeeping: [
      { id: 'rk1', text: 'Define what records to keep (CDD, transactions, program, training, reports)', detail: 'Comprehensive list of all records to retain under the AML/CTF Act.' },
      { id: 'rk2', text: 'Establish 7-year retention policy', detail: 'All AML/CTF records must be kept for a minimum of 7 years.' },
      { id: 'rk3', text: 'Define secure storage method (digital and/or physical)', detail: 'Specify how records will be stored with protection against unauthorised access, loss, or damage.' },
      { id: 'rk4', text: 'Ensure records are retrievable within a reasonable timeframe', detail: 'Records must be accessible if AUSTRAC requests them.' },
      { id: 'rk5', text: 'Confirm storage complies with privacy obligations', detail: 'Ensure record storage complies with the Australian Privacy Principles.' },
    ],
    training: [
      { id: 'tr1', text: 'Develop AML/CTF training content for staff', detail: 'Cover ML/TF/PF awareness, transaction detection, CDD, red flags, reporting, tipping-off, record keeping, and payment diversion.' },
      { id: 'tr2', text: 'Schedule initial training before 1 July 2026', detail: 'All relevant staff should receive initial training before obligations commence.' },
      { id: 'tr3', text: 'Plan ongoing refresher training (at least annually)', detail: 'Training should be refreshed at least annually, or more frequently when the program changes.' },
      { id: 'tr4', text: 'Include linked transaction detection in training', detail: 'Staff must be trained to recognise linked/structured transactions (lay-by, instalments, same-day cumulative).' },
      { id: 'tr5', text: 'Include payment diversion warning in training', detail: 'Train staff that redirecting a suspicious customer to bank transfer does NOT resolve reporting obligations.' },
      { id: 'tr6', text: 'Maintain training attendance and completion records', detail: 'Keep records of who attended, when, what was covered, and assessment results. Retain for 7 years.' },
    ],
    evaluation: [
      { id: 'ev1', text: 'Plan for independent evaluation of AML/CTF program', detail: 'Required at least every 3 years. Begin planning who will conduct it and what it will cover.' },
      { id: 'ev2', text: 'Schedule first evaluation (required at least every 3 years)', detail: 'Set a date for the first independent evaluation.' },
      { id: 'ev3', text: 'Identify who will conduct the evaluation (must be independent)', detail: 'Must be independent of the program — not the compliance officer or program designer.' },
      { id: 'ev4', text: 'Document how adverse findings will be addressed', detail: 'Specify how you will respond to and remediate any adverse findings.' },
    ],
    seniorApproval: [
      { id: 'sa1', text: 'Present completed AML/CTF program to senior management / governing body', detail: 'The full program should be presented to senior management for approval.' },
      { id: 'sa2', text: 'Obtain formal approval (documented sign-off)', detail: 'Senior management approval must be documented with date, approver name, and position.' },
      { id: 'sa3', text: 'Ensure program is accessible to all relevant staff', detail: 'Once approved, make the program available to all staff who need to implement it.' },
    ],
  },

  // ─── RISK QUESTIONS ────────────────────────────────────────────────────────
  riskQuestions: {
    customer: [
      { id: 'rc1', text: 'Do you deal with customers you have never met face-to-face?', risk: 'high', reason: 'Identity verification is harder for non-face-to-face customers.' },
      { id: 'rc2', text: 'Do you deal with foreign buyers or sellers?', risk: 'high', reason: 'Foreign customers introduce additional jurisdiction and identity verification risk.' },
      { id: 'rc3', text: 'Do you transact with companies, trusts, or complex legal structures?', risk: 'high', reason: 'Complex structures may obscure beneficial ownership.' },
      { id: 'rc4', text: 'Do you deal with Politically Exposed Persons (PEPs) or their associates?', risk: 'high', reason: 'PEPs carry higher risk of corruption and bribery exposure. Foreign PEPs must always be treated as high-risk.' },
      { id: 'rc5', text: 'Do you have customers whose source of wealth is unclear?', risk: 'high', reason: 'Unexplained wealth is a key proceeds-of-crime indicator.' },
      { id: 'rc6', text: 'Do you deal with other jewellers as customers?', risk: 'high', reason: 'AUSTRAC identifies jewellers as higher-risk customers due to the ability to transform and resell precious goods.' },
      { id: 'rc7', text: 'Do you deal with scrap metal dealers?', risk: 'high', reason: 'Difficult to trace source of scrap jewellery. Could be stolen or proceeds of crime.' },
      { id: 'rc8', text: 'Do you have customers who are reluctant to provide identification?', risk: 'high', reason: 'Reluctance to provide ID may indicate identity concealment.' },
      { id: 'rc9', text: 'Do you have customers who make high-volume purchases?', risk: 'high', reason: 'Unusual buying patterns may indicate money laundering activity.' },
      { id: 'rc10', text: 'Do you deal with customers who don\'t appear to understand precious goods?', risk: 'high', reason: 'May be buying to store value rather than for legitimate purpose.' },
    ],
    service: [
      { id: 'rs1', text: 'Do you sell precious stones (especially loose diamonds)?', risk: 'high', reason: 'Easily transportable, difficult to trace, retain value — AUSTRAC identifies as particularly high-risk.' },
      { id: 'rs2', text: 'Do you sell precious metals in unmanufactured form (bars, ingots)?', risk: 'high', reason: 'Easily melted, refined, or reshaped to hide origin and ownership.' },
      { id: 'rs3', text: 'Do you sell high-value watches?', risk: 'medium', reason: 'Commonly found in proceeds-of-crime seizures.' },
      { id: 'rs4', text: 'Do you buy/sell scrap jewellery or scrap precious metals?', risk: 'high', reason: 'Source difficult to trace, could be stolen goods or proceeds of crime.' },
      { id: 'rs5', text: 'Do you accept physical currency (cash) of $50,000 or more?', risk: 'high', reason: 'Automatic high-risk trigger per AUSTRAC risk table.' },
      { id: 'rs6', text: 'Do you accept virtual assets (cryptocurrency) as payment?', risk: 'high', reason: 'Anonymity concerns and difficulty tracing the source of virtual assets.' },
      { id: 'rs7', text: 'Do you handle items that could be stolen, conflict, or counterfeit?', risk: 'high', reason: 'AUSTRAC specific high-risk factor for precious goods dealers.' },
      { id: 'rs8', text: 'Do you handle transactions with no apparent economic or legal purpose?', risk: 'high', reason: 'Potential ML/TF activity indicator.' },
      { id: 'rs9', text: 'Do you offer lay-by or instalment payments in cash?', risk: 'medium', reason: 'Potential for linked transactions to exceed the $10,000 threshold.' },
    ],
    delivery: [
      { id: 'rd1', text: 'Are any of your transactions conducted entirely online or remotely?', risk: 'high', reason: 'Non-face-to-face verification is more challenging.' },
      { id: 'rd2', text: 'Do you use third-party agents, introducers, or intermediaries?', risk: 'high', reason: 'Reliance on third parties for CDD introduces additional risk.' },
      { id: 'rd3', text: 'Do you outsource product delivery through couriers or postal services?', risk: 'medium', reason: 'Lengthens and complicates the delivery chain.' },
      { id: 'rd4', text: 'Do you accept orders via phone or messaging without in-person contact?', risk: 'high', reason: 'Identity verification is harder without face-to-face contact.' },
    ],
    geographic: [
      { id: 'rg1', text: 'Do you deal with buyers or sellers from countries identified as high-risk by FATF?', risk: 'high', reason: 'FATF grey/blacklisted jurisdictions are subject to enhanced scrutiny.' },
      { id: 'rg2', text: 'Do funds for your transactions originate from overseas?', risk: 'high', reason: 'International fund flows carry higher ML risk.' },
      { id: 'rg3', text: 'Do you source precious metals or stones from overseas (including scrap)?', risk: 'high', reason: 'Difficult to trace origin, gemstone pipeline complexity across jurisdictions.' },
      { id: 'rg4', text: 'Do your customers have no apparent connection to the area where your business is located?', risk: 'medium', reason: 'Unusual geographic pattern may indicate the purchase is not for a legitimate personal purpose.' },
      { id: 'rg5', text: 'Do you deal with customers from countries with weak AML/CTF frameworks, high corruption, or known as tax havens?', risk: 'high', reason: 'Regulatory arbitrage — exploiting weaker AML regimes.' },
    ],
  },

  // ─── FATF HIGH-RISK JURISDICTIONS (Feb 2026 reference) ─────────────────────
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

  // ─── AUSTRAC LINKS ─────────────────────────────────────────────────────────
  austracLinks: [
    // Starter Kit & Guidance Hub
    { category: 'Starter Kit & Guidance Hub', title: 'Dealers in Precious Metals, Stones and Products Guidance (main page)', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance', desc: 'AUSTRAC\'s main guidance hub for precious goods dealer obligations.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Jeweller Program Starter Kit', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit', desc: 'The official starter kit — use this as your primary resource for building your AML/CTF program.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Getting Started with the Starter Kit', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/jeweller-program-starter-kit-getting-started', desc: 'How to get started with AUSTRAC\'s jeweller program starter kit.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 1: Customise Your Program', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/step-1-customise-your-jeweller-program-using-starter-kit', desc: 'How to customise the starter kit for your specific business.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 2: Use Your Program', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/step-2-use-your-jeweller-program', desc: 'How to use your AML/CTF program day-to-day, including CDD and reporting.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Step 3: Maintain and Review', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/step-3-maintain-and-review-your-jeweller-program', desc: 'AUSTRAC guidance on ongoing program maintenance and review obligations.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Starter Kit Document Library', url: 'https://www.austrac.gov.au/reforms/program-starter-kits/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/jeweller-program-starter-kit-document-library', desc: 'All template documents from the starter kit in one place.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Examples of Dealing with Customers', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/jeweller-program-starter-kit-examples-dealing-customers', desc: 'AUSTRAC worked examples for low, medium, and high-risk customers.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Regulation Options for Dealers', url: 'https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/regulation-options-dealers-precious-metals-stones-and-products', desc: 'The 4 regulation options depending on your business model.' },
    { category: 'Starter Kit & Guidance Hub', title: 'Starter Kit Media Release (30 Jan 2026)', url: 'https://www.austrac.gov.au/news-and-media/media-release/austrac-backs-newly-regulated-sectors-release-amlctf-program-starter-kits', desc: 'AUSTRAC\'s announcement of the jeweller program starter kit release.' },
    // Downloadable Templates
    { category: 'Downloadable Templates (Word)', title: 'Jeweller Process Document (926 KB)', url: 'https://www.austrac.gov.au/sites/default/files/2026-01/Jewellers%20-%20Process%20document%20-%20January%202026.docx', desc: 'Official Word template for your AML/CTF process document.' },
    // Reform Guidance
    { category: 'Reform Guidance', title: 'Precious Metals, Stones and Products Services (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/before-you-start/new-industries-and-services-be-regulated-reform/precious-metals-stones-and-products-services-reform', desc: 'Overview of how the reforms affect precious goods dealers.' },
    { category: 'Reform Guidance', title: 'Summary of Obligations — Tranche 2', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/summary-amlctf-obligations-tranche-2-entities', desc: 'Summary of all AML/CTF obligations for newly regulated Tranche 2 entities.' },
    { category: 'Reform Guidance', title: 'Risk Insights — Precious Stones, Metals and Products', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/risk-insights-and-indicators-suspicious-activity-dealers-precious-stones-metals-and-other-products', desc: 'AUSTRAC\'s published red flag indicators and risk insights for precious goods dealers.' },
    { category: 'Reform Guidance', title: 'Regulatory Expectations for Implementation', url: 'https://www.austrac.gov.au/austrac-regulatory-expectations-implementation-amlctf-reforms', desc: 'What AUSTRAC expects from newly regulated entities during implementation.' },
    // Customer Due Diligence
    { category: 'Customer Due Diligence', title: 'Initial CDD (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform', desc: 'Detailed AUSTRAC guidance on conducting initial CDD.' },
    { category: 'Customer Due Diligence', title: 'Enhanced CDD (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/enhanced-customer-due-diligence-reform', desc: 'When and how to apply Enhanced Due Diligence.' },
    { category: 'Customer Due Diligence', title: 'Delayed Initial CDD (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform', desc: 'When and how you may delay CDD.' },
    { category: 'Customer Due Diligence', title: 'CDD Before Providing a Designated Service', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service', desc: 'Guidance on completing CDD before providing a service.' },
    { category: 'Customer Due Diligence', title: 'Reliance Under CDD Arrangements (Reform)', url: 'https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform', desc: 'When and how you can rely on another party\'s CDD.' },
    { category: 'Customer Due Diligence', title: 'Beneficial Owners', url: 'https://www.austrac.gov.au/business/core-guidance/customer-identification-and-verification/beneficial-owners', desc: 'How to identify and verify beneficial owners of entities.' },
    { category: 'Customer Due Diligence', title: 'Source of Funds and Source of Wealth (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/source-funds-and-source-wealth-reform', desc: 'AUSTRAC guidance on verifying source of funds and source of wealth.' },
    { category: 'Customer Due Diligence', title: 'Assigning Customer Risk Ratings (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/assigning-customer-risk-ratings-reform', desc: 'How to assign Low/Medium/High risk ratings to customers.' },
    // Governance & Personnel
    { category: 'Governance & Personnel', title: 'AML/CTF Compliance Officer (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/amlctf-compliance-officer-reform', desc: 'AUSTRAC guidance on appointing and notifying your compliance officer.' },
    { category: 'Governance & Personnel', title: 'Personnel Due Diligence & Training (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/identifying-personnel-roles-require-due-diligence-and-training-reform', desc: 'Who requires due diligence and training, and what is required.' },
    // Reporting
    { category: 'Reporting', title: 'Reporting to AUSTRAC (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform', desc: 'Overview of all reporting obligations for Tranche 2 entities.' },
    { category: 'Reporting', title: 'Suspicious Matter Reports (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/suspicious-matter-reports-reform', desc: 'When and how to file Suspicious Matter Reports.' },
    { category: 'Reporting', title: 'Threshold Transaction Reports (Reform)', url: 'https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/threshold-transaction-reports-reform', desc: 'When and how to file Threshold Transaction Reports.' },
    { category: 'Reporting', title: 'Structuring', url: 'https://www.austrac.gov.au/business/core-guidance/reporting/transactions-10000-or-more-ttrs/reporting-structuring', desc: 'Guidance on recognising and reporting structuring activity.' },
    { category: 'Reporting', title: 'AUSTRAC Online (Enrolment & Reporting)', url: 'https://online.austrac.gov.au', desc: 'The AUSTRAC Online portal — enrol and file reports (SMRs, TTRs, Annual Reports).' },
    // External References
    { category: 'External References', title: 'DFAT Consolidated Sanctions List', url: 'https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list', desc: 'Australian Government list of sanctioned persons and entities. Check this for every customer.' },
    { category: 'External References', title: 'FATF High-Risk Jurisdictions', url: 'https://www.fatf-gafi.org/en/topics/high-risk-and-other-monitored-jurisdictions.html', desc: 'Current FATF grey-listed and blacklisted countries.' },
    { category: 'External References', title: 'Money Laundering NRA 2024', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/money-laundering-australia-national-risk-assessment-2024', desc: 'AUSTRAC\'s 2024 national risk assessment rating jewellery sector as HIGH risk.' },
    { category: 'External References', title: 'Bullion Dealers Risk Assessment 2022', url: 'https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/bullion-dealers-australia-risk-assessment-2022', desc: 'AUSTRAC risk assessment for bullion dealers (separate designated service).' },
  ],

  // ─── REGULATION OPTIONS (unique to jewellers) ──────────────────────────────
  regulationOptions: [
    {
      option: 1,
      title: 'Don\'t accept physical currency or virtual assets',
      description: 'If you don\'t accept cash or crypto payments at all, you are not regulated.',
      obligations: 'None — no AML/CTF program required.',
      riskLevel: 'exempt',
      detail: 'If your business only accepts debit/credit cards, bank transfers, and other non-cash/non-virtual-asset payment methods, you are not providing a designated service and have no AML/CTF obligations under these reforms.'
    },
    {
      option: 2,
      title: 'Accept cash/virtual assets under $10,000 per transaction',
      description: 'You must monitor for linked or structured transactions that could exceed $10,000.',
      obligations: 'Limited — need clear policies and monitoring for linked transactions. If a $10,000+ transaction occurs, you must have a program or face penalties.',
      riskLevel: 'limited',
      detail: 'While individual transactions under $10,000 don\'t trigger the designated service, you must have systems to detect linked transactions (lay-by, instalments, same-day cumulative) that could cumulatively exceed the threshold.'
    },
    {
      option: 3,
      title: 'Accept cash/virtual assets — streamlined for individuals',
      description: 'Use AUSTRAC\'s streamlined compliance process for low/medium risk individual customers only.',
      obligations: 'Streamlined — refer physical currency transactions to store owner/manager who follows simplified process.',
      riskLevel: 'streamlined',
      detail: 'AUSTRAC has developed a streamlined compliance process specifically for jewellers dealing with low-to-medium risk individual customers using physical currency. Sales staff refer cash transactions to the store owner/manager, who determines if the transaction is regulated and follows a simplified CDD form.'
    },
    {
      option: 4,
      title: 'Accept cash/virtual assets from all customer types',
      description: 'Full AML/CTF program required for wider range of customers including entities, high-risk, foreign.',
      obligations: 'Full — implement complete AML/CTF program using starter kit.',
      riskLevel: 'full',
      detail: 'If you accept physical currency or virtual assets from all customer types including companies, trusts, partnerships, foreign customers, and high-risk individuals, you need a full AML/CTF program covering all CDD procedures, reporting, record keeping, training, and governance.'
    },
  ],

  // ─── CUSTOMER EXAMPLES (from AUSTRAC Starter Kit) ──────────────────────────
  customerExamples: [
    {
      id: 'low',
      title: 'Low-Risk Customer',
      riskLevel: 'LOW',
      scenario: 'A jeweller accepts a request to create a custom diamond ring valued at $12,000. The customer asks to pay in cash.',
      steps: [
        { step: 1, action: 'Customer approaches', detail: 'Customer requests custom engagement ring, $12,000, will pay in cash. Transaction is regulated ($10,000+ in physical currency).' },
        { step: 2, action: 'Onboarding', detail: 'Customer completes onboarding form. Provides reason for purchase (engagement ring) and driver\'s licence for ID.' },
        { step: 3, action: 'Initial CDD', detail: 'Identity verified against driver\'s licence. No medium or high-risk factors identified.' },
        { step: 4, action: 'PEP & Sanctions screening', detail: 'PEP self-declaration: not a PEP. DFAT Consolidated List checked: no match. Sanctions check completed.' },
        { step: 5, action: 'Risk rating', detail: 'Rated LOW risk — no risk factors present. Simplified CDD is appropriate.' },
        { step: 6, action: 'Escalation check', detail: 'Escalation checklist reviewed — no triggers present. No escalation needed.' },
        { step: 7, action: 'Transaction completed', detail: 'Ring created, payment received in cash. TTR filed with AUSTRAC within 10 business days.' },
        { step: 8, action: 'Relationship concludes', detail: 'One-off transaction. No further ongoing CDD required. Records retained for 7 years.' },
      ],
      keyPoints: [
        'Compliance boils down to approximately 3 forms for this typical customer',
        'No escalation or EDD required',
        'TTR filed due to $10,000+ cash payment',
        'Records retained for 7 years',
      ],
      austracSource: 'AUSTRAC Jeweller Program Starter Kit — Examples of Dealing with Customers'
    },
    {
      id: 'medium',
      title: 'Medium-Risk Customer',
      riskLevel: 'MEDIUM',
      scenario: 'An individual wants to purchase a custom bracelet and watch valued at $15,000 with cash. Both contain precious stones. The individual is acting as a representative for their employer (a sole trader).',
      steps: [
        { step: 1, action: 'Customer approaches', detail: 'Representative wants to buy bracelet + watch ($15,000) in cash for their employer. Transaction is regulated.' },
        { step: 2, action: 'Medium risk factors identified', detail: 'Employer is a domestic PEP (parent of a state MP). Representative is a third-party agent not enrolled with AUSTRAC.' },
        { step: 3, action: 'Onboarding', detail: 'Representative completes onboarding form on behalf of employer (the customer). Both representative and employer identified.' },
        { step: 4, action: 'Identity verification', detail: 'Identity verified for both representative AND customer (employer). Representative\'s authority to act confirmed.' },
        { step: 5, action: 'PEP & Sanctions screening', detail: 'Customer (employer): family member of domestic PEP — MEDIUM risk factor. Representative: not a PEP. Sanctions check: no matches.' },
        { step: 6, action: 'Escalation check', detail: 'Escalation triggers reviewed — no escalation needed despite medium risk factors. Standard CDD applied (not simplified).' },
        { step: 7, action: 'Risk rating confirmed', detail: 'Final rating: MEDIUM — two medium-risk factors (domestic PEP connection + third-party representative). No EDD required.' },
        { step: 8, action: 'Transaction completed', detail: 'Transaction completed. TTR filed. Relationship concludes — no further ongoing CDD. Records retained for 7 years.' },
      ],
      keyPoints: [
        'Two medium-risk factors: domestic PEP connection + third-party representative',
        'Standard CDD applied (simplified CDD not appropriate for medium risk)',
        'Both representative and employer must be identified and verified',
        'No escalation or EDD required at medium risk level',
      ],
      austracSource: 'AUSTRAC Jeweller Program Starter Kit — Examples of Dealing with Customers'
    },
    {
      id: 'high',
      title: 'High-Risk Customer',
      riskLevel: 'HIGH',
      scenario: 'An individual wants to purchase 100-point loose diamonds using $50,000 in cash.',
      steps: [
        { step: 1, action: 'Customer approaches', detail: 'Wants loose diamonds for $50,000 in cash. Multiple high-risk factors immediately identified.' },
        { step: 2, action: 'High risk factors identified', detail: 'Cash $50,000+ (automatic high-risk trigger). Loose diamonds (easily transportable, retain value, difficult to trace).' },
        { step: 3, action: 'Escalation to compliance officer', detail: 'Transaction must be escalated to AML/CTF compliance officer due to high-risk factors.' },
        { step: 4, action: 'Enhanced CDD begins', detail: 'Compliance officer conducts EDD: identity verification, source of funds check, source of wealth check.' },
        { step: 5, action: 'Source of funds investigation', detail: 'Customer claims dividends from shares. Source of wealth claimed as salary and dividends. Low income doesn\'t support $50,000 purchase.' },
        { step: 6, action: 'Documentation requested', detail: 'Customer cannot provide dividend statements. Makes excuses and delays. Unable to substantiate claims.' },
        { step: 7, action: 'Adverse media check', detail: 'Open-source/adverse media check conducted — no adverse results found.' },
        { step: 8, action: 'SMR filed', detail: 'Compliance officer forms reasonable grounds for suspicion (income doesn\'t support purchase, cannot substantiate source). SMR submitted to AUSTRAC.' },
        { step: 9, action: 'Transaction rejected', detail: 'Senior manager rejects the transaction — falls outside business risk appetite. Customer told refusal is because cash amount exceeds accepted limits.' },
        { step: 10, action: 'Alternative offered', detail: 'Customer advised they can deposit funds into a bank account and pay via bank transfer or EFTPOS. Tipping-off prohibition observed.' },
      ],
      keyPoints: [
        '$50,000+ in cash is an automatic HIGH risk trigger',
        'Loose diamonds are particularly high-risk (transportable, retain value, difficult to trace)',
        'Escalation to compliance officer is mandatory for high-risk',
        'Source of funds could not be verified — SMR filed',
        'Transaction rejected as outside risk appetite',
        'Customer NOT told about SMR (tipping-off prohibition)',
      ],
      austracSource: 'AUSTRAC Jeweller Program Starter Kit — Examples of Dealing with Customers'
    },
  ],

  // ─── CUSTOMER LIFECYCLE (8-Step Process from AUSTRAC) ──────────────────────
  customerLifecycle: [
    { step: 1, title: 'Identify the kind of customer', description: 'Determine if they are an individual or entity (trust, company, etc.) and the type of service sought. This determines which onboarding form applies.' },
    { step: 2, title: 'Collect customer information', description: 'Use the relevant onboarding form. Level of information depends on customer type, service nature, and ML/TF risk factors.' },
    { step: 3, title: 'Verify customer information', description: 'Follow the relevant initial CDD form to confirm collected information is reliable for AML/CTF purposes.' },
    { step: 4, title: 'Identify and assess triggers', description: 'Watch for inconsistencies, unusual behaviour, higher-risk indicators. Can occur during onboarding or at any point during the relationship.' },
    { step: 5, title: 'Decide how to proceed', description: 'Based on checks: proceed, apply additional controls, escalate/report, or decline service.' },
    { step: 6, title: 'Provide the designated service', description: 'Generally only after required checks are complete and risks addressed. May delay CDD if criteria are met.' },
    { step: 7, title: 'Ongoing customer due diligence', description: 'Monitor for changes in behaviour, respond to new triggers, update customer information during the relationship.' },
    { step: 8, title: 'End of business relationship', description: 'Determine what records to keep, how long, and how they support future reviews. Retain for minimum 7 years.' },
  ],

};
