import React from "react";
import "../styles/hero.css";
// import profileimg from "/assets/img/pic.png";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Hi, I'm <span>HAIDER</span>
          </h1>
          <h2>Full-Stack Web Developer</h2>
          <p>
            I build modern, responsive websites and web applications with
            cutting-edge technologies.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Hire Me
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let's Talk
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-hero-wrapper">
            <img
              src="/assets/img/pic.png"
              alt="Haider Sajjad"
              className="profile-img"
            />
          </div>
        </div>
      </div>

      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/haidersajjadazmat/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="bx bxl-linkedin"></i>
        </a>
        <a
          href="https://www.upwork.com/freelancers/~011382bef96a02b3f6"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Upwork"
        >
          <i className="bx bxl-upwork"></i>
        </a>
        <a
          href="https://github.com/HSA-ATTOCK"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="bx bxl-github"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
