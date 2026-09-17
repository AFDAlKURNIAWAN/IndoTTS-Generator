import AudioGenerator from "./components/AudioGenerator";
import About from "./components/About";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tutorial from "./components/Tutorial";

function App() {
  return (
    <div className="min-h-screen overflow-hidden text-slate-950">
      <Navbar />
      <main>
        <Hero />
        <AudioGenerator />
        <About />
        <Tutorial />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

export default App;
