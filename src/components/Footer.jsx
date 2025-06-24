import React from "react";
import "../styles/footer.css";

const Footer = () => {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>
            Copyright &copy; {new Date().getFullYear()} by HSA | All Rights
            Reserved.
          </p>
        </div>

        <div className="footer-iconTop">
          <a
            href="#home"
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
          >
            <i className="bx bx-up-arrow-alt"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
