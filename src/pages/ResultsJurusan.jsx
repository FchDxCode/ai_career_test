// src/pages/ResultsJurusan.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGeminiResponse } from '../utils/gemini';
import { generateJurusanPrompt } from '../utils/promptTemplates';
import toast from 'react-hot-toast';

export default function ResultsJurusan() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const { answers, traits } = location.state;

  useEffect(() => {
    analyzeResults();
  }, []);

  const analyzeResults = async () => {
    try {
      const prompt = generateJurusanPrompt(answers, traits);
      const response = await getGeminiResponse(prompt);
      const analysisResult = JSON.parse(response);
      setAnalysis(analysisResult);
      setLoading(false);
    } catch (error) {
      toast.error('Terjadi kesalahan dalam analisis');
      console.error('Analysis error:', error);
      setLoading(false);
    }
  };

  // ... tampilan hasil untuk jurusan ...
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      {/* ... kode tampilan serupa dengan ResultsKarir tapi disesuaikan untuk jurusan ... */}
    </div>
  );
}