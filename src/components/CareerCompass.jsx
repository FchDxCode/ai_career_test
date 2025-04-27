import { motion } from 'framer-motion';
import { questions_career } from '../data/questions_career';

const rotationMap = {
  analytical: 0,
  creative: 72,
  social: 144,
  practical: 216,
  leadership: 288
};

const traitNames = {
  analytical: 'Analitis',
  creative: 'Kreatif',
  social: 'Sosial',
  practical: 'Praktis',
  leadership: 'Kepemimpinan'
};

const careerDescriptions = {
  analytical: "Karir berbasis analisis dan pemecahan masalah",
  creative: "Karir yang membutuhkan kreativitas dan inovasi",
  social: "Karir yang berfokus pada interaksi dengan orang",
  practical: "Karir yang berorientasi pada implementasi dan hasil nyata",
  leadership: "Karir yang membutuhkan kemampuan memimpin dan mengorganisir"
};

const careerRecommendations = {
  analytical: ["Data Analyst", "Software Engineer", "Researcher"],
  creative: ["Graphic Designer", "Content Creator", "UX Designer"],
  social: ["HR Manager", "Public Relations", "Customer Service"],
  practical: ["Project Manager", "Civil Engineer", "Technician"],
  leadership: ["Business Manager", "Entrepreneur", "Team Leader"]
};

export default function CareerCompass({ traits }) {
  const dominant = Object.entries(traits)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'analytical';
  const rotation = rotationMap[dominant] ?? 0;
  
  const totalPoints = Object.values(traits).reduce((sum, val) => sum + val, 0) || 1;
  const dominantValue = traits[dominant] || 0;
  const percentage = Math.round((dominantValue / totalPoints) * 100);
  
  const careerSuggestions = careerRecommendations[dominant] || [];
  
  const typePreference = {};
  Object.entries(traits).forEach(([trait, count]) => {
    const relatedQuestions = questions_career.filter(q => 
      q.options.some(opt => opt.value === trait)
    );
    
    relatedQuestions.forEach(q => {
      typePreference[q.type] = (typePreference[q.type] || 0) + count;
    });
  });
  
  const preferredType = Object.entries(typePreference)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'multiple_choice';
  
  const typeInsight = {
    'multiple_choice': 'Kamu lebih nyaman dengan pilihan yang jelas dan terstruktur',
    'slider': 'Kamu cenderung melihat pilihan dalam spektrum, bukan hitam-putih',
    'drag_drop': 'Kamu memiliki kemampuan memprioritaskan dengan baik'
  }[preferredType] || '';

  return (
    <div className="text-center mb-8">
      <h3 className="text-lg font-semibold mb-2">Kompas Karir</h3>
      <p className="text-sm text-gray-600 mb-2">
        Trait dominan: <span className="font-bold text-blue-600">{traitNames[dominant] || dominant}</span> ({percentage}%)
      </p>
      <p className="text-xs text-gray-500 mb-4">{careerDescriptions[dominant]}</p>
      
      <motion.div
        className="relative w-56 h-56 mx-auto mb-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full shadow-lg border border-blue-100">
          <div className="absolute w-full h-full">
            <div className="absolute top-0 left-1/2 h-1/2 w-0.5 bg-blue-100 -translate-x-1/2"></div>
            <div className="absolute right-0 top-1/2 w-1/2 h-0.5 bg-blue-100 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/2 h-1/2 w-0.5 bg-blue-100 -translate-x-1/2"></div>
            <div className="absolute left-0 top-1/2 w-1/2 h-0.5 bg-blue-100 -translate-y-1/2"></div>
          </div>
          
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">Teknologi 💻</div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">Seni 🎨</div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">Layanan 🤝</div>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">Teknik 🛠️</div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-white rounded-full border-4 border-blue-500 shadow-md z-10"></div>
        </div>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 60, damping: 15, duration: 1.5 }}
        >
          <div className="w-1 h-28 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full origin-center -translate-y-5">
            <motion.div 
              className="w-5 h-5 -ml-2 -mt-1 bg-blue-600 rounded-full shadow-md"
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: ["0 0 0 rgba(37, 99, 235, 0.4)", "0 0 15px rgba(37, 99, 235, 0.7)", "0 0 0 rgba(37, 99, 235, 0.4)"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </div>
        </motion.div>
      </motion.div>
      
      <div className="bg-blue-50 p-3 rounded-xl text-sm text-gray-700 mb-4">
        <p>{typeInsight}</p>
      </div>
      
      {careerSuggestions.length > 0 && (
        <div className="mb-2">
          <p className="text-sm font-semibold mb-2">Karir yang mungkin cocok:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {careerSuggestions.map((career, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {career}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}