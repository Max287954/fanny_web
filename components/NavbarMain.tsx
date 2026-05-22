'use client';

import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

export default function NavbarMain() {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
      className="navbar-custom"
      id="main-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} href="/" onClick={handleNavClick}>
          František Novotný
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/#dovednosti" onClick={handleNavClick}>
              Dovednosti
            </Nav.Link>
            <Nav.Link href="/#zkusenosti" onClick={handleNavClick}>
              Zkušenosti
            </Nav.Link>
            <Nav.Link href="/#kontakt" onClick={handleNavClick}>
              Kontakt
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/ochrana-soukromi"
              onClick={handleNavClick}
            >
              Ochrana soukromí
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
