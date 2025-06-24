import React, { useState, useEffect, useCallback } from "react";
import "../styles/portfolio.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import loginimg from "/assets/img/work5.jpg";
import paraimg from "/assets/img/work4.png";
import chatimg from "/assets/img/work3.png";
import vidchatimg from "/assets/img/work2.jpg";
import emaildesimg from "/assets/img/work1.jpeg";
import taskimg from "/assets/img/work6.png";
import resumeimg from "/assets/img/work7.jpg";
import portdesimg from "/assets/img/work8.jpeg";
// import loginimg from "../components/assets/img/work5.jpg";

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const projects = [
    {
      title: "Figma Portfolio Design",
      description: "Modern portfolio website UI design created in Figma.",
      techStack: ["Figma"],
      previewImage: portdesimg,
      githubLink:
        "https://github.com/HSA-ATTOCK/figma-portfolio-website-design",
    },
    {
      title: "React Resume Builder",
      description: "Interactive resume builder with real-time preview.",
      techStack: ["React", "CSS", "Node.js"],
      previewImage: resumeimg,
      githubLink: "https://github.com/HSA-ATTOCK/react-resume-builder",
    },
    {
      title: "React Task Manager",
      description:
        "Productivity app combining Pomodoro timer with task management.",
      techStack: ["React", "CSS", "Node.js"],
      previewImage: taskimg,
      githubLink: "https://github.com/HSA-ATTOCK/react-pomodoro-task-manager",
    },
    {
      title: "Figma Email Design",
      description: "Responsive email template designed in Figma.",
      techStack: ["Figma"],
      previewImage: emaildesimg,
      githubLink: "https://github.com/HSA-ATTOCK/figma-email-template-design",
    },
    {
      title: "WebRTC Video Chat",
      description: "Minimal peer-to-peer video chat application.",
      techStack: ["HTML", "JavaScript", "WebRTC"],
      previewImage: vidchatimg,
      githubLink: "https://github.com/HSA-ATTOCK/Minimal-WebRTC-Video-Chat",
    },
    {
      title: "Chat App",
      description: "Real-time messaging application with Firebase.",
      techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
      previewImage: chatimg,
      githubLink: "https://github.com/HSA-ATTOCK/chat-app",
    },
    {
      title: "Paragraph Analyzer",
      description: "Text analysis tool for word and character counting.",
      techStack: ["HTML", "CSS", "JavaScript"],
      previewImage: paraimg,
      githubLink: "https://github.com/HSA-ATTOCK/paragraph-analyzer",
    },
    {
      title: "Login Form",
      description: "Form with real-time validation and error feedback.",
      techStack: ["HTML", "CSS", "JavaScript"],
      previewImage: loginimg,
      githubLink: "https://github.com/HSA-ATTOCK/login-form-validation",
    },
  ];

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    setWindowWidth(width);

    if (width < 768) {
      setItemsPerPage(1);
    } else if (width < 992) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  }, []);

  useEffect(() => {
    handleResize(); // Set initial value

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, [handleResize]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(projects.length / itemsPerPage)
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, itemsPerPage, projects.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(projects.length / itemsPerPage)) %
        Math.ceil(projects.length / itemsPerPage)
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, itemsPerPage, projects.length]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, currentIndex]
  );

  const visibleProjects = projects.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  // Add empty boxes if needed to maintain layout
  const displayProjects = [...visibleProjects];
  while (displayProjects.length < itemsPerPage) {
    displayProjects.push({ empty: true });
  }

  // Auto-rotate slides
  useEffect(() => {
    if (windowWidth > 768) {
      // Only auto-rotate on larger screens
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, windowWidth]);

  return (
    <section className="portfolio" id="portfolio">
      <h2 className="heading">
        Latest <span>Projects</span>
      </h2>

      <div className="portfolio-slider">
        <button
          className="slider-btn left"
          onClick={prevSlide}
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <FaChevronLeft />
        </button>

        <div
          className={`portfolio-container ${
            isTransitioning ? "transitioning" : ""
          }`}
        >
          {displayProjects.map((project, index) => (
            <div
              className={`portfolio-box ${project.empty ? "empty-box" : ""}`}
              key={project.empty ? `empty-${index}` : project.title}
            >
              {!project.empty && (
                <>
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x400?text=Project+Image";
                    }}
                  />

                  <div className="project-preview">
                    <h4>{project.title}</h4>
                    <div className="tech-stack">
                      {project.techStack.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="portfolio-layer">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div className="portfolio-links">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                      >
                        <i className="bx bxl-github"></i>
                      </a>
                      <a
                        href="#"
                        aria-label="Live demo"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Live demo would open here");
                        }}
                      >
                        <i className="bx bx-link-external"></i>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          className="slider-btn right"
          onClick={nextSlide}
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="slider-dots">
        {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          )
        )}
      </div>
    </section>
  );
};

export default Portfolio;
