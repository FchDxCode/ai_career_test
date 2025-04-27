import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProgressHeader from '../components/ProgressHeader';
import QuestionCard from '../components/QuestionCard';
import { questions_career } from '../data/questions_career';

export default function TestKarir() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [careerTraits, setCareerTraits] = useState({
    analytical: 0, creative: 0, social: 0, practical: 0, leadership: 0
  });
  const [discoveredPaths, setDiscoveredPaths] = useState([]);

  const handleNext = (answer) => {
    setAnswers(prev => ({ ...prev, [currentStep]: answer }));
    setCareerTraits(prev => ({ ...prev, [answer]: (prev[answer] || 0) + 1 }));

    // jalur karir
    const paths = {
      analytical: "Tech Explorer 💻",
      creative: "Creative Innovator 🎨",
      social: "People Champion 🤝",
      practical: "Problem Solver 🛠️",
      leadership: "Future Leader ⭐"
    };
    const newPath = paths[answer];
    if (newPath && !discoveredPaths.includes(newPath)) {
      setDiscoveredPaths(prev => [...prev, newPath]);
      toast.success(`🎉 Kamu membuka jalur karir baru: ${newPath}!`);
    }

    if (currentStep < questions_career.length - 1) {
      setCurrentStep(s => s + 1);
      const messages = [
        "Keren! Kamu semakin dekat dengan impianmu! ⭐",
        "Wow, jawaban yang menarik! 🌟",
        "Hebat! Terus eksplorasi ya! 🚀",
        "Mantap! Kamu semakin mengenal dirimu! 🎯"
      ];
      toast.success(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      toast.loading('AI sedang menganalisis jawabanmu...');
      setTimeout(() => {
        navigate('/results-karir', { state: { answers } });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <ProgressHeader
        currentStep={currentStep}
        total={questions_career.length}
        discoveredPaths={discoveredPaths}
        careerTraits={careerTraits}
      />
      <QuestionCard
        question={questions_career[currentStep]}
        onNext={handleNext}
        currentStep={currentStep}
        questionsLength={questions_career.length}
      />
    </div>
  );
}
