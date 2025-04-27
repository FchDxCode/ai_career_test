import { motion } from 'framer-motion';

const rotationMap = {
  analytical: 0,
  creative: 72,
  social: 144,
  practical: 216,
  leadership: 288
};

export default function CareerCompass({ traits }) {
  const dominant = Object.entries(traits)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'analytical';
  const rotation = rotationMap[dominant] ?? 0;

  return (
    <motion.div
      className="relative w-48 h-48 mx-auto mb-6"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="absolute inset-0 bg-white rounded-full shadow-lg flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full border-2 border-gray-200">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm">Tech 💻</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">Arts 🎨</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm">Service 🤝</div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">Build 🛠️</div>
        </div>
        <motion.div
          className="w-1 h-20 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full origin-bottom"
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="w-4 h-4 -mt-1 -ml-1.5 bg-blue-600 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
