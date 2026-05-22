'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="text-center mb-5">
              <h2 className="section-title" style={{ color: '#fff' }}>
                Napište mi
              </h2>
              <p className="section-subtitle mx-auto" style={{ opacity: 0.8 }}>
                Máte dotaz nebo zprávu? Neváhejte mě kontaktovat
                prostřednictvím formuláře níže.
              </p>
            </div>

            {status === 'success' && (
              <div className="alert alert-glass text-center mb-4" id="contact-success">
                ✅ Děkuji za zprávu! Ozvu se vám co nejdříve.
              </div>
            )}

            {status === 'error' && (
              <div className="alert alert-danger text-center mb-4" id="contact-error">
                ❌ Odeslání se nezdařilo. Zkuste to prosím znovu nebo mě
                kontaktujte přímo e-mailem.
              </div>
            )}

            <form onSubmit={handleSubmit} id="contact-form">
              {/* Web3Forms Honeypot */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="visually-hidden">
                      Jméno a příjmení
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="form-control"
                      placeholder="Jméno a příjmení"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contact-email" className="visually-hidden">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="form-control"
                      placeholder="Váš e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="contact-message" className="visually-hidden">
                      Zpráva
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      className="form-control"
                      placeholder="Vaše zpráva..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="contact-consent"
                      name="consent"
                      className="form-check-input"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="contact-consent">
                      Souhlasím se zpracováním osobních údajů za účelem
                      odpovědi na mou zprávu.{' '}
                      <Link href="/ochrana-soukromi">
                        Zásady ochrany soukromí
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="col-12 text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-accent px-5 btn-lg"
                    disabled={status === 'sending' || !formData.consent}
                    id="contact-submit"
                  >
                    {status === 'sending' ? 'Odesílám...' : 'Odeslat zprávu'}
                  </button>
                </div>
              </div>
            </form>

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
          </div>
        </div>
      </div>
    </section>
  );
}
