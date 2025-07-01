import React from "react";
import "../styles/skills.css";

const Skills = () => {
  const skills = [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Express", level: 70 },
    { name: "UI/UX Design", level: 85 },
  ];

  return (
    <section className="skills" id="skills">
      <h2 className="heading">
        My <span>Skills</span>
      </h2>

      <div className="skills-container">
        <div className="skills-content">
          {skills.map((skill, index) => (
            <div className="skill" key={index}>
              <div className="skill-header">
                <h3>{skill.name}</h3>
                {/* <span>{skill.level}%</span> */}
              </div>
              {/* <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${skill.level}%` }}
                  aria-valuenow={skill.level}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
            </div>
          ))}
        </div>

        <div className="skills-image">
          <img src="/assets/img/skill.png" alt="Skills visualization" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
