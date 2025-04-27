import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DragDropQuestion from './DragDropQuestion';
import SliderQuestion from './SliderQuestion';

export default function QuestionCard({ 
  question, 
  onNext, 
  onPrevious, // Menambahkan prop untuk kembali ke pertanyaan sebelumnya
  questionsLength, 
  currentStep,
  loading = false // Prop untuk status loading
}) {
  const [factShown, setFactShown] = useState(false);
  
  // Reset factShown saat pertanyaan berubah
  useEffect(() => {
    setFactShown(false);
  }, [currentStep]);

  // Instruksi berdasarkan jenis pertanyaan
  const getInstructions = () => {
    if (!question) return "Mohon tunggu...";
    
    switch (question.type) {
      case 'drag_drop':
        return "Urutkan pilihan berikut dengan cara drag and drop sesuai preferensi Anda";
      case 'slider':
        return "Geser slider untuk memilih nilai yang paling sesuai dengan preferensi Anda";
      default:
        return "Pilih opsi yang paling sesuai dengan preferensi Anda";
    }
  };

  // Menampilkan fakta menarik
  const showFunFact = () => {
    if (factShown) return;
    
    toast(`💫 ${question?.funFact || 'Fakta tidak tersedia'}`, {
      icon: '🎓',
      duration: 5000,
      style: { borderRadius: '10px', background: '#333', color: '#fff' }
    });
    
    setFactShown(true);
  };

  // Rendering saat loading
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto relative flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-blue-700">Memuat pertanyaan...</p>
      </motion.div>
    );
  }

  // Handling jika tidak ada pertanyaan
  if (!question) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto relative"
      >
        <h2 className="text-xl font-medium text-center text-red-600">
          Pertanyaan tidak tersedia
        </h2>
        <p className="text-center mt-4">
          Terjadi kesalahan saat memuat pertanyaan. Silakan coba lagi nanti.
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto relative"
      >
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-blue-700">
              Pertanyaan {currentStep + 1} dari {questionsLength}
            </p>
            <p className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / questionsLength) * 100)}% Selesai
            </p>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              initial={{ width: `${(currentStep / questionsLength) * 100}%` }}
              animate={{ width: `${((currentStep + 1) / questionsLength) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Instruksi sesuai jenis pertanyaan */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-blue-800 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold">Instruksi</h3>
          </div>
          <p className="text-sm text-blue-700">
            {getInstructions()}
          </p>
        </motion.div>

        {/* Elemen dekoratif */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full -z-10 blur-xl opacity-60"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-full -z-10 blur-xl opacity-60"></div>
        
        {/* Pertanyaan */}
        <motion.h2 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {question.question}
        </motion.h2>

        {/* Komponen sesuai jenis pertanyaan */}
        {question.type === 'drag_drop' ? (
          <DragDropQuestion options={question.options} onComplete={onNext} />
        ) : question.type === 'slider' ? (
          <SliderQuestion options={question.options} onComplete={onNext} />
        ) : (
          <div className="grid gap-4">
            {question.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02, backgroundColor: '#f0f9ff' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNext(opt.value)}
                className="p-6 text-left rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{opt.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{opt.text}</h3>
                    {opt.description && (
                      <p className="text-gray-600">{opt.description}</p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Fakta menarik */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl cursor-pointer transition-all ${factShown ? 'opacity-70' : 'hover:shadow-md'}`}
          onClick={showFunFact}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{factShown ? '✓' : '💡'}</span>
            <p className="text-sm font-medium">
              {factShown ? 'Fakta menarik sudah ditampilkan!' : 'Ketuk untuk fakta menarik!'}
            </p>
          </div>
        </motion.div>

        {/* Navigasi */}
        {onPrevious && currentStep > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={onPrevious}
            className="mt-5 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Pertanyaan sebelumnya
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}