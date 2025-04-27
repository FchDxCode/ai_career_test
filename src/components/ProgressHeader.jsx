import { motion } from 'framer-motion';
import CareerCompass from './CareerCompass';

export default function ProgressHeader({ currentStep, total, discoveredPaths, careerTraits }) {
  const getEmoji = () => {
    const p = (currentStep / total) * 100;
    return p < 33 ? '🌱' : p < 66 ? '🌿' : p < 99 ? '🌲' : '🌳';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getEmoji()}</span>
          <div>
            <h3 className="font-bold">Petualangan Karir</h3>
            <p className="text-sm text-gray-600">Level {currentStep + 1}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {discoveredPaths.map((p, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {p}
            </motion.div>
          ))}
        </div>
      </div>
      <CareerCompass traits={careerTraits} />
    </div>
  );
}
