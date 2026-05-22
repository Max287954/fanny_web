import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import NavbarMain from '@/components/NavbarMain';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'František Novotný — Elektrikář & Vedoucí směny',
    template: '%s | František Novotný',
  },
  description:
    'Online životopis Františka Novotného — zkušený elektrikář a vedoucí směny s 8 lety praxe ve společnosti Husqvarna. Specializace na průmyslovou elektroinstalaci, automatizaci a vedení týmů.',
  metadataBase: new URL('https://frantisek-novotny.cz'),
  openGraph: {
    title: 'František Novotný — Elektrikář & Vedoucí směny',
    description:
      'Online životopis zkušeného elektrikáře a vedoucího směny s praxí v průmyslové automatizaci.',
    url: 'https://frantisek-novotny.cz',
    siteName: 'František Novotný — Portfolio',
    locale: 'cs_CZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NavbarMain />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
