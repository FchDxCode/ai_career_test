import { motion } from 'framer-motion';
import JurusanCompass from './JurusanCompass';

export default function ProgressJurusan({ currentStep, total, discoveredPaths, careerTraits }) {
  // Fungsi untuk menampilkan emoji berdasarkan progress
  const getEmoji = () => {
    const p = (currentStep / total) * 100;
    return p < 33 ? '🌱' : p < 66 ? '🌿' : p < 99 ? '🌲' : '🌳';
  };
  
  // Menghitung persentase progress
  const progressPercentage = Math.round((currentStep / (total - 1)) * 100);

  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl shadow-md mb-8 max-w-3xl mx-auto border border-blue-100 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Elemen dekorasi */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full -mr-20 -mt-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200/20 to-indigo-300/20 rounded-full -ml-16 -mb-16 z-0"></div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 relative z-10">
        {/* Bagian kiri: Judul dan level */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-blue-100">
            <motion.span 
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >{getEmoji()}</motion.span>
          </div>
          <div>
            <h3 className="font-bold text-xl text-blue-800">Petualangan Jurusan</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                Level {currentStep + 1}
              </div>
              <p className="text-sm text-blue-700 font-medium">{progressPercentage}% Selesai</p>
            </div>
          </div>
        </div>
        
        {/* Bagian kanan: Jalur karir yang ditemukan */}
        {discoveredPaths.length > 0 && (
          <div className="w-full sm:w-auto">
            <p className="text-xs text-blue-700 font-medium mb-2">Jurusan Ditemukan:</p>
            <div className="flex flex-wrap gap-2">
              {discoveredPaths.map((path, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-medium shadow-sm flex items-center gap-1"
                >
                  <span className="text-xs">✨</span> {path}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Progress bar dengan animasi */}
      <div className="mb-8 relative z-10">
        <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-blue-700">
          <span>Mulai</span>
          <span>Finish</span>
        </div>
      </div>
      
      {/* Komponen CareerCompass dengan background yang lebih kontras */}
      <div className="bg-white p-4 rounded-xl shadow-sm relative z-10">
        <JurusanCompass traits={careerTraits} />
      </div>
    </motion.div>
  );
}