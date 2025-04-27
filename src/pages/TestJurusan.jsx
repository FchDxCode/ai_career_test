// src/pages/TestJurusan.jsx
import React from 'react';
import { useState } from 'react';
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
      toast.loading('AI sedang menganalisis jurusan yang cocok untukmu...');
      setTimeout(() => {
        navigate('/results-jurusan', { state: { answers } });
      }, 2000);
    }
  };

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