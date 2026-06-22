import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./components/FAQ";
import Chatbot from "./components/Chatbot";
import Guide from "./pages/Guide";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>

        <Footer />
        <Chatbot />
      </div>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
