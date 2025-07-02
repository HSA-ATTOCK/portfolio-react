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

        <div className="hero-image" style={{ position: "relative" }}>
          {/* SVG blob with image mask and neon effect */}
          <svg
            className="neon-blob-svg"
            viewBox="0 0 295 355"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", zIndex: 1 }}
          >
            <defs>
              {/* Neon Glow Filter */}
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Image mask using your Figma blob shape */}
              <mask
                id="blobImageMask"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="295"
                height="355"
              >
                <path
                  d="M156.5 1.00001C144 -0.999993 129.53 1.86636 121.5 1.50001C113.171 1.12002 100.54 11.9442 92.284 21.2214C55.7077 38.9274 18.3558 82.7367 7.13753 127.952C-6.52588 183.023 -0.862598 231.952 26.6374 276.952C53.5263 320.952 91.6374 338.163 111.637 343.952L112.479 344.196C131.993 349.846 144.497 353.466 169.637 354.452C192.12 355.334 212.5 349.5 226.5 345.5C240.5 341.5 295 325.997 295 290.5C295 264.345 235.137 257.5 221.5 243C218.943 240.281 213.5 238.5 213 235.5C204.657 225.494 203.531 218.563 201.5 208C200 204 200.5 196.5 201.5 192.5C205.5 187.5 204.5 175.75 207 172.5C212 166 228.725 148.418 227.5 122.5C226.707 105.717 233.074 92.6616 234 90.5C236.357 85 241.945 47.9774 217 26C209.048 18.994 197.367 14.3694 188.5 9C178.156 2.73591 169 3.00001 156.5 1.00001Z"
                  fill="#00AAFF"
                />
              </mask>

              {/* Image Pattern for fill */}
              <pattern
                id="blobImagePattern"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <image
                  id="blobImage"
                  width="1309"
                  height="1566"
                  preserveAspectRatio="none"
                  xlinkHref="/assets/img/pic.png"
                  transform="scale(0.000904014, 0.00063857) translate(-101.4, 0)"
                />
              </pattern>
            </defs>

            {/* Blob shape with neon glow */}
            <path
              d="M119 42C106.5 40 112 20 104 17.5C101 12.5 90 11.5 81.5 14.5C44.9237 32.206 18.3558 82.7366 7.13754 127.952C-6.52587 183.023 -0.862583 231.952 26.6374 276.952C53.5263 320.952 91.6374 338.163 111.637 343.952L112.479 344.196C131.993 349.846 144.497 353.466 169.637 354.452C192.12 355.334 212.5 349.5 226.5 345.5C240.5 341.5 295 325.997 295 290.5C295 275.943 273.35 261.228 252.5 252C235.889 244.649 219.604 241.495 216.5 239.5C209.5 235 183.5 239 181 226C179.5 222 182 208.5 183 204.5C187 199.5 167 180.75 169.5 177.5C174.5 171 170.725 158.918 169.5 133C168.707 116.217 180.5 136 166.5 108.5C152.5 81 167.445 86.9774 142.5 65C134.548 57.994 137.867 56.3694 129 51C118.656 44.7359 131.5 44 119 42Z"
              fill="#00AAFF"
              filter="url(#neonGlow)"
            />

            {/* Image masked into blob */}
            <g mask="url(#blobImageMask)">
              <rect
                x="40"
                y="0"
                width="255"
                height="361"
                fill="url(#blobImagePattern)"
              />
            </g>
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
