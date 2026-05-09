import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import TrustStrip from './components/sections/TrustStrip';
import VideoIntro from './components/sections/VideoIntro';
import Offer from './components/sections/Offer';
import HowItWorks from './components/sections/HowItWorks';
import Niches from './components/sections/Niches';
import CaseStudy from './components/sections/CaseStudy';
import Roadmap from './components/sections/Roadmap';
import Founder from './components/sections/Founder';
import FAQ from './components/sections/FAQ';
import LeadForm from './components/sections/LeadForm';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/sections/Footer';

function Landing() {
  useEffect(() => {
    document.title = 'MHS-ScaleOps · Build expert-led online training businesses';
  }, []);

  return (
    <div className="App min-h-screen bg-[#050505] text-white" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <VideoIntro />
        <Offer />
        <HowItWorks />
        <Niches />
        <CaseStudy />
        <Roadmap />
        <Founder />
        <FAQ />
        <LeadForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
