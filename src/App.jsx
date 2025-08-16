// src/App.jsx
import React from "react";
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

function App() {
  useBackendWakeup();
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
