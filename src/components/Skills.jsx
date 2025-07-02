import React from "react";
import "../styles/skills.css";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiFigma } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { BsServer } from "react-icons/bs";

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
      ],
    },
    {
      title: "Back-end",
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Express", icon: <BsServer />, color: "#000000" },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
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
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="data-line"
                      style={{
                        height: `${20 + Math.random() * 80}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Floating Particles */}
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="holo-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                    backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
                  }}
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
