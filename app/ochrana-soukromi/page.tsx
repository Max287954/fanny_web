import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ochrana soukromí',
  description:
    'Zásady ochrany osobních údajů — František Novotný. Informace o zpracování dat z kontaktního formuláře.',
};

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <div className="container">
        <h1>Zásady ochrany osobních údajů</h1>
        <p>
          <em>Poslední aktualizace: {new Date().getFullYear()}</em>
        </p>

        <h2>1. Správce údajů</h2>
        <p>
          Správcem osobních údajů je František Novotný (dále jen
          „správce"). Kontaktní e-mail:{' '}
          <a href="mailto:novotny.ondrej.it@gmail.com">
            novotny.ondrej.it@gmail.com
          </a>
        </p>

        <h2>2. Jaké údaje shromažďujeme</h2>
        <p>
          Prostřednictvím kontaktního formuláře na těchto stránkách
          shromažďujeme výhradně:
        </p>
        <ul>
          <li>Jméno a příjmení</li>
          <li>E-mailovou adresu</li>
          <li>Text zprávy</li>
        </ul>

        <h2>3. Účel zpracování</h2>
        <p>
          Vaše osobní údaje zpracováváme výhradně za účelem odpovědi
          na vaši zprávu zaslanou prostřednictvím kontaktního formuláře.
          Údaje nejsou využívány k&nbsp;marketingovým účelům ani nejsou
          předávány třetím stranám.
        </p>

        <h2>4. Právní základ</h2>
        <p>
          Zpracování osobních údajů probíhá na základě vašeho
          výslovného souhlasu uděleného zaškrtnutím příslušného pole
          v&nbsp;kontaktním formuláři (čl. 6 odst. 1 písm. a) GDPR).
        </p>

        <h2>5. Doba uchovávání</h2>
        <p>
          Vaše údaje uchováváme po dobu nezbytnou pro vyřízení vaší
          zprávy, maximálně však 12 měsíců od jejich poskytnutí.
          Poté budou bezpečně smazány.
        </p>

        <h2>6. Zpracovatel údajů</h2>
        <p>
          Pro doručování zpráv z kontaktního formuláře využíváme službu
          Web3Forms (Web3Forms by Starter Templates LLC). Tato služba
          zpracovává údaje výhradně za účelem doručení zprávy správci
          a&nbsp;neuchovává je déle, než je nezbytné.
        </p>

        <h2>7. Cookies a sledování</h2>
        <p>
          Tyto stránky <strong>nepoužívají cookies</strong> ani žádné
          nástroje pro sledování návštěvníků (analytics, remarketing
          apod.).
        </p>

        <h2>8. Vaše práva</h2>
        <p>
          V&nbsp;souladu s&nbsp;nařízením GDPR máte právo:
        </p>
        <ul>
          <li>Na přístup ke svým osobním údajům</li>
          <li>Na opravu nepřesných údajů</li>
          <li>Na výmaz údajů („právo být zapomenut")</li>
          <li>Na omezení zpracování</li>
          <li>Na přenositelnost údajů</li>
          <li>Odvolat svůj souhlas se zpracováním kdykoli</li>
          <li>
            Podat stížnost u&nbsp;Úřadu pro ochranu osobních údajů
            (
            <a
              href="https://www.uoou.cz"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.uoou.cz
            </a>
            )
          </li>
        </ul>

        <h2>9. Kontakt</h2>
        <p>
          Pro uplatnění svých práv nebo s&nbsp;dotazy ohledně ochrany
          osobních údajů mě kontaktujte na:{' '}
          <a href="mailto:novotny.ondrej.it@gmail.com">
            novotny.ondrej.it@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
