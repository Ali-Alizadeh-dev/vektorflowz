import {
  siAirtable, siAsana, siBrevo, siCalendly, siClaude, siClickup, siConfluence,
  siDatev, siDropbox, siGithub, siGmail, siGoogleanalytics, siGooglecalendar,
  siGoogledocs, siGoogledrive, siGooglegemini, siGooglesheets, siHubspot,
  siIntercom, siJira, siMailchimp, siMake, siMeta, siMistralai, siN8n, siNotion,
  siOllama, siOpenai, siPersonio, siPostgresql, siQuickbooks, siSalesforce,
  siSap, siShopify, siSlack, siStripe, siTelegram, siTrello, siTwilio,
  siTypeform, siWhatsapp, siWoocommerce, siXero, siZapier, siZendesk, siZoom,
} from "simple-icons";

type SimpleIcon = { title: string; hex: string; path: string };

export type ToolCategory =
  | "project" | "finance" | "mail" | "comms" | "crm" | "storage"
  | "docs" | "scheduling" | "marketing" | "data";

export type Tool = {
  id: string;
  name: string;
  cat: ToolCategory;
  /** Offizielles Logo (simple-icons, CC0) … */
  icon?: SimpleIcon;
  /** … oder ein Kürzel, wenn es kein freies Logo gibt. */
  mono?: { text: string; color: string };
};

const t = (id: string, cat: ToolCategory, icon: SimpleIcon): Tool => ({
  id, cat, icon, name: icon.title,
});
const m = (id: string, name: string, cat: ToolCategory, text: string, color: string): Tool => ({
  id, name, cat, mono: { text, color },
});

export const TOOLS: Tool[] = [
  t("asana", "project", siAsana),
  t("trello", "project", siTrello),
  t("clickup", "project", siClickup),
  t("jira", "project", siJira),
  t("notion", "project", siNotion),
  t("airtable", "project", siAirtable),
  t("datev", "finance", siDatev),
  m("lexoffice", "lexoffice", "finance", "lx", "#E5004D"),
  m("sevdesk", "sevdesk", "finance", "sd", "#2B59C3"),
  t("stripe", "finance", siStripe),
  t("xero", "finance", siXero),
  t("quickbooks", "finance", siQuickbooks),
  t("sap", "finance", siSap),
  t("gmail", "mail", siGmail),
  m("outlook", "Microsoft Outlook", "mail", "O", "#0078D4"),
  t("slack", "comms", siSlack),
  m("teams", "Microsoft Teams", "comms", "T", "#6264A7"),
  t("zoom", "comms", siZoom),
  t("whatsapp", "comms", siWhatsapp),
  t("telegram", "comms", siTelegram),
  t("twilio", "comms", siTwilio),
  t("hubspot", "crm", siHubspot),
  t("salesforce", "crm", siSalesforce),
  m("pipedrive", "Pipedrive", "crm", "P", "#1A7A4C"),
  t("zendesk", "crm", siZendesk),
  t("intercom", "crm", siIntercom),
  t("personio", "crm", siPersonio),
  t("googledrive", "storage", siGoogledrive),
  t("dropbox", "storage", siDropbox),
  m("onedrive", "OneDrive", "storage", "O", "#0364B8"),
  m("sharepoint", "SharePoint", "storage", "S", "#038387"),
  t("googledocs", "docs", siGoogledocs),
  t("googlesheets", "docs", siGooglesheets),
  t("confluence", "docs", siConfluence),
  t("googlecalendar", "scheduling", siGooglecalendar),
  t("calendly", "scheduling", siCalendly),
  t("typeform", "scheduling", siTypeform),
  m("docusign", "DocuSign", "scheduling", "DS", "#D5A021"),
  t("mailchimp", "marketing", siMailchimp),
  t("brevo", "marketing", siBrevo),
  t("meta", "marketing", siMeta),
  m("linkedin", "LinkedIn", "marketing", "in", "#0A66C2"),
  t("googleanalytics", "marketing", siGoogleanalytics),
  t("shopify", "marketing", siShopify),
  t("woocommerce", "marketing", siWoocommerce),
  t("github", "data", siGithub),
  t("postgresql", "data", siPostgresql),
  t("n8n", "data", siN8n),
  t("zapier", "data", siZapier),
  t("make", "data", siMake),
];

/** KI-Modelle (nur für die Modellwahl-Karte, nicht im Integrations-Raster). */
export const MODELS: Tool[] = [
  { id: "claude", name: "Claude", cat: "data", icon: siClaude },
  { id: "openai", name: "ChatGPT", cat: "data", icon: siOpenai },
  { id: "gemini", name: "Gemini", cat: "data", icon: siGooglegemini },
  { id: "mistral", name: "Mistral", cat: "data", icon: siMistralai },
  { id: "ollama", name: "Llama (lokal)", cat: "data", icon: siOllama },
];

const byId = new Map([...TOOLS, ...MODELS].map((x) => [x.id, x]));

export function tool(id: string): Tool {
  const found = byId.get(id);
  if (!found) throw new Error(`Unbekanntes Tool: ${id}`);
  return found;
}

/** Sehr dunkle Markenfarben würden auf Charcoal verschwinden → hell zeichnen. */
export function logoColor(hex: string) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.28 ? "#E8ECEF" : `#${hex}`;
}
