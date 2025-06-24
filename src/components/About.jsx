import React from "react";
import "../styles/about.css";
// import aboutImage from "../assets/img/work.jpg"; // Import your image properly

const About = () => {
  return (
    <section className="about" id="about">
      <h2 className="section-title">
        About <span className="highlight">Me</span>
      </h2>

      <div className="about-container">
        <div className="about-image">
          <div className="image-about-wrapper">
            <img
              src="/assets/img/work.jpg"
              alt="about"
              className="profile-image"
            />
            <div className="animated-border"></div>
          </div>
        </div>

        <div className="about-text">
          <h3 className="about-subtitle">Full-Stack Developer & Designer</h3>
          <div className="about-description">
            <p>
              I'm Haider Sajjad Azmat, a passionate Full-Stack Web Developer and
              Designer dedicated to crafting clean, responsive, and visually
              engaging web applications. With expertise in both front-end and
              back-end development, I work with technologies like HTML, CSS,
              JavaScript, React, Node.js, and Express.
            </p>
            <p>
              My approach combines technical skills with thoughtful UI/UX design
              principles to create impactful digital experiences. On GitHub, I
              actively share my projects and learning journey as I continue to
              explore emerging technologies and development practices.
            </p>
            <p>
              Whether building functional systems or designing intuitive
              interfaces, I'm committed to delivering solutions that are both
              technically sound and aesthetically pleasing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
