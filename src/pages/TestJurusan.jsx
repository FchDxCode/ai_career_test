// src/pages/TestJurusan.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProgressHeader from '../components/ProgressHeader';
import QuestionCard from '../components/QuestionCard';
import { questions_jurusan } from '../data/questions_jurusan';

export default function TestJurusan() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [jurusanTraits, setJurusanTraits] = useState({
    science: 0, computing: 0, social_studies: 0, 
    research: 0, communication: 0, creative: 0
  });
  const [discoveredPaths, setDiscoveredPaths] = useState([]);
  
  // Validasi apakah questions_jurusan tersedia dan tidak kosong
  useEffect(() => {
    if (!questions_jurusan || questions_jurusan.length === 0) {
      toast.error('Data pertanyaan tidak tersedia');
      navigate('/');
    }
  }, [navigate]);

  const handleNext = (answer) => {
    setAnswers(prev => ({ ...prev, [currentStep]: answer }));
    setJurusanTraits(prev => ({ ...prev, [answer]: (prev[answer] || 0) + 1 }));

    // Paths untuk jurusan
    const paths = {
      science: "Science Explorer 🔬",
      computing: "Tech Enthusiast 💻",
      social_studies: "Social Observer 📚",
      research: "Research Pioneer 🔬",
      communication: "Communication Pro 👥",
      creative: "Creative Mind 🎨"
    };

    const newPath = paths[answer];
    if (newPath && !discoveredPaths.includes(newPath)) {
      setDiscoveredPaths(prev => [...prev, newPath]);
      toast.success(`🎉 Kamu cocok dengan jalur: ${newPath}!`);
    }

    if (currentStep < questions_jurusan.length - 1) {
      setCurrentStep(s => s + 1);
      const messages = [
        "Bagus! Kamu semakin dekat dengan jurusan impianmu! 📚",
        "Menarik! Kita jadi tahu lebih banyak tentang minatmu! 🎯",
        "Keren! Terus eksplorasi potensimu! 🌟",
        "Hebat! Semakin jelas arah pendidikanmu! 🎓"
      ];
      toast.success(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      // Tampilkan loading
      toast.loading('AI sedang menganalisis jurusan yang cocok untukmu...', {
        id: 'analysis-loading' // Berikan ID untuk bisa dihapus nanti
      });
      
      // Buat copy dari data untuk mencegah race condition
      const finalAnswers = {...answers, [currentStep]: answer};
      const finalTraits = {...jurusanTraits};
      finalTraits[answer] = (finalTraits[answer] || 0) + 1;
      
      // Kita gunakan timeout untuk memastikan state sudah terupdate
      // dan toast sudah muncul sebelum navigasi
      setTimeout(() => {
        navigate('/results-jurusan', { 
          state: { 
            answers: finalAnswers,
            traits: finalTraits
          } 
        });
      }, 100);
    }
  };

  // Pastikan pertanyaan tersedia sebelum render
  if (!questions_jurusan || questions_jurusan.length === 0 || !questions_jurusan[currentStep]) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Data Tidak Tersedia</h2>
          <p className="text-gray-600 mb-6">Maaf, data pertanyaan tidak dapat dimuat</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <ProgressHeader
        currentStep={currentStep}
        total={questions_jurusan.length}
        discoveredPaths={discoveredPaths}
        careerTraits={jurusanTraits} // komponen yang sama bisa digunakan
      />
      <QuestionCard
        question={questions_jurusan[currentStep]}
        onNext={handleNext}
        currentStep={currentStep}
        questionsLength={questions_jurusan.length}
      />
    </div>
  );
}