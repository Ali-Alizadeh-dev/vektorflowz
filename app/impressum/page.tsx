import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Impressum — Vektorflowz" };

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <p className="text-sm text-muted">
        Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) / § 18 MStV.
      </p>

      <h2>Diensteanbieter</h2>
      <p>
        [Vor- und Nachname / Firmenname]
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ Ort]
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [+49 ...]
        <br />
        E-Mail: ali.alizadeh@vektorflowz.de
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
        <br />
        [DE000000000]
      </p>
      <p className="text-sm text-muted">
        Hinweis: Falls von der Kleinunternehmerregelung nach § 19 UStG
        Gebrauch gemacht wird, kann dieser Abschnitt entfallen.
      </p>

      <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
      <p>
        Berufsbezeichnung: [z. B. Selbstständiger Softwareentwickler]
        <br />
        Verliehen in: Deutschland
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        [Vor- und Nachname]
        <br />
        [Anschrift wie oben]
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
        §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
        Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
        unberührt.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Mein Angebot enthält ggf. Links zu externen Websites Dritter, auf
        deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese
        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>

      <p className="text-xs text-muted pt-8">
        Bitte ersetzen Sie alle in eckigen Klammern markierten Platzhalter
        durch Ihre tatsächlichen Daten, bevor Sie die Seite veröffentlichen.
      </p>
    </LegalLayout>
  );
}
