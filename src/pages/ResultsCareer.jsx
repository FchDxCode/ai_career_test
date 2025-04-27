// src/pages/ResultsKarir.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { getGeminiResponse } from '../utils/gemini';
import { generateCareerPrompt } from '../utils/promptTemplates';
import toast from 'react-hot-toast';

export default function ResultsKarir() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { answers } = location.state || {};
  const traits = location.state?.traits || {};
  
  // Gunakan useRef untuk melacak apakah analisis sudah dicoba
  const analysisAttempted = useRef(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Personality Traits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Kepribadian Dominanmu</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">✨</span>
            <div>
              <h3 className="font-semibold text-xl">{analysis.personalityTraits.dominantTrait}</h3>
              <p className="text-gray-600">{analysis.personalityTraits.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Career Recommendations Section */}
        {analysis.careerRecommendations && analysis.careerRecommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Rekomendasi Karir</h2>
            <div className="space-y-6">
              {analysis.careerRecommendations.map((career, index) => (
                <div key={index} className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-100 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-xl">{career.title}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {career.matchPercentage}% Match
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{career.description}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Skills yang Dibutuhkan:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills && career.requiredSkills.map((skill, i) => (
                          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Prospek:</h4>
                      <p className="text-gray-600">{career.growthPotential}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Development Suggestions Section */}
        {analysis.developmentSuggestions && analysis.developmentSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Saran Pengembangan</h2>
            <div className="space-y-3">
              {analysis.developmentSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-blue-500">•</span>
                  <p>{suggestion}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Additional Insights */}
        {analysis.additionalInsights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Insight Tambahan</h2>
            <p className="text-gray-600">{analysis.additionalInsights}</p>
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