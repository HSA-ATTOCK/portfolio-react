import React, { useState, useEffect } from "react";
import "../styles/hero.css";

const Hero = () => {
  const [text, setText] = useState("");
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(100);

  const toRotate = ["Full-Stack Web Developer", "UI/UX Designer"];

  useEffect(() => {
    const tick = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setDelta(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
      }
    };

    const ticker = setTimeout(tick, delta);
    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, delta, toRotate]);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Hi, I'm <span>HAIDER</span>
          </h1>

          <h2 className="typewriter">
            a <span className="wrap">{text}</span>
          </h2>

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
          <svg
            className="neon-blob-svg"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <clipPath id="blobClip" clipPathUnits="userSpaceOnUse">
                <path
                  d="M49.4,-67.7C61.4,-58.8,66.7,-39.4,69.8,-20.7C72.8,-2,73.7,16,66.7,29.7C59.7,43.4,44.8,52.9,29.3,61.7C13.8,70.5,-2.3,78.6,-19.1,77.1C-35.9,75.5,-53.3,64.2,-62.9,49.3C-72.4,34.4,-74.1,15.9,-71.9,-2.3C-69.8,-20.6,-63.8,-38.6,-51.8,-47.8C-39.8,-57,-21.9,-57.3,-3.3,-54.3C15.4,-51.4,30.8,-45.7,49.4,-67.7Z"
                  transform="translate(100 95)"
                />
              </clipPath>
            </defs>

            {/* Glowing blob background */}
            <path
              fill="#00aaff"
              d="M49.4,-67.7C61.4,-58.8,66.7,-39.4,69.8,-20.7C72.8,-2,73.7,16,66.7,29.7C59.7,43.4,44.8,52.9,29.3,61.7C13.8,70.5,-2.3,78.6,-19.1,77.1C-35.9,75.5,-53.3,64.2,-62.9,49.3C-72.4,34.4,-74.1,15.9,-71.9,-2.3C-69.8,-20.6,-63.8,-38.6,-51.8,-47.8C-39.8,-57,-21.9,-57.3,-3.3,-54.3C15.4,-51.4,30.8,-45.7,49.4,-67.7Z"
              transform="translate(100 100)"
            />

            {/* Image clipped to blob */}
            <image
              href="/assets/img/pic.png"
              width="200"
              height="140"
              x=""
              y="40"
              clip-path="url(#blobClip)"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>

        {/* <div className="hero-image">
          <div className="image-hero-wrapper">
            <img
              src="/assets/img/pic.png"
              alt="Haider Sajjad"
              className="profile-img"
            />
          </div>
        </div> */}
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
        <a
          href="https://drive.google.com/file/d/1di9rasT37Ppg5Hm6mVdVHXpY2p_bbAAC/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CV"
        >
          <i className="bx bx-file"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
