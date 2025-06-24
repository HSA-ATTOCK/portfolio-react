import React, { useState } from "react";
import "../styles/header.css";

const Header = () => {
  const [activeNav, setActiveNav] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <a href="#" className="logo">
        HSA.
      </a>

      {/* Desktop Navigation - always visible */}
      <nav className="desktop-nav">
        <a
          href="#home"
          className={activeNav === "#home" ? "active" : ""}
          onClick={() => setActiveNav("#home")}
        >
          Home
        </a>
        <a
          href="#about"
          className={activeNav === "#about" ? "active" : ""}
          onClick={() => setActiveNav("#about")}
        >
          About
        </a>
        <a
          href="#services"
          className={activeNav === "#services" ? "active" : ""}
          onClick={() => setActiveNav("#services")}
        >
          Services
        </a>
        <a
          href="#skills"
          className={activeNav === "#skills" ? "active" : ""}
          onClick={() => setActiveNav("#skills")}
        >
          Skills
        </a>
        <a
          href="#portfolio"
          className={activeNav === "#portfolio" ? "active" : ""}
          onClick={() => setActiveNav("#portfolio")}
        >
          Portfolio
        </a>
        <a
          href="#contact"
          className={activeNav === "#contact" ? "active" : ""}
          onClick={() => setActiveNav("#contact")}
        >
          Contact
        </a>
      </nav>

      {/* Mobile Navigation Button - only visible on mobile */}
      <button
        className={`mobile-menu-button ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Mobile Navigation Menu - only visible when open */}
      <nav className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        <a
          href="#home"
          className={activeNav === "#home" ? "active" : ""}
          onClick={() => {
            setActiveNav("#home");
            setMobileMenuOpen(false);
          }}
        >
          Home
        </a>
        <a
          href="#about"
          className={activeNav === "#about" ? "active" : ""}
          onClick={() => {
            setActiveNav("#about");
            setMobileMenuOpen(false);
          }}
        >
          About
        </a>
        <a
          href="#services"
          className={activeNav === "#services" ? "active" : ""}
          onClick={() => {
            setActiveNav("#services");
            setMobileMenuOpen(false);
          }}
        >
          Services
        </a>
        <a
          href="#skills"
          className={activeNav === "#skills" ? "active" : ""}
          onClick={() => {
            setActiveNav("#skills");
            setMobileMenuOpen(false);
          }}
        >
          Skills
        </a>
        <a
          href="#portfolio"
          className={activeNav === "#portfolio" ? "active" : ""}
          onClick={() => {
            setActiveNav("#portfolio");
            setMobileMenuOpen(false);
          }}
        >
          Portfolio
        </a>
        <a
          href="#contact"
          className={activeNav === "#contact" ? "active" : ""}
          onClick={() => {
            setActiveNav("#contact");
            setMobileMenuOpen(false);
          }}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
