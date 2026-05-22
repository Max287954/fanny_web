import { Container } from 'react-bootstrap';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="site-footer">
      <Container className="text-center">
        <p className="mb-1">
          &copy; {currentYear} František Novotný. Všechna práva vyhrazena.
        </p>
        <p className="mb-0">
          <Link href="/ochrana-soukromi">Ochrana soukromí</Link>
        </p>
      </Container>
    </footer>
  );
}
