import { Container, Button } from 'react-bootstrap';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <Container className="position-relative">
        <div className="hero-badge">Elektrikář &bull; Vedoucí směny</div>

        <h1 className="hero-name">
          František
          <br />
          <span className="text-gradient">Novotný</span>
        </h1>

        <p className="hero-tagline">
          Zkušený elektrikář s více než 8 lety praxe v průmyslové výrobě.
          Vedoucí směny ve společnosti Husqvarna s důrazem na kvalitu, bezpečnost
          a&nbsp;efektivní řízení týmu.
        </p>

        <div className="hero-cta d-flex gap-3 flex-wrap">
          <Button href="#kontakt" className="btn-accent" size="lg">
            Kontaktujte mě
          </Button>
          <Button
            href="#zkusenosti"
            variant="link"
            className="btn-outline-light-custom"
            size="lg"
          >
            Moje zkušenosti
          </Button>
        </div>
      </Container>
    </section>
  );
}
