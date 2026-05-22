'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  message: string;
  consent: boolean;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === 'checkbox'
        ? target.checked
        : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.consent) return;

    setStatus('sending');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      console.warn(
        'Web3Forms: Nastavte NEXT_PUBLIC_WEB3FORMS_KEY v .env.local'
      );
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Nová zpráva z portfolia — ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', consent: false });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section-block contact-section" id="kontakt">
      <Container>
        <Row className="justify-content-center">
          <Col lg={7}>
            <div className="text-center mb-5">
              <h2 className="section-title" style={{ color: '#fff' }}>
                Napište mi
              </h2>
              <p className="section-subtitle mx-auto" style={{ opacity: 0.8 }}>
                Máte dotaz nebo nabídku spolupráce? Neváhejte mě kontaktovat
                prostřednictvím formuláře níže.
              </p>
            </div>

            {status === 'success' && (
              <Alert className="alert-glass text-center mb-4" id="contact-success">
                ✅ Děkuji za zprávu! Ozvu se vám co nejdříve.
              </Alert>
            )}

            {status === 'error' && (
              <Alert variant="danger" className="text-center mb-4" id="contact-error">
                ❌ Odeslání se nezdařilo. Zkuste to prosím znovu nebo mě
                kontaktujte přímo e-mailem.
              </Alert>
            )}

            <Form onSubmit={handleSubmit} id="contact-form">
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="contact-name">
                    <Form.Label className="visually-hidden">
                      Jméno a příjmení
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Jméno a příjmení"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="contact-email">
                    <Form.Label className="visually-hidden">
                      E-mail
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Váš e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="contact-message">
                    <Form.Label className="visually-hidden">Zpráva</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      placeholder="Vaše zpráva..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Check
                    type="checkbox"
                    id="contact-consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    label={
                      <>
                        Souhlasím se zpracováním osobních údajů za účelem
                        odpovědi na mou zprávu.{' '}
                        <Link href="/ochrana-soukromi">
                          Zásady ochrany soukromí
                        </Link>
                      </>
                    }
                    required
                  />
                </Col>
                <Col xs={12} className="text-center mt-3">
                  <Button
                    type="submit"
                    className="btn-accent px-5"
                    size="lg"
                    disabled={status === 'sending' || !formData.consent}
                    id="contact-submit"
                  >
                    {status === 'sending' ? 'Odesílám...' : 'Odeslat zprávu'}
                  </Button>
                </Col>
              </Row>
            </Form>

            <p
              className="text-center mt-4 small"
              style={{ opacity: 0.6 }}
              id="gdpr-notice"
            >
              Vaše údaje budou použity výhradně pro odpověď na vaši zprávu
              a&nbsp;nebudou sdíleny s třetími stranami. Podrobnosti naleznete
              v&nbsp;
              <Link
                href="/ochrana-soukromi"
                style={{ color: 'var(--brand-accent)' }}
              >
                zásadách ochrany soukromí
              </Link>
              .
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
