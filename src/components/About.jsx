"use client";
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
          <h3 className="about-subtitle">AI Automation Engineer & Full-Stack Developer</h3>
          <div className="about-description">
            <p>
              I'm Haider Sajjad, an AI Automation Engineer and Full-Stack Web
              Developer dedicated to building intelligent systems and clean,
              responsive web applications. I specialize in workflow automation,
              AI integrations, and end-to-end web development using technologies
              like React, Next.js, Node.js, and Express.
            </p>
            <p>
              I design and deploy automated pipelines using tools like n8n,
              connecting AI models, APIs, and business workflows to save time
              and scale operations. My work spans from building custom AI
              chatbots and automation platforms to full production web apps.
            </p>
            <p>
              Whether automating complex processes or crafting intuitive
              interfaces, I'm committed to delivering solutions that are
              technically sound, efficient, and built to last.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
