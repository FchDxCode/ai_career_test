import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import TestKarir from './pages/TestKarir';
import TestJurusan from './pages/TestJurusan';
import ResultsJurusan from './pages/ResultsJurusan';
import ResultsKarir from './pages/ResultsCareer';
import SplashScreen from './components/SplashScreen';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/layout/Footer';
import Explore from './pages/Explore';

function App() {
  const [loading, setLoading] = useState(true);
  
  // Cek apakah splash screen sudah pernah ditampilkan dalam sesi ini
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setLoading(false);
    } else {
      // Jika belum pernah lihat splash, simpan di sessionStorage
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);
  
  const handleSplashComplete = () => {
    setLoading(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        
        <AnimatePresence>
          {loading && <SplashScreen onComplete={handleSplashComplete} />}
        </AnimatePresence>
        
        {!loading && (
          <>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test-karir" element={<TestKarir />} />
                <Route path="/test-jurusan" element={<TestJurusan />} />            
                <Route path="/results-karir" element={<ResultsKarir />} />
                <Route path="/results-jurusan" element={<ResultsJurusan />} />
                <Route path="/explore" element={<Explore />} />
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;