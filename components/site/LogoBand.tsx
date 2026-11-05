import { tool } from "@/lib/tools";
import { ToolLogo } from "./ui";

const ROW_A = ["gmail", "outlook", "hubspot", "salesforce", "datev", "lexoffice", "stripe", "slack", "teams", "googledrive", "notion", "asana", "zendesk", "personio"];
const ROW_B = ["googlecalendar", "calendly", "whatsapp", "mailchimp", "linkedin", "shopify", "sharepoint", "dropbox", "jira", "airtable", "n8n", "make", "zapier", "postgresql"];

function Row({ ids, reverse, dur }: { ids: string[]; reverse?: boolean; dur: string }) {
  const list = [...ids, ...ids];
  return (
    <div className="edge-fade overflow-hidden">
      <div className={`marquee-track gap-3 py-1.5 ${reverse ? "rev" : ""}`} style={{ ["--dur" as string]: dur }}>
        {list.map((id, k) => (
          <span key={k} className="chip h-10 gap-2.5 px-4 text-[0.88rem] text-fg/85" aria-hidden={k >= ids.length}>
            <ToolLogo id={id} size={16} />
            {tool(id).name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LogoBand({ label }: { label: string }) {
  return (
    <section className="border-y border-line bg-[#0b0c0e] pb-11 pt-14" aria-label={label}>
      <p className="mb-6 text-center text-[0.85rem] text-muted">{label}</p>
      <div className="space-y-2">
        <Row ids={ROW_A} dur="140s" />
        <Row ids={ROW_B} dur="160s" reverse />
      </div>
    </section>
  );
}
