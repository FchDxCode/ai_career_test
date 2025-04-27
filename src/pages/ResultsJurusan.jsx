// src/pages/ResultsJurusan.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { getGeminiResponse } from '../utils/gemini';
import { generateJurusanPrompt } from '../utils/promptTemplates';
import toast from 'react-hot-toast';

export default function ResultsJurusan() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log("ResultsJurusan - State received:", location.state);
  
  // Fallback jika state null atau undefined
  const { answers = {}, traits = {} } = location.state || {};

  // Log untuk debugging
  useEffect(() => {
    console.log("Answers received:", answers);
    console.log("Traits received:", traits);
    
    // Jika answers kosong, redirect ke home
    if (Object.keys(answers).length === 0) {
      toast.error('Data tidak lengkap, silakan mulai tes dari awal');
      navigate('/');
    }
  }, [answers, navigate]);

  // Gunakan useRef untuk melacak apakah analisis sudah dicoba
  const analysisAttempted = useRef(false);

  const analyzeResults = useCallback(async () => {
    // Jika sudah mencoba analisis, jangan coba lagi
    if (analysisAttempted.current) return;
    
    // Tandai bahwa kita sudah mencoba analisis
    analysisAttempted.current = true;
    
    try {
      const prompt = generateJurusanPrompt(answers, traits);
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
      if (!analysisResult.academicProfile) {
        throw new Error("Data tidak lengkap: academicProfile tidak ditemukan");
      }
      
      setAnalysis(analysisResult);
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
      
      // Tidak ada fallback data
    } finally {
      setLoading(false);
    }
  }, [answers, traits]);

  useEffect(() => {
    // Pastikan answers ada dan tidak kosong
    if (!answers || Object.keys(answers).length === 0) {
      toast.error('Data tidak lengkap', { id: 'missing-data' });
      navigate('/');
      return;
    }

    // Hilangkan loading toast jika masih ada
    toast.dismiss('analysis-loading');
    
    if (!analysisAttempted.current) {
      analyzeResults();
    }
  }, [analyzeResults, answers, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-4xl mb-4"
            >
              🔄
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">AI sedang menganalisis...</h2>
            <p className="text-gray-600">Mohon tunggu sebentar ya!</p>
          </div>
        </div>
      </div>
    );
  }

  // Tampilkan halaman error yang lebih detail
  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="text-4xl mb-4">❌</div>
              <h2 className="text-2xl font-bold mb-4">Terjadi Kesalahan</h2>
              <p className="text-gray-600 mb-6">
                Maaf, kami tidak dapat menganalisis data kamu
              </p>
            </div>
            
            {/* Detail error */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg text-red-800 mb-8">
              <h3 className="font-medium mb-2">Detail Error:</h3>
              <p className="font-mono text-sm">{error}</p>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hasil analisis jurusan
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Academic Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Profil Akademikmu</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🎓</span>
            <div>
              <h3 className="font-semibold text-xl">{analysis.academicProfile.dominantInterest}</h3>
              <p className="text-gray-600">Gaya belajar: {analysis.academicProfile.learningStyle}</p>
            </div>
          </div>
        </motion.div>

        {/* Jurusan Recommendations Section */}
        {analysis.jurusanRecommendations && analysis.jurusanRecommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Rekomendasi Jurusan</h2>
            <div className="space-y-6">
              {analysis.jurusanRecommendations.map((jurusan, index) => (
                <div key={index} className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-100 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-xl">{jurusan.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {jurusan.matchPercentage}% Match
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{jurusan.description}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Mata Kuliah Utama:</h4>
                      <div className="flex flex-wrap gap-2">
                        {jurusan.mataKuliah && jurusan.mataKuliah.map((mk, i) => (
                          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {mk}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Prospek Karir:</h4>
                      <div className="flex flex-wrap gap-2">
                        {jurusan.prospek && jurusan.prospek.map((karir, i) => (
                          <span key={i} className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700">
                            {karir}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Preparation Tips Section */}
        {analysis.preparationTips && analysis.preparationTips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Tips Persiapan</h2>
            <div className="space-y-3">
              {analysis.preparationTips.map((tip, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-blue-500">•</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Additional Advice */}
        {analysis.additionalAdvice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Saran Tambahan</h2>
            <p className="text-gray-600">{analysis.additionalAdvice}</p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
          >
            Kembali ke Home
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
          >
            Simpan Hasil
          </button>
        </div>
      </div>
    </div>
  );
}