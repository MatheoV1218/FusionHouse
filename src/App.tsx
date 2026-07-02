import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import SEO from "./components/SEO";
import ClickTracker from "./components/ClickTracker";
import "./App.css";

function LanguageRouteSync() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const nextLanguage = location.pathname.startsWith("/es") ? "es" : "en";
    if (i18n.language !== nextLanguage) i18n.changeLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, [location.pathname, i18n]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <LanguageRouteSync />
      <SEO />
      <ClickTracker />
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/es" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/es/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/es/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/es/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/es/faq" element={<FAQ />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/es/guide" element={<Guide />} />
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
