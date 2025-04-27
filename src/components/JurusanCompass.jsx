import { motion } from 'framer-motion';
import { questions_jurusan, jurusanTraits } from '../data/questions_jurusan';

// Mapping rotasi untuk area jurusan
const rotationMap = {
  science: 0,          
  computing: 72,       
  social_studies: 144, 
  research: 180,       
  creative: 216,       
  communication: 288   
};

// Nama area yang lebih familiar
const areaNames = {
  science: 'Sains',
  computing: 'Komputasi',
  social_studies: 'Sosial Humaniora',
  research: 'Riset',
  creative: 'Kreatif',
  communication: 'Komunikasi'
};

// Deskripsi area jurusan
const areaDescriptions = {
  science: "Fokus pada eksperimen, observasi, dan analisis",
  computing: "Fokus pada pemrograman, algoritma, dan teknologi",
  social_studies: "Fokus pada masyarakat, komunikasi, dan interaksi manusia",
  research: "Fokus pada investigasi dan penemuan pengetahuan baru", 
  creative: "Fokus pada inovasi, desain, dan kreativitas",
  communication: "Fokus pada penyampaian informasi dan interaksi sosial"
};

export default function JurusanCompass({ traits }) {
  // Menentukan trait dominan
  const dominant = Object.entries(traits)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'science';
  
  // Menentukan rotasi kompas
  const rotation = rotationMap[dominant] ?? 0;
  
  // Mendapatkan nilai persentase untuk trait dominan
  const totalPoints = Object.values(traits).reduce((sum, val) => sum + val, 0) || 1;
  const dominantValue = traits[dominant] || 0;
  const percentage = Math.round((dominantValue / totalPoints) * 100);

  // Mendapatkan label dari jurusanTraits
  const traitInfo = jurusanTraits[dominant] || {};
  const traitLabel = traitInfo.label || areaNames[dominant] || dominant;
  
  // Rekomendasi jurusan dari jurusanTraits
  const jurusanRekomendasiList = traitInfo.jurusan || [];
  
  // Analisis berdasarkan pertanyaan yang dijawab
  // Cari tipe pertanyaan yang paling sering dijawab
  const typePreference = {};
  Object.entries(traits).forEach(([trait, count]) => {
    // Cari pertanyaan yang memiliki opsi dengan nilai trait ini
    const relatedQuestions = questions_jurusan.filter(q => 
      q.options.some(opt => opt.value === trait)
    );
    
    // Hitung distribusi tipe pertanyaan
    relatedQuestions.forEach(q => {
      typePreference[q.type] = (typePreference[q.type] || 0) + count;
    });
  });
  
  // Temukan tipe preferensi
  const preferredType = Object.entries(typePreference)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'multiple_choice';
  
  // Insight berdasarkan tipe preferensi
  const typeInsight = {
    'multiple_choice': 'Kamu memiliki preferensi yang jelas dalam pilihan akademik',
    'slider': 'Kamu cenderung melihat pendidikan dalam beragam sudut pandang',
    'drag_drop': 'Kamu mampu memprioritaskan kegiatan akademik dengan baik'
  }[preferredType] || '';

  // Analisis kesulitan akademik
  const scienceScore = traits['science'] || 0;
  const computerScore = traits['computing'] || 0;
  const socialScore = traits['social_studies'] || 0;
  
  let studyDifficulty = '';
  if (scienceScore > computerScore && scienceScore > socialScore) {
    studyDifficulty = 'Kamu cenderung berani menghadapi subjek studi yang kompleks dan menantang';
  } else if (computerScore > scienceScore && computerScore > socialScore) {
    studyDifficulty = 'Kamu memiliki ketertarikan pada hal-hal teknis dan pemecahan masalah logis';
  } else if (socialScore > scienceScore && socialScore > computerScore) {
    studyDifficulty = 'Kamu lebih nyaman dengan subjek yang melibatkan dinamika sosial dan komunikasi';
  } else {
    studyDifficulty = 'Kamu memiliki minat yang seimbang di berbagai bidang studi';
  }

  return (
    <div className="text-center mb-8">
      <h3 className="text-lg font-semibold mb-2">Kompas Jurusan</h3>
      <p className="text-sm text-gray-600 mb-2">
        Area dominan: <span className="font-bold text-blue-600">{traitLabel}</span> ({percentage}%)
      </p>
      <p className="text-xs text-gray-500 mb-4">{areaDescriptions[dominant] || ''}</p>
      
      <motion.div
        className="relative w-56 h-56 mx-auto mb-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        {/* Lingkaran luar dengan bayangan */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full shadow-lg border border-blue-100">
          {/* Garis-garis penanda arah */}
          <div className="absolute w-full h-full">
            <div className="absolute top-0 left-1/2 h-1/2 w-0.5 bg-blue-100 -translate-x-1/2"></div>
            <div className="absolute right-0 top-1/2 w-1/2 h-0.5 bg-blue-100 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/2 h-1/2 w-0.5 bg-blue-100 -translate-x-1/2"></div>
            <div className="absolute left-0 top-1/2 w-1/2 h-0.5 bg-blue-100 -translate-y-1/2"></div>
          </div>
          
          {/* Label area jurusan */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">Sains 🧪</div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">Komputer 💻</div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">Sosial 👥</div>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">Kreatif 🎨</div>
        </div>
        
        {/* Titik tengah */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-white rounded-full border-4 border-blue-500 shadow-md z-10"></div>
        </div>
        
        {/* Jarum kompas dengan efek animasi lebih halus */}
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
      
      {/* Insight dari analisis */}
      <div className="bg-blue-50 p-3 rounded-xl text-sm text-gray-700 mb-4">
        <p>{typeInsight}</p>
        <p className="mt-2 text-xs">{studyDifficulty}</p>
      </div>
      
      {/* Rekomendasi jurusan */}
      {jurusanRekomendasiList.length > 0 && (
        <div className="mb-2">
          <p className="text-sm font-semibold mb-2">Jurusan yang mungkin cocok:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {jurusanRekomendasiList.slice(0, 5).map((jurusan, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {jurusan}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Info tambahan */}
      <div className="text-xs text-gray-500 mt-4">
        {traitInfo.icon} {traitLabel}: Fokus pada {areaNames[dominant] || ''} dan subjek terkait
      </div>
    </div>
  );
}