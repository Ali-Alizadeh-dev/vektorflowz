import { PRODUCT } from "@/lib/site";
import type { de } from "./de";

/** English copy. Same structure as de.ts (enforced by the type below). */
export const en: typeof de = {
  meta: {
    title: `solvomind | ${PRODUCT}: AI agents for your entire company`,
    description:
      "Company knowledge, tools and teams in one place, with its own AI agent for every department. Built with you and GDPR-compliant. Book a free intro call.",
    ogLocale: "en_US",
  },

  nav: {
    links: [
      { href: "#plattform", label: "Platform" },
      { href: "#ablauf", label: "How it works" },
      { href: "#agenten", label: "Agents" },
      { href: "#integrationen", label: "Integrations" },
    ],
    cta: "Book a call",
    menu: "Open menu",
    close: "Close menu",
    language: "Language",
    skip: "Skip to content",
  },

  depts: {
    sales: { name: "Sales", agent: "Sales agent", line: "targeting · outreach · follow-up" },
    marketing: { name: "Marketing", agent: "Marketing agent", line: "content · campaigns · reach" },
    service: { name: "Customer service", agent: "Service agent", line: "enquiries · tickets · knowledge" },
    operations: { name: "Operations", agent: "Operations agent", line: "projects · scheduling · processes" },
    finance: { name: "Finance", agent: "Finance agent", line: "invoices · payments · cash" },
    admin: { name: "Back office", agent: "Back office agent", line: "documents · contracts · deadlines" },
    people: { name: "People", agent: "People agent", line: "hiring · onboarding · leave" },
    insights: { name: "Insights", agent: "Insights agent", line: "metrics · reports · market" },
  },

  hero: {
    titleA: "An AI team for",
    titleB: "your entire company.",
    sub: `With ${PRODUCT}, we bring your company knowledge, tools and teams together in one place. Every department gets its own AI agent that backs its answers with sources, works GDPR-compliant and fits the way you work.`,
    cta: "Free intro call",
    cta2: "How it works",
    try: "Try:",
    placeholder: "Ask your company …",
    send: "Send",
    searching: "Searching {n} sources",
    meta: "{n} sources · 1.4s",
    asked: "You asked",
    statusAsking: "Asking",
    statusThinking: "Thinking",
    statusAnswering: "Answering …",
    statusDone: "Answered in 1.4s",
    caption: "COMPANY KNOWLEDGE",
    demos: [
      {
        dept: "sales",
        q: "What did we quote Müller GmbH?",
        tools: ["googledrive", "gmail", "hubspot"],
        a: "On 12 September, quote A-2041 for €18,400 went to Müller GmbH [1]. Mr Kaya followed up on the 19th [2], and the deal is marked “negotiation” in HubSpot [3].",
        sources: [["googledrive", "Quote A-2041.pdf"], ["gmail", "Re: Your quote"], ["hubspot", "Deal · Müller GmbH"]],
      },
      {
        dept: "service",
        q: "What were the most common questions this week?",
        tools: ["zendesk", "gmail", "notion"],
        a: "Most were about delivery times (41 requests) [1] and invoice copies (23) [2]. Both already have answers in your knowledge base [3].",
        sources: [["zendesk", "Tickets · week 45"], ["gmail", "Support inbox"], ["notion", "Internal FAQ"]],
      },
      {
        dept: "finance",
        q: "Which invoices are more than 30 days overdue?",
        tools: ["datev", "stripe", "gmail"],
        a: "Six invoices are more than 30 days overdue, €21,300 in total [1]. Two clients already had a reminder [2]. The remaining reminders are drafted and waiting for your approval.",
        sources: [["datev", "Open items"], ["gmail", "Payment reminders"]],
      },
      {
        dept: "marketing",
        q: "Which post drove the most enquiries last month?",
        tools: ["googleanalytics", "linkedin", "mailchimp"],
        a: "The warehouse automation case study drove 38 of 112 enquiries [1]. LinkedIn posts with a client quote got twice the clicks [2], and the October newsletter added 21 more [3].",
        sources: [["googleanalytics", "Enquiries · October"], ["linkedin", "Post analytics"], ["mailchimp", "October newsletter"]],
      },
    ],
  },

  band: { label: "Works with the tools you already use" },

  how: {
    eyebrow: "How it works",
    title: "Connect. Map. Put it to work.",
    connectLabel: "One-click connect",
    connect: "Connect",
    connected: "Connected",
    auditLabel: "Process mapping",
    audited: "{n} of 8 mapped",
    workLabel: "Agents at work",
    status: { queued: "Queued", working: "Working", done: "Done" },
    workRows: [
      { dept: "sales", job: "Write openers", result: "12 drafts written" },
      { dept: "finance", job: "Prepare reminders", result: "6 reminders ready" },
      { dept: "service", job: "Answer tickets", result: "18 replies drafted" },
    ],
    steps: [
      { title: "Connect your tools", text: "Email, files, CRM and accounting get connected. From day one, your shared company knowledge starts to grow." },
      { title: "Map your processes", text: "Together we go department by department and find the jobs where AI saves the most time." },
      { title: "Put agents to work", text: "Your agents take over repeat work. You still approve the steps that matter." },
    ],
  },

  features: {
    eyebrow: `What ${PRODUCT} does`,
    title: "Knows your company.\nDoes the work.",
    answers: {
      title: "Answers with sources.",
      text: "Ask anything about your business. Every answer links back to the file, email or record it came from.",
      q: "What payment terms did we agree with Becker & Sons?",
      steps: [["googledrive", "Searched Google Drive", "14 files"], ["gmail", "Read the renewal thread", "6 emails"], ["datev", "Checked invoices in DATEV", "2 records"]],
      answered: "Answered from 3 sources",
      a: "Net 30, with 2% off for payment within 10 days [1]. That applies since the March renewal [2], and the last two invoices were paid on time [3].",
      sources: [["Master agreement v3.pdf", "Page 4"], ["Re: Renewal", "12 March"], ["INV-2207, INV-2231", "DATEV"]],
      followup: "Ask a follow-up …",
    },
    agents: {
      title: "An agent for every department.",
      text: "Eight agents, one per department, each running the skills for its jobs.",
      running: "Running",
      skills: "skills",
      counts: [18, 14, 16, 15, 17, 12, 10, 11],
    },
    models: {
      title: "Your choice of model.",
      text: "Claude, GPT, Gemini or Mistral: pick the model you trust for each job. Hosted in Europe or on your own hardware if you prefer.",
      label: "Model for this skill",
      more: "+ more models",
      runs: "Runs this month",
      runsCount: "1,284",
    },
    spend: {
      title: "Full cost control.",
      text: "Set a monthly budget and see what every department spends.",
      of: "of €600 this month",
      pause: "Pause at limit",
    },
    skills: {
      title: "Skills on a tree.",
      text: "Every job is a skill. Pick one from the library, or describe a new one in plain words.",
      tag: "Sales · New skill",
      name: "Follow up after every meeting",
      rows: [["WHEN", "A client meeting ends"], ["DO", "Draft the follow-up from the notes"], ["THEN", "Send it to Slack for approval"]],
    },
    dashboards: {
      title: "Dashboards that stay live.",
      text: "Ask for a view of your numbers, then keep it. It updates as your tools do.",
      live: "Live",
      k1: { label: "Unbilled work", note: "12 invoices ready to send" },
      k2: { label: "Cash in, 30 days", note: "from DATEV and Stripe" },
    },
    private: {
      title: "Private connections.",
      text: "Connect your own inbox, calendar or drive. What the agent reads there stays visible to you alone.",
      connecting: "Connecting …",
      only: "Only you",
      team: "Whole team",
      rows: [["gmail", "sam@yourcompany.com", "only"], ["outlook", "Inbox and calendar", "only"], ["onedrive", "Your files", "only"], ["sharepoint", "Company sites", "team"], ["teams", "Public channels", "team"]],
    },
    mcp: {
      title: "Use it inside Claude or ChatGPT.",
      text: "Connected over MCP, your entire company knowledge is right inside the assistant you already use.",
      connected: "Connected via MCP",
      q: "What did Sales close this week?",
      searching: "Searching your company",
      a: "Two deals closed: Müller GmbH phase two at €48,600 and Studio Lumen at €12,400. Both are marked won in HubSpot.",
      chips: [["hubspot", "HubSpot · Closed won"], ["gmail", "Gmail · 2 threads"]],
      reply: "Reply in your assistant",
    },
  },

  team: {
    eyebrow: "Agents",
    title: "Meet your team.",
    sub: "A typical team, one agent per department. Yours grows with your company. Pick a department, then a job, and watch it run.",
    startWith: "Start with",
    teamsOnTree: "Teams on the tree",
    worksWith: "Works with",
    used: "Used",
    working: "Working …",
    done: "Done",
    message: "Message the {agent}",
    user: "SL",
    depts: {
      sales: {
        teams: [["Targeting", 4], ["Research", 5], ["Outreach", 4], ["Follow-up", 3]],
        tools: ["hubspot", "linkedin", "gmail", "googlesheets"],
        jobs: [
          { title: "Build a target account list", prompt: "Find trade businesses in Hamburg with 20 to 80 staff.", steps: [["linkedin", "Searched LinkedIn and company records", "214 firms"], ["hubspot", "Matched against your ideal customer", "48 matches"]], a: "48 businesses fit your ideal customer [1], and 31 have a named decision maker [2].", result: "Target list ready", lines: ["48 accounts, 31 with a contact", "Saved to HubSpot · Q4 targets"] },
          { title: "Write personalised openers", prompt: "Write openers for the Q4 target accounts.", steps: [["hubspot", "Loaded targets from HubSpot", "48 accounts"], ["googledocs", "Drafted in your tone of voice", "48 drafts"]], a: "Each message picks up a recent project of the business [1] and follows your outreach playbook [2].", result: "48 drafts ready", lines: ["Ready for review in HubSpot sequences", "“We noticed your harbour renovation …”"] },
          { title: "Run follow-up sequences", prompt: "Follow up with everyone who hasn't replied in 5 days.", steps: [["gmail", "Checked every open thread", "63 threads"], ["hubspot", "Scheduled follow-ups", "19 contacts"]], a: "19 contacts get a second message [1]. The sequence stops the moment someone replies [2].", result: "19 follow-ups scheduled", lines: ["Sends Tue to Thu, 9 to 11 am", "Stops on any reply"] },
        ],
      },
      marketing: {
        teams: [["Content", 5], ["Social", 4], ["Newsletter", 3], ["SEO", 2]],
        tools: ["linkedin", "mailchimp", "googleanalytics", "meta"],
        jobs: [
          { title: "Plan the week's posts", prompt: "Plan five LinkedIn posts about our new case study.", steps: [["googledrive", "Read the case study and client quotes", "3 documents"], ["linkedin", "Found the best posting times", "90 days"]], a: "Five posts with different hooks are drafted [1], scheduled for your highest-reach times [2].", result: "5 posts scheduled", lines: ["Mon to Fri, 8:30 am", "Waiting for your approval"] },
          { title: "Draft the newsletter", prompt: "Draft the November newsletter from this month's news.", steps: [["notion", "Collected news from Notion", "7 entries"], ["mailchimp", "Prepared template and list", "1,240 recipients"]], a: "The newsletter covers three topics with a clear call to book an intro call [1]. Two subject lines are ready for an A/B test [2].", result: "Newsletter draft ready", lines: ["2 subject lines to test", "Scheduled: Tue, 10 am"] },
          { title: "Review campaigns", prompt: "Which campaign performed best in October?", steps: [["googleanalytics", "Grouped enquiries by source", "112 enquiries"], ["meta", "Matched ad spend", "4 campaigns"]], a: "The case study campaign led at €9.80 per enquiry [1]; brand ads cost almost three times as much [2].", result: "Report ready", lines: ["Suggestion: shift budget", "Saved as PDF in Drive"] },
        ],
      },
      service: {
        teams: [["Enquiries", 5], ["Tickets", 4], ["Knowledge", 3], ["Reviews", 2]],
        tools: ["zendesk", "gmail", "whatsapp", "notion"],
        jobs: [
          { title: "Answer new tickets", prompt: "Answer the tickets that came in overnight.", steps: [["zendesk", "Read new tickets", "23 tickets"], ["notion", "Found matching answers", "18 matches"]], a: "18 tickets have a ready reply from your knowledge base [1]. Five need a person and are assigned to the team [2].", result: "18 replies drafted", lines: ["5 tickets handed to the team", "Avg. response time: 4 minutes"] },
          { title: "Turn common questions into knowledge", prompt: "Which questions are still missing from our FAQ?", steps: [["zendesk", "Grouped the last 30 days of tickets", "412 tickets"], ["notion", "Compared with the FAQ", "26 articles"]], a: "Seven common questions have no article yet [1]. Drafts are waiting in Notion for review [2].", result: "7 new FAQ articles", lines: ["Drafts in Notion", "Covers 14% of tickets"] },
          { title: "Reply to reviews", prompt: "Reply to the new Google reviews.", steps: [["gmail", "Collected new reviews", "9 reviews"], ["notion", "Applied your tone guide", "1 guide"]], a: "All nine reviews have a personal reply [1]. The two critical ones are flagged for you [2].", result: "9 replies drafted", lines: ["2 critical for review", "7 ready to approve"] },
        ],
      },
      operations: {
        teams: [["Projects", 4], ["Scheduling", 4], ["Materials", 3], ["Quality", 4]],
        tools: ["asana", "googlecalendar", "slack", "googlesheets"],
        jobs: [
          { title: "Set up a new project", prompt: "Set up the project for Müller GmbH.", steps: [["asana", "Applied the project template", "12 tasks"], ["googlecalendar", "Booked the kickoff", "Tue, 10 am"]], a: "The project is set up with every task and owner [1]. The kickoff is in everyone's calendar [2].", result: "Project ready", lines: ["12 tasks assigned", "Kickoff: Tuesday, 10 am"] },
          { title: "Send weekly status updates", prompt: "Send clients their weekly status.", steps: [["asana", "Checked progress on every project", "8 projects"], ["gmail", "Wrote the updates", "8 emails"]], a: "Every client gets a short update with what's done and what's next [1]. Two delays are named openly [2].", result: "8 updates ready", lines: ["2 delays flagged", "Sends after your approval"] },
          { title: "Spot bottlenecks", prompt: "Where are things stuck this week?", steps: [["asana", "Looked for overdue tasks", "14 tasks"], ["slack", "Read team questions", "3 channels"]], a: "Three projects are waiting on materials [1] and two on client sign-off [2]. The owners have been told.", result: "Bottleneck overview ready", lines: ["5 projects affected", "Shared in Slack"] },
        ],
      },
      finance: {
        teams: [["Money in", 4], ["Reporting", 3], ["Books", 4], ["Cash", 2]],
        tools: ["datev", "stripe", "gmail", "googlesheets"],
        jobs: [
          { title: "Chase overdue invoices", prompt: "Chase every invoice that's more than 30 days overdue.", steps: [["datev", "Checked open items in DATEV", "14 invoices"], ["gmail", "Read past reminders", "6 threads"]], a: "Six invoices are more than 30 days overdue, €21,300 in total [1]. Reminders are drafted in your tone and send from your own inbox [2].", result: "6 reminders drafted", lines: ["€21,300 outstanding", "Sent from your own inbox"] },
          { title: "Report margin by client", prompt: "What was our margin per client in October?", steps: [["datev", "Matched revenue and costs", "38 clients"], ["googlesheets", "Loaded hours from time tracking", "1,120 hrs"]], a: "Average margin was 34% [1]. Three clients are below 15%, mostly due to unplanned extra hours [2].", result: "Margin report ready", lines: ["3 clients below 15%", "Saved as a sheet in Drive"] },
          { title: "Prepare the month-end close", prompt: "Prepare the October month-end close.", steps: [["stripe", "Matched payouts with the bank", "412 transactions"], ["datev", "Matched receipts", "389 receipts"]], a: "412 transactions are matched [1]. Three receipts are still missing, including a €2,400 Stripe payout [2].", result: "Close prepared", lines: ["3 items to review", "Report sent to your accountant"] },
        ],
      },
      admin: {
        teams: [["Documents", 4], ["Contracts", 3], ["Deadlines", 3], ["Mail", 2]],
        tools: ["googledrive", "docusign", "outlook", "notion"],
        jobs: [
          { title: "Sort incoming mail", prompt: "Sort today's scanned mail.", steps: [["googledrive", "Read and recognised scans", "27 documents"], ["outlook", "Routed to the right people", "6 people"]], a: "All 27 documents are recognised and filed [1]. Two letters have a deadline and sit at the top of your list [2].", result: "Mail routed", lines: ["2 deadlines flagged", "Filed in your folder structure"] },
          { title: "Watch contract deadlines", prompt: "Which contracts expire in the next 90 days?", steps: [["googledrive", "Searched contracts", "64 contracts"], ["notion", "Updated the deadline list", "5 deadlines"]], a: "Five contracts expire in the next 90 days [1]; for two, the notice period ends in three weeks [2].", result: "Deadline overview ready", lines: ["2 urgent", "Reminders in your calendar"] },
          { title: "Send a quote for signature", prompt: "Send quote A-2041 for signature.", steps: [["googledrive", "Found the final version", "Quote A-2041"], ["docusign", "Created the signing envelope", "2 signers"]], a: "The quote is out for e-signature [1]. You'll hear as soon as both sides have signed [2].", result: "Sent for signature", lines: ["2 signers", "Reminder after 3 days"] },
        ],
      },
      people: {
        teams: [["Hiring", 3], ["Onboarding", 3], ["Leave", 2], ["Knowledge", 2]],
        tools: ["personio", "gmail", "googlecalendar", "notion"],
        jobs: [
          { title: "Pre-screen applications", prompt: "Pre-screen applications for the project lead role.", steps: [["personio", "Read applications", "37 applications"], ["notion", "Compared with the role profile", "1 profile"]], a: "Nine applicants meet every must-have [1]. Each has a short summary with strengths and open questions [2].", result: "9 candidates suggested", lines: ["Summaries in Personio", "The decision stays with you"] },
          { title: "Prepare onboarding", prompt: "Prepare onboarding for Lena starting 1 December.", steps: [["notion", "Created the onboarding plan", "14 steps"], ["googlecalendar", "Booked intro sessions", "5 sessions"]], a: "Lena's first two weeks are planned [1]. Accounts are requested and the team is informed [2].", result: "Onboarding ready", lines: ["5 intro sessions", "Accounts requested"] },
          { title: "Answer leave questions", prompt: "How many leave days does the team have left?", steps: [["personio", "Read leave balances", "22 people"], ["googlecalendar", "Checked planned absences", "December"]], a: "On average, 6 days are left [1]. In the week before Christmas, 9 of 22 people are already off [2].", result: "Overview ready", lines: ["Gap in week 51", "Note sent to team leads"] },
        ],
      },
      insights: {
        teams: [["Metrics", 3], ["Reports", 3], ["Market", 3], ["Competitors", 2]],
        tools: ["googleanalytics", "googlesheets", "hubspot", "postgresql"],
        jobs: [
          { title: "Weekly report for leadership", prompt: "Create the weekly report for leadership.", steps: [["hubspot", "Loaded pipeline and wins", "42 deals"], ["googlesheets", "Combined the metrics", "4 sources"]], a: "Revenue is 8% above plan [1] and the pipeline grew by €60,000 [2]. Worth noting: response time in service went up [3].", result: "Weekly report ready", lines: ["1 page, 6 metrics", "By email at 8 am"] },
          { title: "Watch competitors", prompt: "What did our competitors change this month?", steps: [["googledocs", "Compared websites and price lists", "5 vendors"], ["linkedin", "Collected news", "12 updates"]], a: "Two vendors raised their prices [1], and one now offers a package for trade businesses [2].", result: "Competitor update ready", lines: ["2 price changes", "1 new offer"] },
          { title: "Explain a change", prompt: "Why did enquiries drop in October?", steps: [["googleanalytics", "Compared visitors and sources", "2 months"], ["postgresql", "Loaded enquiries from the database", "1,904 rows"]], a: "Almost the entire drop comes from Google Ads, paused on 9 October [1]. Organic enquiries actually went up [2].", result: "Cause found", lines: ["Ads paused since 9 Oct", "Organic +12%"] },
        ],
      },
    },
  },

  integrations: {
    eyebrow: "Integrations",
    title: "Connects to the tools you already use.",
    sub: "Grouped by what they do. If yours is missing, we build the connector.",
    all: "All",
    cats: {
      project: "Projects", finance: "Finance", mail: "Email", comms: "Communication", crm: "CRM & support",
      storage: "Storage", docs: "Docs", scheduling: "Scheduling & forms", marketing: "Marketing & shop", data: "Data & automation",
    },
    prev: "Previous",
    next: "Next",
    page: "Page {n}",
    missingTitle: "Don't see yours?",
    missingText: "Tell us which one you use. We build the connector.",
    missingCta: "Request a connector",
  },

  founder: {
    eyebrow: "About us",
    title: "The person accountable for your outcome.",
    name: "Ali Alizadeh",
    role: "Founder",
    bio: [
      "Ali Alizadeh founded solvomind in Hamburg and looks after every project personally, from the first analysis to day-to-day operation.",
      "That gives you one contact who knows your business, builds the solution and stays reachable after launch.",
    ],
    principles: {
      eyebrow: "Principles",
      title: "What you can hold us to.",
      items: [
        ["A direct line", "You always talk to the person building your project. By phone, email or video."],
        ["On your systems", "We build on the tools you already use instead of starting from scratch."],
        ["A person approves", "Automation handles the routine. Someone on your team always confirms the decisions that matter."],
        ["Success defined up front", "Before we start, we agree together on how success is measured."],
      ],
      cta: "Book an intro call",
    },
  },

  data: {
    eyebrow: "Your data",
    title: "Your data stays yours.",
    items: [
      ["Never used for training", "Your content is never used to train AI models."],
      ["Private by person", "Personal connections are visible only to the person they belong to."],
      ["GDPR & EU processing", "Processed to European data protection standards, in your own environment if you like."],
      ["A person approves", "Someone on your team always confirms the steps that matter."],
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    items: [
      [`What is ${PRODUCT}?`, `${PRODUCT} makes everything your company knows searchable for everyone. It draws on documents, email, storage, accounting and CRM and backs every answer with a source. On top sits a team of AI agents, one per department, that handles repeat work.`],
      ["Platform or custom build: which fits us?", `The ${PRODUCT} platform fits if you want to start quickly. We build custom when you need your own agents, special connectors or your own environment. We'll work it out together on the intro call.`],
      ["How long does it take?", "Smaller automations are often live within days; larger solutions take a few weeks. After the intro call, you get a realistic timeline."],
      ["Does it work with our software?", "In most cases, yes. We connect CRM, calendars, accounting, phone systems and internal databases. If a connector is missing, we build it."],
      ["Do we need technical knowledge?", "No. We handle design, development and setup. You know how you work, we take care of the rest."],
      ["How safe is our data?", "We work GDPR-compliant, process in Europe and keep every access traceable. Your data is never used for training."],
      ["What does it cost?", "The intro call is free. After that, you get a fixed proposal for each step, with no subscription and no hidden costs."],
    ],
    more: "More questions?",
    moreCta: "Write to us",
  },

  final: {
    title: `Ready for your own ${PRODUCT}?`,
    sub: "Let's find out together which jobs in your company are worth automating.",
    cta: "Free intro call",
    cta2: "Send a message",
    foot: "No strings · 30 minutes · Tailored advice",
  },

  contact: {
    eyebrow: "Book a time",
    title: "Pick a time that suits you.",
    sub: "30 minutes by video, free and with no strings attached. You get a confirmation with the call link right after booking.",
    alt: "No suitable slot? Email us directly:",
  },

  footer: {
    claim: "Company knowledge and a team of AI agents. Built with you and GDPR-compliant.",
    product: "Platform",
    company: "Company",
    legal: "Legal",
    follow: "Follow",
    links: {
      how: "How it works", integrations: "Integrations", agents: "Agents",
      about: "About us", faq: "FAQ", contact: "Contact", imprint: "Legal notice", privacy: "Privacy",
    },
    rights: "All rights reserved.",
    made: "Made in Hamburg.",
  },

  legal: {
    back: "Back",
    badge: "Legal",
    germanOnly: "This page is provided in German, which is the legally binding version.",
  },
};
