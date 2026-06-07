import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Datenschutzerklärung — Vektorflowz" };

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <p className="text-sm text-muted">
        Stand: {new Date().toLocaleDateString("de-DE")}
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und
        anderer nationaler Datenschutzgesetze ist:
        <br />
        <br />
        [Vor- und Nachname / Firmenname]
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ Ort]
        <br />
        E-Mail: ali.alizadeh@vektorflowz.de
      </p>

      <h2>2. Allgemeine Hinweise</h2>
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten
        Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen
        (DSGVO, BDSG, TDDDG). In dieser Datenschutzerklärung informieren wir
        Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener
        Daten auf unserer Website.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei <strong>Vercel Inc.</strong> (440 N Barranca
        Ave #4133, Covina, CA 91723, USA) gehostet. Beim Aufruf der Seite
        werden technisch notwendige Daten (z. B. IP-Adresse, Datum/Uhrzeit,
        aufgerufene Seite, Browser-Typ) durch den Hoster verarbeitet. Eine
        Übermittlung in die USA findet auf Basis der EU-Standard­vertrags­klauseln
        statt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
        Interesse an einer sicheren und zuverlässigen Bereitstellung der
        Website).
      </p>
      <p>
        Weitere Informationen:{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com/legal/privacy-policy
        </a>
        .
      </p>

      <h2>4. Server-Logfiles</h2>
      <p>
        Bei jedem Aufruf werden vom Hoster automatisch Informationen in
        sogenannten Server-Logfiles erfasst, die Ihr Browser übermittelt. Dies
        sind:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
        vorgenommen. Die Speicherung erfolgt zur Gewährleistung eines
        störungsfreien Betriebs und zur Optimierung der Website
        (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>5. Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen,
        werden Ihre Angaben inklusive der von Ihnen dort angegebenen
        Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
        Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht ohne
        Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
        DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an der Beantwortung).
      </p>
      <p>
        Das Kontaktformular dieser Website öffnet Ihr lokales E-Mail-Programm
        mit den von Ihnen eingegebenen Inhalten — es findet bei Absenden des
        Formulars keine Übermittlung an einen Server von uns statt. Erst wenn
        Sie die E-Mail aus Ihrem Programm versenden, werden die Daten an uns
        übertragen.
      </p>

      <h2>6. Cookies und Tracking</h2>
      <p>
        Diese Website verwendet keine Cookies zu Tracking- oder Marketing­zwecken
        und bindet keine externen Analyse-Dienste (z. B. Google Analytics,
        Meta Pixel) ein.
      </p>

      <h2>7. Schriftarten (Google Fonts, lokal eingebunden)</h2>
      <p>
        Diese Website nutzt zur einheitlichen Darstellung von Schriftarten
        sogenannte „Google Fonts", die durch Next.js automatisch lokal
        gehostet werden. Es findet beim Aufruf der Seite keine Verbindung zu
        Servern von Google statt.
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an{" "}
        <a href="mailto:hallo@vektorflowz.de">hallo@vektorflowz.de</a>.
      </p>

      <h2>9. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
        die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Eine
        Übersicht der zuständigen Behörden in Deutschland finden Sie unter{" "}
        <a
          href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          bfdi.bund.de
        </a>
        .
      </p>

      <h2>10. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
        vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte
        Verbindung erkennen Sie an „https://" und dem Schloss-Symbol in der
        Adresszeile Ihres Browsers.
      </p>

      <h2>11. Aktualität und Änderung dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig. Durch geänderte
        gesetzliche bzw. behördliche Vorgaben kann es notwendig werden, diese
        Datenschutzerklärung anzupassen.
      </p>

      <p className="text-xs text-muted pt-8">
        Bitte ersetzen Sie alle in eckigen Klammern markierten Platzhalter
        durch Ihre tatsächlichen Daten. Diese Vorlage ist keine
        Rechtsberatung — eine abschließende Prüfung durch eine fachkundige
        Stelle wird empfohlen.
      </p>
    </LegalLayout>
  );
}
