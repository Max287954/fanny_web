# Architektura — František Smrž Portfolio

## Přehled

Osobní online CV (životopis) postavený na frameworku **Next.js 14** s App Routerem, TypeScriptem a CSS frameworkem **Bootstrap 5**. Stránky jsou generovány jako **statický export (SSG)** pro nasazení na **Cloudflare Pages**.

## Technologie

| Technologie        | Verze    | Účel                               |
| ------------------- | -------- | ---------------------------------- |
| Next.js             | 14.x     | Framework, App Router, SSG         |
| TypeScript          | 5.x      | Typová bezpečnost                  |
| React               | 18.x     | UI knihovna                        |
| Bootstrap           | 5.3.x    | CSS framework                      |
| Web3Forms           | API      | Zpracování kontaktního formuláře   |
| Cloudflare Pages    | —        | Hosting (statický)                 |

## SSG — Statický export

Konfigurace v `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',       // Generuje statické HTML do /out
  trailingSlash: true,     // /ochrana-soukromi → /ochrana-soukromi/index.html
  images: { unoptimized: true }, // Povinné pro statický export
};
```

**Důležité:**
- `output: 'export'` znamená, že se nepoužívá žádný serverový runtime
- Všechny stránky jsou pre-renderovány při `npm run build`
- Výstupní adresář `/out` se nahrává na Cloudflare Pages

### Nasazení na Cloudflare Pages

1. Připojte Git repozitář ke Cloudflare Pages
2. Nastavení buildu:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
3. Přidejte proměnnou prostředí `NEXT_PUBLIC_WEB3FORMS_KEY`

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

Navbar (`components/NavbarMain.tsx`) pak stačí rozšířit o nový `<Nav.Link>`.

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
│   ├── _headers                 # Cloudflare Pages bezpečnostní hlavičky
│   ├── robots.txt               # SEO — povolení indexace
│   ├── humans.txt               # Vývojářské kredity
│   └── .well-known/
│       └── security.txt         # Bezpečnostní kontakt (RFC 9116)
├── .env.local.example           # Šablona proměnných prostředí
├── .gitignore
├── ARCHITECTURE.md              # Tento dokument
├── next.config.mjs              # SSG konfigurace
├── package.json
└── tsconfig.json
```
