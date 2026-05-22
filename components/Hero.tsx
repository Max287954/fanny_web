export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="container position-relative">
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
          <a href="#kontakt" className="btn btn-accent btn-lg">
            Kontaktujte mě
          </a>
          <a
            href="#zkusenosti"
            className="btn btn-link btn-outline-light-custom btn-lg text-decoration-none"
          >
            Moje zkušenosti
          </a>
        </div>
      </div>
    </section>
  );
}
