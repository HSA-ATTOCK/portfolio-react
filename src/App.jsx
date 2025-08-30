// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { useBackendWakeup } from "./hooks/useBackendWakeup";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio"; // Fixed spelling
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TwilioDialerShowcase from "./components/TwilioDialerShowcase";

function App() {
  useBackendWakeup();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/twilio-dialer" element={<TwilioDialerShowcase />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
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
