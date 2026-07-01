"use client";
import React from "react";
import "../styles/skills.css";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiFigma, SiNextdotjs, SiSupabase, SiPostgresql, SiJson } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { BsServer } from "react-icons/bs";

// Pre-computed values to avoid SSR/client hydration mismatch
const dataLineHeights = [89, 42, 67, 28, 95, 53, 74, 36, 81, 61, 47, 72];

const particleStyles = [
  { left: "23%", top: "45%", animationDelay: "0.4s", animationDuration: "3.2s", backgroundColor: "hsl(210, 80%, 60%)" },
  { left: "67%", top: "12%", animationDelay: "1.1s", animationDuration: "4.5s", backgroundColor: "hsl(320, 80%, 60%)" },
  { left: "41%", top: "78%", animationDelay: "0.7s", animationDuration: "2.8s", backgroundColor: "hsl(60, 80%, 60%)" },
  { left: "85%", top: "33%", animationDelay: "1.8s", animationDuration: "3.7s", backgroundColor: "hsl(140, 80%, 60%)" },
  { left: "12%", top: "61%", animationDelay: "0.2s", animationDuration: "4.1s", backgroundColor: "hsl(280, 80%, 60%)" },
  { left: "56%", top: "88%", animationDelay: "1.5s", animationDuration: "3.0s", backgroundColor: "hsl(30, 80%, 60%)" },
  { left: "74%", top: "55%", animationDelay: "0.9s", animationDuration: "2.5s", backgroundColor: "hsl(190, 80%, 60%)" },
  { left: "33%", top: "22%", animationDelay: "1.3s", animationDuration: "4.8s", backgroundColor: "hsl(350, 80%, 60%)" },
  { left: "91%", top: "70%", animationDelay: "0.6s", animationDuration: "3.4s", backgroundColor: "hsl(100, 80%, 60%)" },
  { left: "48%", top: "40%", animationDelay: "1.9s", animationDuration: "2.2s", backgroundColor: "hsl(240, 80%, 60%)" },
  { left: "18%", top: "90%", animationDelay: "0.3s", animationDuration: "4.3s", backgroundColor: "hsl(170, 80%, 60%)" },
  { left: "62%", top: "8%",  animationDelay: "1.6s", animationDuration: "3.9s", backgroundColor: "hsl(50, 80%, 60%)" },
  { left: "37%", top: "55%", animationDelay: "0.8s", animationDuration: "2.7s", backgroundColor: "hsl(300, 80%, 60%)" },
  { left: "79%", top: "28%", animationDelay: "1.2s", animationDuration: "4.6s", backgroundColor: "hsl(80, 80%, 60%)" },
  { left: "5%",  top: "38%", animationDelay: "1.7s", animationDuration: "3.1s", backgroundColor: "hsl(220, 80%, 60%)" },
  { left: "52%", top: "72%", animationDelay: "0.1s", animationDuration: "4.0s", backgroundColor: "hsl(10, 80%, 60%)" },
  { left: "96%", top: "50%", animationDelay: "1.4s", animationDuration: "2.9s", backgroundColor: "hsl(160, 80%, 60%)" },
  { left: "28%", top: "15%", animationDelay: "0.5s", animationDuration: "3.6s", backgroundColor: "hsl(270, 80%, 60%)" },
  { left: "70%", top: "83%", animationDelay: "1.0s", animationDuration: "4.4s", backgroundColor: "hsl(40, 80%, 60%)" },
  { left: "15%", top: "48%", animationDelay: "1.8s", animationDuration: "2.6s", backgroundColor: "hsl(200, 80%, 60%)" },
  { left: "44%", top: "95%", animationDelay: "0.4s", animationDuration: "3.8s", backgroundColor: "hsl(330, 80%, 60%)" },
  { left: "83%", top: "18%", animationDelay: "1.1s", animationDuration: "4.2s", backgroundColor: "hsl(90, 80%, 60%)" },
  { left: "60%", top: "62%", animationDelay: "0.7s", animationDuration: "2.4s", backgroundColor: "hsl(150, 80%, 60%)" },
  { left: "8%",  top: "75%", animationDelay: "1.6s", animationDuration: "3.3s", backgroundColor: "hsl(260, 80%, 60%)" },
  { left: "35%", top: "30%", animationDelay: "0.2s", animationDuration: "4.7s", backgroundColor: "hsl(20, 80%, 60%)" },
  { left: "77%", top: "92%", animationDelay: "1.3s", animationDuration: "3.5s", backgroundColor: "hsl(180, 80%, 60%)" },
  { left: "22%", top: "5%",  animationDelay: "0.9s", animationDuration: "2.3s", backgroundColor: "hsl(310, 80%, 60%)" },
  { left: "55%", top: "42%", animationDelay: "1.7s", animationDuration: "4.9s", backgroundColor: "hsl(70, 80%, 60%)" },
  { left: "88%", top: "65%", animationDelay: "0.6s", animationDuration: "3.0s", backgroundColor: "hsl(230, 80%, 60%)" },
  { left: "47%", top: "20%", animationDelay: "1.5s", animationDuration: "4.1s", backgroundColor: "hsl(130, 80%, 60%)" },
];

const Skills = () => {
  const skillCategories = [
    {
      title: "Front-end",
      skills: [
        { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "React", icon: <FaReact />, color: "#61DAFB" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      ],
    },
    {
      title: "Back-end",
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Express", icon: <BsServer />, color: "#0198D6" },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
        { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E" },
        { name: "JSON", icon: <SiJson />, color: "#f5a623" },
      ],
    },
    {
      title: "Design",
      skills: [
        { name: "UI/UX Design", icon: <MdDesignServices />, color: "#FF6B6B" },
        { name: "Figma", icon: <SiFigma />, color: "#A259FF" },
      ],
    },
  ];

  return (
    <section className="skills" id="skills">
      <h2 className="heading">
        My <span>Skills</span>
      </h2>

      <div className="skills-container">
        <div className="skills-content">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skill-category">
              <h3 className="category-title">
                <span className="title-decorator"></span>
                {category.title}
                <span className="title-decorator"></span>
              </h3>
              <div className="category-skills">
                {category.skills.map((skill, skillIndex) => (
                  <div className="skill-item" key={skillIndex}>
                    <div
                      className="skill-icon-container"
                      style={{ "--skill-color": skill.color }}
                    >
                      <div
                        className="skill-icon"
                        style={{ color: skill.color }}
                        title={skill.name}
                      >
                        {skill.icon}
                      </div>
                      <div className="skill-icon-shadow"></div>
                    </div>
                    <p className="skill-name">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Holographic Display */}
        <div className="skills-image">
          <div className="holo-container">
            <div className="holo-bg">
              {/* Grid background */}
              <div className="holo-grid"></div>

              {/* Floating Tech Elements */}
              <div className="tech-orb html"></div>
              <div className="tech-orb css"></div>
              <div className="tech-orb js"></div>
              <div className="tech-orb react"></div>

              {/* Central Hologram */}
              <div className="holo-main">
                <div className="holo-core"></div>
                <div className="holo-ring"></div>
                <div className="holo-ring holo-ring-2"></div>
                <div className="holo-data">
                  {dataLineHeights.map((height, i) => (
                    <div
                      key={i}
                      className="data-line"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Floating Particles */}
              {particleStyles.map((style, i) => (
                <div
                  key={i}
                  className="holo-particle"
                  style={style}
                ></div>
              ))}

              {/* Scan line */}
              <div className="holo-scan"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
