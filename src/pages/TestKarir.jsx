// src/pages/TestKarir.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TestKarir = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk handle next question
  const handleNext = (answer) => {
    setAnswers({ ...answers, [currentStep]: answer });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  // Handle submit ke AI
  const handleSubmit = async () => {
    setIsLoading(true);
    toast.loading('AI sedang menganalisis jawabanmu...');
    // Nanti di sini kita akan implementasi call ke Gemini
    setTimeout(() => {
      navigate('/results', { state: { answers } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-center mt-2 text-gray-600">
          Pertanyaan {currentStep + 1} dari {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">{questions[currentStep].question}</h2>
            
            <div className="grid gap-4">
              {questions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleNext(option.value)}
                  className="p-4 text-left rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-blue-50 transition-all flex items-center gap-4"
                >
                  <div className="text-3xl">{option.icon}</div>
                  <div>
                    <h3 className="font-semibold">{option.text}</h3>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Tips */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 {questions[currentStep].tip}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const questions = [
  {
    question: "Dalam situasi kerja, kamu lebih suka...",
    tip: "Pikirkan pengalaman sehari-hari yang membuatmu paling nyaman dan produktif",
    options: [
      {
        icon: "👥",
        text: "Bekerja dengan orang lain",
        description: "Kolaborasi, diskusi, dan interaksi dengan tim",
        value: "social"
      },
      {
        icon: "🎯",
        text: "Bekerja mandiri",
        description: "Fokus pada tugas individual dan pengembangan diri",
        value: "independent"
      },
      {
        icon: "⚖️",
        text: "Kombinasi keduanya",
        description: "Fleksibel tergantung situasi dan kebutuhan",
        value: "flexible"
      }
    ]
  },
  {
    question: "Ketika menghadapi masalah, kamu cenderung...",
    tip: "Tidak ada jawaban yang salah, pilih yang paling mencerminkan dirimu",
    options: [
      {
        icon: "🔍",
        text: "Analitis",
        description: "Menganalisis detail dan mencari solusi sistematis",
        value: "analytical"
      },
      {
        icon: "🎨",
        text: "Kreatif",
        description: "Mencari solusi inovatif dan berpikir out of the box",
        value: "creative"
      },
      {
        icon: "🤝",
        text: "Praktis",
        description: "Mencari solusi cepat dan efektif berdasarkan pengalaman",
        value: "practical"
      }
    ]
  },
  {
    question: "Apa yang membuatmu merasa paling bersemangat?",
    tip: "Pilih berdasarkan apa yang benar-benar memotivasimu, bukan ekspektasi orang lain",
    options: [
      {
        icon: "📈",
        text: "Mencapai target",
        description: "Melihat hasil dan pertumbuhan yang terukur",
        value: "achievement"
      },
      {
        icon: "💡",
        text: "Memecahkan masalah",
        description: "Menghadapi tantangan dan menemukan solusi",
        value: "problem_solving"
      },
      {
        icon: "🌟",
        text: "Membantu orang lain",
        description: "Memberikan dampak positif bagi sekitar",
        value: "helping"
      }
    ]
  },
  // Bisa ditambahkan pertanyaan lain yang relevan
];

export default TestKarir;