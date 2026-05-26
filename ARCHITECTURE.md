# Architektura — František Smrž Portfolio

## Přehled

Osobní online CV (životopis) postavený na frameworku **Next.js 15** s App Routerem, TypeScriptem a CSS frameworkem **Bootstrap 5**. Stránky jsou nasazeny na **Cloudflare Pages** prostřednictvím adaptéru **@opennextjs/cloudflare**.

## Technologie

| Technologie             | Verze    | Účel                               |
| ----------------------- | -------- | ---------------------------------- |
| Next.js                 | 15.x     | Framework, App Router              |
| TypeScript              | 5.x      | Typová bezpečnost                  |
| React                   | 18.x     | UI knihovna                        |
| Bootstrap               | 5.3.x    | CSS framework                      |
| Web3Forms               | API      | Zpracování kontaktního formuláře   |
| @opennextjs/cloudflare  | latest   | Adaptér pro Cloudflare Pages       |
| Wrangler                | 3.x      | CLI pro nasazení na Cloudflare     |

## Nasazení — Cloudflare Pages (OpenNext)

Projekt používá **@opennextjs/cloudflare** pro nasazení na Cloudflare Pages. Konfigurace je definována v:

- `open-next.config.ts` — konfigurace OpenNext adaptéru
- `wrangler.json` — konfigurace Cloudflare Pages

```json
// wrangler.json (klíčové nastavení)
{
  "pages_build_output_dir": ".open-next",
  "compatibility_flags": ["nodejs_compat"]
}
```

### Cloudflare Pages — nastavení buildu v dashboardu

- **Build command:** `npx opennextjs-cloudflare build`
- **Build output directory:** *(ponechat prázdné — řídí se přes wrangler.json)*

### Příkazy pro lokální vývoj a manuální nasazení

```bash
npm run preview   # Lokální preview přes wrangler pages dev
npm run deploy    # Manuální nasazení na Cloudflare Pages
```

### Konfigurace Next.js

```js
// next.config.mjs
const nextConfig = {
  trailingSlash: true, // /ochrana-soukromi → /ochrana-soukromi/
};
```

**Důležité:**
- `trailingSlash: true` zajišťuje konzistentní URL formát
- Stránky jsou nasazeny na Cloudflare Pages přes OpenNext adaptér
- Pro nasazení je nutný `compatibility_flag: nodejs_compat`

## Směrování (Routing)

### Hybridní přístup: One-pager + Multi-page

Stránky využívají **hybridní směrování**:

1. **Hlavní stránka** (`/`) — one-pager s hladkým scrollováním
   - Sekce: Hero → Dovednosti → Zkušenosti → Kontakt
   - Navigace přes anchor linky (`#dovednosti`, `#zkusenosti`, `#kontakt`)
   - CSS `scroll-behavior: smooth` + `scroll-padding-top` pro offset navbaru

2. **Další stránky** — standardní file-system routing
   - `/ochrana-soukromi` — GDPR zásady ochrany soukromí
   - Nové stránky stačí přidat jako `app/nazev-stranky/page.tsx`

### Přidání nové stránky

```
app/
  nova-stranka/
    page.tsx    ← automaticky dostupná na /nova-stranka
```

Navbar (`components/NavbarMain.tsx`) pak stačí rozšířit o nový odkaz.

## Stylování — Bootswatch strategie

### Aktuální stav

Stránky používají **výchozí Bootstrap 5** CSS importovaný v `app/layout.tsx`:

```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

Vlastní vizuální identita je definována v `app/globals.css` přes CSS custom properties.

### Přepnutí na Bootswatch téma

1. Nainstalujte Bootswatch:
   ```bash
   npm install bootswatch
   ```

2. V `app/layout.tsx` změňte import:
   ```tsx
   // Před:
   import 'bootstrap/dist/css/bootstrap.min.css';

   // Po (příklad — téma "darkly"):
   import 'bootswatch/dist/darkly/bootstrap.min.css';
   ```

3. Dostupná témata: `cerulean`, `cosmo`, `cyborg`, `darkly`, `flatly`, `journal`, `litera`, `lumen`, `lux`, `materia`, `minty`, `morph`, `pulse`, `quartz`, `sandstone`, `simplex`, `sketchy`, `slate`, `solar`, `spacelab`, `superhero`, `united`, `vapor`, `yeti`, `zephyr`

4. CSS custom properties v `globals.css` je vhodné upravit tak, aby ladily s vybraným tématem.

## Kontaktní formulář — Web3Forms

- Klientská komponenta (`'use client'`) v `components/Contact.tsx`
- Odesílá data přes `fetch` POST na `https://api.web3forms.com/submit`
- API klíč čte z proměnné prostředí `NEXT_PUBLIC_WEB3FORMS_KEY`
- GDPR souhlas je vyžadován před odesláním (checkbox)
- Stavy: `idle` → `sending` → `success` / `error`

### Nastavení

1. Zaregistrujte se na [web3forms.com](https://web3forms.com/)
2. Vytvořte formulář a zkopírujte Access Key
3. Vytvořte `.env.local` dle šablony `.env.local.example`

## SEO — Sitemap

Sitemap je generován nativně přes Next.js v `app/sitemap.ts`. Generuje se automaticky na `/sitemap.xml`.

## Bezpečnostní hlavičky

Soubor `public/_headers` definuje Cloudflare Pages hlavičky:

- **CSP** — omezuje zdroje na `'self'`, povoluje Google Fonts, Web3Forms API
- **HSTS** — vynucuje HTTPS s preload
- **X-Frame-Options** — zabraňuje vkládání do iframe
- **Permissions-Policy** — zakazuje kameru, mikrofon, geolokaci

## Struktura projektu

```
fanda_stranka/
├── app/
│   ├── globals.css              # Globální styly + CSS custom properties
│   ├── layout.tsx               # Root layout (metadata, navbar, footer)
│   ├── page.tsx                 # Hlavní one-pager
│   ├── sitemap.ts               # SEO sitemap generátor
│   └── ochrana-soukromi/
│       └── page.tsx             # GDPR zásady ochrany soukromí
├── components/
│   ├── NavbarMain.tsx           # Responzivní navigace
│   ├── Footer.tsx               # Patička
│   ├── Hero.tsx                 # Úvodní sekce
│   ├── Skills.tsx               # Dovednosti (grid)
│   ├── Experience.tsx           # Pracovní zkušenosti (timeline)
│   └── Contact.tsx              # Kontaktní formulář (Web3Forms)
├── public/
│   ├── _headers                 # Cloudflare bezpečnostní hlavičky
│   ├── robots.txt               # SEO — povolení indexace
│   ├── humans.txt               # Vývojářské kredity
│   └── .well-known/
│       └── security.txt         # Bezpečnostní kontakt (RFC 9116)
├── .env.local.example           # Šablona proměnných prostředí
├── .nvmrc                       # Verze Node.js (22)
├── .gitignore
├── ARCHITECTURE.md              # Tento dokument
├── next.config.mjs              # Konfigurace Next.js
├── open-next.config.ts          # Konfigurace OpenNext adaptéru
├── wrangler.json                # Konfigurace Cloudflare Workers
├── package.json
└── tsconfig.json
```
