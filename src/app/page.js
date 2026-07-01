import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BackendWakeup from "../components/BackendWakeup";
import Chatbot from "../components/Chatbot";

export default function Home() {
  return (
    <>
      <BackendWakeup />
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
      <Chatbot />
    </>
  );
}
