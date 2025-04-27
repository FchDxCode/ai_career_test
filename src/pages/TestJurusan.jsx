// src/pages/TestJurusan.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressJurusan from '../components/ProgressJurusan';
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
      
      // Toast akan ditampilkan setelah modal muncul dan ditutup
      setTimeout(() => {
        toast.success(`🎉 Kamu cocok dengan jalur: ${newPath}!`);
      }, 2000);
    } else {
      // Tampilkan toast hanya jika tidak ada path baru
      const messages = [
        "Bagus! Kamu semakin dekat dengan jurusan impianmu! 📚",
        "Menarik! Kita jadi tahu lebih banyak tentang minatmu! 🎯",
        "Keren! Terus eksplorasi potensimu! 🌟",
        "Hebat! Semakin jelas arah pendidikanmu! 🎓"
      ];
      toast.success(messages[Math.floor(Math.random() * messages.length)]);
    }

    if (currentStep < questions_jurusan.length - 1) {
      setCurrentStep(s => s + 1);
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md"
        >
          <div className="text-5xl mb-4 text-yellow-500">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Data Tidak Tersedia</h2>
          <p className="text-gray-600 mb-6">Maaf, data pertanyaan tidak dapat dimuat.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Kembali ke Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 relative overflow-hidden pt-24 md:pt-32">
      {/* Elemen dekoratif background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-100 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full -mb-32 -mr-32 opacity-50"></div>
      <div className="absolute top-40 left-10 w-40 h-40 bg-blue-100 rounded-full opacity-30"></div>
      
      {/* Header Test */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-indigo-900 mb-2">Tes Rekomendasi Jurusan</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Temukan jurusan kuliah yang sesuai dengan kepribadian, minat, dan potensi akademikmu melalui serangkaian pertanyaan berikut.
        </p>
      </motion.div>
      
      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        
        <ProgressJurusan 
          currentStep={currentStep}
          total={questions_jurusan.length}
          discoveredPaths={discoveredPaths}
          careerTraits={jurusanTraits}
        />
        
        <div className="mb-8">
          {discoveredPaths.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-5 rounded-xl shadow-md"
            >
              <h3 className="font-semibold mb-3 text-indigo-800 flex items-center">
                <span className="text-xl mr-2">✨</span> Jalur Minat yang Ditemukan
              </h3>
              <div className="flex flex-wrap gap-2">
                {discoveredPaths.map((path, index) => (
                  <motion.div 
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-full text-sm font-medium text-indigo-700 flex items-center gap-1"
                  >
                    <span>{path}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <QuestionCard
              question={questions_jurusan[currentStep]}
              onNext={handleNext}
              currentStep={currentStep}
              questionsLength={questions_jurusan.length}
            />
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>Jawaban kamu akan disimpan secara anonim dan hanya digunakan untuk rekomendasi jurusan</p>
        </motion.div>
      </div>
    </div>
  );
}