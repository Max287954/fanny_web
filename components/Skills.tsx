import { Container, Row, Col, Card } from 'react-bootstrap';

interface Skill {
  icon: string;
  title: string;
  description: string;
}

const skills: Skill[] = [
  {
    icon: '⚡',
    title: 'Průmyslová elektroinstalace',
    description:
      'Instalace, údržba a opravy silnoproudých a slaboproudých rozvodů v průmyslovém prostředí.',
  },
  {
    icon: '🔧',
    title: 'Údržba strojů',
    description:
      'Diagnostika a opravy elektrických závad na výrobních linkách a CNC strojích.',
  },
  {
    icon: '🤖',
    title: 'Automatizace',
    description:
      'Základy PLC programování a práce s řídicími systémy v automatizované výrobě.',
  },
  {
    icon: '👷',
    title: 'Vedení týmu',
    description:
      'Koordinace směnového provozu, plánování úkolů a zajištění bezpečnosti práce.',
  },
  {
    icon: '🛡️',
    title: 'BOZP & Normy',
    description:
      'Znalost bezpečnostních předpisů, norem ČSN a postupů pro práci pod napětím.',
  },
  {
    icon: '📋',
    title: 'Revize & Dokumentace',
    description:
      'Příprava revizních zpráv, vedení technické dokumentace a evidence údržby.',
  },
];

export default function Skills() {
  return (
    <section className="section-block" id="dovednosti">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Odborné dovednosti</h2>
          <p className="section-subtitle mx-auto">
            Klíčové kompetence získané během let praxe v průmyslové elektrotechnice
            a&nbsp;vedení výrobních směn.
          </p>
        </div>

        <Row className="g-4">
          {skills.map((skill, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="card-hover h-100 p-4" id={`skill-card-${index}`}>
                <Card.Body>
                  <div className="skill-icon">{skill.icon}</div>
                  <Card.Title className="fw-bold mb-2">
                    {skill.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {skill.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
