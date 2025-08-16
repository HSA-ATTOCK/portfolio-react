// src/App.jsx
import React, { useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio"; // Fixed spelling
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  // Backend wake-up effect
  useEffect(() => {
    const N8N_WEBHOOK_URL =
      "https://haider530.app.n8n.cloud/webhook-test/wake-backend";

    // Function to wake backend
    const wakeBackend = () => {
      fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: "portfolio-website",
          action: "wake-backend",
          page: window.location.pathname,
          userAgent: navigator.userAgent,
        }),
      }).catch((err) => {
        console.log("Backend wake-up failed:", err);
        // Or simply remove the console.log for silent fail
      });
    };

    // Wake backend immediately when component mounts
    wakeBackend();

    // Optional: Set up contact form interaction listeners
    const setupContactListeners = () => {
      const contactElements = document.querySelectorAll(
        '#contact, .contact, [href*="contact"], form, button[type="submit"]'
      );

      contactElements.forEach((element) => {
        const handleContactInteraction = () => {
          wakeBackend();
          // Remove listener after first use
          element.removeEventListener("mouseenter", handleContactInteraction);
          element.removeEventListener("focus", handleContactInteraction);
          element.removeEventListener("click", handleContactInteraction);
        };

        element.addEventListener("mouseenter", handleContactInteraction, {
          once: true,
        });
        element.addEventListener("focus", handleContactInteraction, {
          once: true,
        });
        element.addEventListener("click", handleContactInteraction, {
          once: true,
        });
      });
    };

    // Set up listeners after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(setupContactListeners, 1000);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array = runs once on mount

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
