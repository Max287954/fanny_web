'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavbarMain() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom" id="main-navbar">
      <div className="container">
        <Link href="/" className="navbar-brand" onClick={handleNavClick}>
          František Smrž
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="main-nav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="main-nav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="/#dovednosti" className="nav-link" onClick={handleNavClick}>
                Dovednosti
              </a>
            </li>
            <li className="nav-item">
              <a href="/#zkusenosti" className="nav-link" onClick={handleNavClick}>
                Zkušenosti
              </a>
            </li>
            <li className="nav-item">
              <a href="/#kontakt" className="nav-link" onClick={handleNavClick}>
                Kontakt
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
