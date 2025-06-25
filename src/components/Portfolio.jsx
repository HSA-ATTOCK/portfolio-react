"use client";
import React, { useState, useEffect, useCallback } from "react";
import "../styles/portfolio.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AnimatedPinDemo } from "../components/3d-pin-demo";
import loginimg from "/assets/img/work5.jpg";
import paraimg from "/assets/img/work4.png";
import chatimg from "/assets/img/work3.png";
import vidchatimg from "/assets/img/work2.jpg";
import emaildesimg from "/assets/img/work1.jpeg";
import taskimg from "/assets/img/work6.png";
import resumeimg from "/assets/img/work7.jpg";
import portdesimg from "/assets/img/work8.jpeg";

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const projects = [
    {
      title: "Figma Portfolio Design",
      description: "Modern portfolio website UI design created in Figma.",
      techStack: ["Figma"],
      previewImage: portdesimg,
      githubLink:
        "https://github.com/HSA-ATTOCK/figma-portfolio-website-design",
      demo: "https://www.figma.com/design/Fst2wbQoHDckGwE3DAEhm3/Portfolio-Website-Design?node-id=0-1&t=NusY3NkoD3bibIuc-1",
    },
    {
      title: "React Resume Builder",
      description: "Interactive resume builder with real-time preview.",
      techStack: ["React", "CSS", "Node.js"],
      previewImage: resumeimg,
      githubLink: "https://github.com/HSA-ATTOCK/react-resume-builder",
      demo: "https://hsaresumebuilder.vercel.app/",
    },
    {
      title: "React Task Manager",
      description:
        "Productivity app combining Pomodoro timer with task management.",
      techStack: ["React", "CSS", "Node.js"],
      previewImage: taskimg,
      githubLink: "https://github.com/HSA-ATTOCK/react-pomodoro-task-manager",
      demo: "https://hsataskmanager.vercel.app/",
    },
    {
      title: "Figma Email Design",
      description: "Responsive email template designed in Figma.",
      techStack: ["Figma"],
      previewImage: emaildesimg,
      githubLink: "https://github.com/HSA-ATTOCK/figma-email-template-design",
      demo: "https://www.figma.com/design/cSfNHd4YVTlg9K0AMVJiAd/Email-Template-Well-Designed?node-id=0-1&t=xccrZoYYwE54hPrj-1",
    },
    {
      title: "WebRTC Video Chat",
      description: "Minimal peer-to-peer video chat application.",
      techStack: ["HTML", "JavaScript", "WebRTC"],
      previewImage: vidchatimg,
      githubLink: "https://github.com/HSA-ATTOCK/Minimal-WebRTC-Video-Chat",
      demo: "https://video-chat-uf11.onrender.com/",
    },
    {
      title: "Chat App",
      description: "Real-time messaging application with Firebase.",
      techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
      previewImage: chatimg,
      githubLink: "https://github.com/HSA-ATTOCK/chat-app",
      demo: "https://chat-app-f1hs.onrender.com/",
    },
    {
      title: "Paragraph Analyzer",
      description: "Text analysis tool for word and character counting.",
      techStack: ["HTML", "CSS", "JavaScript"],
      previewImage: paraimg,
      githubLink: "https://github.com/HSA-ATTOCK/paragraph-analyzer",
      demo: "https://hsa-attock.github.io/paragraph-analyzer/",
    },
    {
      title: "Login Form",
      description: "Form with real-time validation and error feedback.",
      techStack: ["HTML", "CSS", "JavaScript"],
      previewImage: loginimg,
      githubLink: "https://github.com/HSA-ATTOCK/login-form-validation",
      demo: "https://hsa-attock.github.io/login-form-validation/",
    },
  ];

  const handleResize = useCallback(() => {
    if (typeof window === "undefined") return;

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
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
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

  // Auto-rotate slides
  useEffect(() => {
    if (windowWidth > 768) {
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
          {visibleProjects.map((project) => (
            <div className="portfolio-pin-box" key={project.title}>
              <AnimatedPinDemo
                title={project.title}
                description={project.description}
                image={project.previewImage}
                githubLink={project.githubLink}
                demo={project.demo}
                techStack={project.techStack}
              />
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
