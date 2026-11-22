// Vorschau aller Mails ohne Server: node preview.mjs → mail-preview-<name>.html
import fs from "node:fs";
import { renderMail } from "./mails.mjs";

const vars = {
  Vorname: "Thomas",
  "Guide-Titel": "KI-Buchhaltung",
  "Guide-Link": "https://www.solvomind.de/de/guides/ki-buchhaltung",
  "Bestätigungslink": "https://www.solvomind.de/api/leads/bestaetigen?t=BEISPIEL",
  Abmeldelink: "https://www.solvomind.de/api/leads/abmelden?t=BEISPIEL",
  Terminlink: "https://cal.com/ali-alizadeh-tahbua/erstgespraech",
  Impressum: "https://www.solvomind.de/de/impressum",
  Datenschutz: "https://www.solvomind.de/de/datenschutz",
  Tage: "30",
};
for (const name of ["bestaetigung", "willkommen"]) {
  const m = renderMail(name, vars);
  fs.writeFileSync(`mail-preview-${name}.html`, m.html);
  console.log(`===== ${name} =====\nBetreff: ${m.subject}\n\n${m.text}\n`);
}
