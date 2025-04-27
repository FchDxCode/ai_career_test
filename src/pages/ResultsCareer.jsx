// src/pages/ResultsKarir.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGeminiResponse } from '../utils/gemini';
import { generateCareerPrompt } from '../utils/promptTemplates';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function ResultsKarir() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('personalityTraits');
  const [selectedCareerIndex, setSelectedCareerIndex] = useState(null);
  const { answers } = location.state || {};
  const traits = location.state?.traits || {};
  
  // Gunakan useRef untuk melacak apakah analisis sudah dicoba
  const analysisAttempted = useRef(false);
  const confettiTriggered = useRef(false);

  const analyzeResults = useCallback(async () => {
    // Jika sudah mencoba analisis, jangan coba lagi
    if (analysisAttempted.current) return;
    
    // Tandai bahwa kita sudah mencoba analisis
    analysisAttempted.current = true;
    
    try {
      const prompt = generateCareerPrompt(answers, traits);
      console.log("Sending prompt to Gemini:", prompt);
      
      const response = await getGeminiResponse(prompt);
      console.log("Raw response from API:", response);
      
      let analysisResult;
      try {
        analysisResult = JSON.parse(response);
        console.log("Parsed analysis result:", analysisResult);
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        console.log("Invalid JSON response:", response);
        throw new Error("Format respon tidak valid: " + parseError.message);
      }
      
      // Validasi data yang diterima
      if (!analysisResult.personalityTraits) {
        throw new Error("Data tidak lengkap: personalityTraits tidak ditemukan");
      }
      
      setAnalysis(analysisResult);

      // Trigger confetti ketika hasil berhasil diterima
      if (!confettiTriggered.current) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 1000);
        confettiTriggered.current = true;
      }
      
    } catch (err) {
      // Log error ke konsol dengan detail lengkap
      console.error('Analysis error:', err);
      console.error('Error stack:', err.stack);
      
      // Simpan error di state
      setError(err.message || 'Analisis gagal');
      
      // Tampilkan toast hanya sekali
      toast.error(`Terjadi kesalahan: ${err.message || 'Analisis gagal'}`, {
        id: 'analysis-error',
        duration: 5000
      });
      
      // Tidak lagi menggunakan fallback data
    } finally {
      setLoading(false);
    }
  }, [answers, traits]);

  useEffect(() => {
    if (answers && !analysisAttempted.current) {
      analyzeResults();
    } else if (!answers) {
      toast.error('Data tidak lengkap', { id: 'missing-data' });
      navigate('/');
    }
  }, [analyzeResults, answers, navigate]);

  // Handler untuk tab navigation
  const handleTabChange = (section) => {
    setActiveSection(section);
    setSelectedCareerIndex(null);
  };

  // Handler untuk share hasil
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Hasil Tes Karir - ${analysis.personalityTraits.dominantTrait}`,
        text: `Saya baru saja menemukan karir yang cocok untuk saya: ${analysis.careerRecommendations[0]?.title}. Coba juga tes karir di CareerAI!`,
        url: window.location.href,
      })
      .then(() => toast.success('Berhasil membagikan'))
      .catch((err) => console.error('Error sharing:', err));
    } else {
      // Fallback jika Web Share API tidak tersedia
      toast.success('Link hasil telah disalin ke clipboard');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Handler untuk cetak/simpan hasil
  const handlePrint = () => {
    window.print();
    toast.success('Menyiapkan dokumen untuk dicetak/disimpan');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-100 rounded-full opacity-50"></div>
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotateY: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
                className="text-5xl inline-block mb-6"
              >
                🧠
              </motion.div>
              
              <h2 className="text-2xl font-bold mb-2">AI sedang menganalisis kepribadianmu...</h2>
              <p className="text-gray-600 mb-8">Proses ini membutuhkan waktu sekitar 20-30 detik</p>
              
              <div className="relative h-2 bg-gray-100 rounded-full max-w-md mx-auto overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-indigo-500"
                  animate={{ width: ["0%", "100%"], x: ["-100%", "0%"] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <div className="mt-8">
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-blue-600 italic"
                >
                  "Masa depan terbaik dibangun dari memahami dirimu saat ini" - CareerAI
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-500"
          >
            <div className="text-center">
              <motion.div 
                className="text-5xl mb-4 inline-block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                ⚠️
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Terjadi Kesalahan</h2>
              <p className="text-gray-600 mb-6">
                Maaf, kami tidak dapat menganalisis data kamu saat ini
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-red-50 rounded-lg text-red-800 mb-8">
              <h3 className="font-medium mb-2">Detail Error:</h3>
              <p className="font-mono text-sm break-words">{error}</p>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h3 className="font-medium mb-4">Yang dapat kamu lakukan:</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <p>Coba muat ulang halaman ini</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <p>Pastikan koneksi internet kamu stabil</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <p>Lakukan tes lagi dari awal</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                  <span>Coba Lagi</span>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
              >
                Kembali ke Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Bagian Tab Navigation
  const TabNavigation = () => (
    <div className="flex overflow-x-auto pb-2 mb-6 no-scrollbar">
      <button
        className={`px-6 py-3 rounded-xl mr-2 whitespace-nowrap ${
          activeSection === 'personalityTraits' 
            ? 'bg-blue-600 text-white font-medium shadow-md' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        onClick={() => handleTabChange('personalityTraits')}
      >
        Kepribadian 🧠
      </button>
      <button
        className={`px-6 py-3 rounded-xl mr-2 whitespace-nowrap ${
          activeSection === 'careerRecommendations' 
            ? 'bg-blue-600 text-white font-medium shadow-md' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        onClick={() => handleTabChange('careerRecommendations')}
      >
        Rekomendasi Karir 💼
      </button>
      <button
        className={`px-6 py-3 rounded-xl mr-2 whitespace-nowrap ${
          activeSection === 'developmentSuggestions' 
            ? 'bg-blue-600 text-white font-medium shadow-md' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        onClick={() => handleTabChange('developmentSuggestions')}
      >
        Saran Pengembangan 🌱
      </button>
      {analysis.additionalInsights && (
        <button
          className={`px-6 py-3 rounded-xl mr-2 whitespace-nowrap ${
            activeSection === 'additionalInsights' 
              ? 'bg-blue-600 text-white font-medium shadow-md' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('additionalInsights')}
        >
          Insight Tambahan 💡
        </button>
      )}
    </div>
  );

  const renderPersonalityCard = () => {
    const { dominantTrait, description, strengths, weaknesses } = analysis.personalityTraits;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white relative">
          <div className="absolute top-0 right-0 p-6 text-5xl opacity-20">🧠</div>
          <h2 className="text-3xl font-bold mb-2">Kepribadian Dominanmu</h2>
          <p className="opacity-80">Berdasarkan jawaban yang kamu berikan</p>
        </div>
        
        <div className="p-8">
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-blue-500 text-white rounded-xl text-3xl shadow-md">
                ✨
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-blue-800">{dominantTrait}</h3>
                <p className="text-blue-600">Tipe Kepribadian</p>
              </div>
            </div>
            <p className="text-gray-700">{description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                <span>💪</span>
                <span>Kekuatan</span>
              </h4>
              <ul className="space-y-2">
                {strengths?.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl">
              <h4 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
                <span>🔍</span>
                <span>Area Pengembangan</span>
              </h4>
              <ul className="space-y-2">
                {weaknesses?.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Diagram Traits */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-medium mb-4">Tingkat Kepribadianmu</h4>
            <div className="space-y-3">
              {traits && Object.entries(traits).map(([trait, value]) => (
                <div key={trait} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{trait}</span>
                    <span className="font-medium">{Math.round(value * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${value * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${
                        trait === 'analytical' ? 'bg-blue-500' :
                        trait === 'creative' ? 'bg-purple-500' :
                        trait === 'social' ? 'bg-green-500' :
                        trait === 'practical' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderCareerDetail = (career) => {
    if (!career) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <button 
            onClick={() => setSelectedCareerIndex(null)}
            className="mb-4 flex items-center gap-1 text-white opacity-80 hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Kembali ke daftar</span>
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{career.title}</h2>
              <p className="opacity-80 text-sm">Detail Karir</p>
            </div>
            <span className="bg-white text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {career.matchPercentage}% Match
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-medium text-lg mb-2">Deskripsi</h3>
          <p className="text-gray-700 mb-6">{career.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Skills yang Dibutuhkan</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {career.requiredSkills?.map((skill, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Prospek Karir</h3>
              <p className="text-gray-700">{career.growthPotential}</p>
            </div>
          </div>
          
          {career.educationPath && (
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Jalur Pendidikan</h3>
              <p className="text-gray-700">{career.educationPath}</p>
            </div>
          )}
          
          {career.salaryRange && (
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Kisaran Gaji</h3>
              <p className="text-gray-700">{career.salaryRange}</p>
            </div>
          )}
          
          {career.workEnvironment && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Lingkungan Kerja</h3>
              <p className="text-gray-700">{career.workEnvironment}</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderCareersGrid = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">Rekomendasi Karir Untukmu</h2>
          <p className="opacity-80">
            Berdasarkan kepribadian dan keahlianmu, berikut karir yang mungkin cocok untukmu
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.careerRecommendations?.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white border-2 border-gray-100 hover:border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all"
              onClick={() => setSelectedCareerIndex(index)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-xl">{career.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    career.matchPercentage > 80 ? 'bg-green-100 text-green-800' :
                    career.matchPercentage > 60 ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {career.matchPercentage}% Match
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{career.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-xs text-gray-500 uppercase mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {career.requiredSkills?.slice(0, 3).map((skill, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {career.requiredSkills?.length > 3 && (
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        +{career.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-blue-600">
                  <span className="text-sm font-medium">Lihat Detail</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg text-center mt-6">
          <p className="text-indigo-700 text-sm">
            Hasil ini merupakan rekomendasi berdasarkan tes. Kamu tetap perlu melakukan riset lebih dalam untuk memastikan karir yang diinginkan.
          </p>
        </div>
      </div>
    );
  };

  const renderSuggestions = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Saran Pengembangan</h2>
          <p className="opacity-80">Langkah konkrit yang bisa kamu ambil untuk pengembangan diri</p>
        </div>
        
        <div className="p-8">
          <div className="space-y-6">
            {analysis.developmentSuggestions?.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center w-8 h-8 mt-0.5 shrink-0">
                  {index + 1}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg w-full">
                  <p>{suggestion}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-start gap-2">
              <span className="text-yellow-500 text-xl">💡</span>
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Tips</h4>
                <p className="text-yellow-700 text-sm">Buatlah rencana aksi berdasarkan saran di atas dengan target waktu yang jelas untuk hasil yang optimal.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderAdditionalInsights = () => {
    if (!analysis.additionalInsights) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Insight Tambahan</h2>
          <p className="opacity-80">Pemahaman lebih mendalam tentang kepribadian dan potensi karirmu</p>
        </div>
        
        <div className="p-8">
          <div className="p-5 bg-blue-50 rounded-xl mb-6">
            <div className="text-3xl mb-4 text-center">🔎</div>
            <p className="text-gray-700">{analysis.additionalInsights}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
              <span>✅</span>
              <span>Tip Tambahan</span>
            </h4>
            <p className="text-green-700">
              Bagikan hasil ini dengan mentor atau penasehat karir untuk mendapatkan insight yang lebih personal dan terarah.
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 pt-24 md:pt-32">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header dan Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold mb-1">Hasil Analisis Karir</h1>
              <p className="text-gray-600">
                Dianalisis oleh CareerAI pada {new Date().toLocaleDateString('id-ID', { 
                  day: 'numeric', month: 'long', year: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                <span>Bagikan</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                <span>Cetak</span>
              </motion.button>
            </div>
          </div>
          
          <TabNavigation />
        </motion.div>
        
        {/* Conditional rendering based on active section */}
        <AnimatePresence mode="wait">
          {activeSection === 'personalityTraits' && (
            renderPersonalityCard()
          )}
          
          {activeSection === 'careerRecommendations' && (
            selectedCareerIndex !== null ? 
              renderCareerDetail(analysis.careerRecommendations[selectedCareerIndex]) :
              renderCareersGrid()
          )}
          
          {activeSection === 'developmentSuggestions' && (
            renderSuggestions()
          )}
          
          {activeSection === 'additionalInsights' && (
            renderAdditionalInsights()
          )}
        </AnimatePresence>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 p-6"
        >
          <p className="text-sm text-gray-500">
            © CareerAI 2025 - Hasil tes ini bersifat referensi dan tidak menjadi satu-satunya acuan untuk keputusan karir.
          </p>
        </motion.div>
      </div>
    </div>
  );
}