import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import TestKarir from './pages/TestKarir';
import TestJurusan from './pages/TestJurusan';
import ResultsJurusan from './pages/ResultsJurusan';
import { Toaster } from 'react-hot-toast';
import ResultsKarir from './pages/ResultsCareer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        <Navbar />
        <div className='mb-10'>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test-karir" element={<TestKarir />} />
                <Route path="/test-jurusan" element={<TestJurusan />} />            
                <Route path="/results-karir" element={<ResultsKarir />} />
                <Route path="/results-jurusan" element={<ResultsJurusan />} />
              </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
