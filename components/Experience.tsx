interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

const timeline: TimelineEntry[] = [
  {
    period: '2018 — dosud',
    role: 'Vedoucí směny — Elektroúdržba',
    company: 'Husqvarna Manufacturing CZ s.r.o.',
    description:
      'Řízení směnového týmu elektrikářů v rámci údržby výrobních linek pro zahradní techniku.',
    highlights: [
      'Koordinace 6členného týmu elektrikářů na třísměnném provozu',
      'Snížení prostojů výrobních linek o 15 % díky preventivní údržbě',
      'Zavádění standardů BOZP a školení nových zaměstnanců',
      'Spolupráce s technologickým oddělením na optimalizaci procesů',
    ],
  },
  {
    period: '2015 — 2018',
    role: 'Elektrikář — Údržba',
    company: 'Husqvarna Manufacturing CZ s.r.o.',
    description:
      'Samostatná údržba a opravy elektrických zařízení na výrobních linkách.',
    highlights: [
      'Diagnostika a opravy závad na CNC strojích a robotických buňkách',
      'Provádění pravidelných revizí elektrických zařízení',
      'Zapojení do projektu modernizace řídicích systémů',
    ],
  },
  {
    period: '2012 — 2015',
    role: 'Elektrikář',
    company: 'Předchozí zaměstnání',
    description:
      'Instalace a údržba elektrorozvodů v komerčních a průmyslových objektech.',
    highlights: [
      'Realizace kompletních elektroinstalací v nových objektech',
      'Práce s nízkonapěťovými i vysokonapěťovými systémy',
      'Spolupráce s projektanty a stavbyvedoucími',
    ],
  },
];

export default function Experience() {
  return (
    <section className="section-block experience-section" id="zkusenosti">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h2 className="section-title">Pracovní zkušenosti</h2>
            <p className="section-subtitle">
              Více než 13 let praxe v oboru elektrotechniky — od instalací
              po vedení směnového provozu.
            </p>
          </div>

          <div className="col-lg-8">
            <div className="ps-lg-4">
              {timeline.map((entry, index) => (
                <div
                  key={index}
                  className="timeline-item"
                  id={`experience-${index}`}
                >
                  <span className="timeline-date">{entry.period}</span>
                  <h3 className="h5 fw-bold mt-1 mb-0">{entry.role}</h3>
                  <p className="text-muted mb-2">
                    <em>{entry.company}</em>
                  </p>
                  <p className="mb-2">{entry.description}</p>
                  <ul className="text-muted small">
                    {entry.highlights.map((item, i) => (
                      <li key={i} className="mb-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
