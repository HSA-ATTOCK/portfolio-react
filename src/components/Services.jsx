import React from "react";
import "../styles/services.css";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      icon: "bx bx-code-alt",
      description:
        "Custom website development using modern technologies like React, Node.js, and MongoDB to create fast, secure, and scalable web applications.",
    },
    {
      title: "UI/UX Design",
      icon: "bx bx-paint",
      description:
        "User-centered design approach creating intuitive interfaces with thoughtful information architecture and engaging visual design.",
    },
    {
      title: "Responsive Design",
      icon: "bx bx-mobile-alt",
      description:
        "Mobile-first responsive designs that adapt perfectly to all devices, ensuring optimal user experience across all screen sizes.",
    },
  ];

  return (
    <section className="services" id="services">
      <h2 className="heading">
        My <span>Services</span>
      </h2>

      <div className="services-container">
        {services.map((service, index) => (
          <div className="services-box" key={index}>
            <i className={service.icon}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
