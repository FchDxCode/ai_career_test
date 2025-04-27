import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import TestKarir from './pages/TestKarir';
import TestJurusan from './pages/TestJurusan';
import Results from './pages/ResultsCareer';
import ResultsJurusan from './pages/ResultsJurusan';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test-karir" element={<TestKarir />} />
            <Route path="/test-jurusan" element={<TestJurusan />} />            
            <Route path="/results-karir" element={<Results />} />
            <Route path="/results-jurusan" element={<ResultsJurusan />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
