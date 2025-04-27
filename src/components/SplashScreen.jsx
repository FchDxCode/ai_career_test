import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const inspiringPhrases = [
    "Mempersiapkan masa depanmu...",
    "Menghubungkan bakat dan minatmu...",
    "Menganalisis potensimu...",
    "Membuka jalan karirmu..."
  ];
  
  // Efek untuk mengisi progress bar secara bertahap
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.25; // Menaikkan 1.25% setiap interval untuk total 4 detik
        
        // Memicu perubahan frasa berdasarkan progress
        if (newProgress >= 25 && currentPhrase === 0) setCurrentPhrase(1);
        if (newProgress >= 50 && currentPhrase === 1) setCurrentPhrase(2);
        if (newProgress >= 75 && currentPhrase === 2) setCurrentPhrase(3);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 50); // Total waktu: 50ms × 80 steps = 4000ms (4 detik)
    
    // Menampilkan tagline setelah 1 detik
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 800);
    
    // Timer untuk memanggil onComplete setelah 4 detik
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4200); // Sedikit lebih lama untuk animasi exit
    
    return () => {
      clearInterval(interval);
      clearTimeout(taglineTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, currentPhrase]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background dengan gradient animasi */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 background-animate"></div>
      
      {/* Particle effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-70"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{ 
              y: [null, Math.random() * -window.innerHeight],
              scale: [0, Math.random() * 1.5 + 0.5, 0],
              opacity: [0, Math.random() * 0.8 + 0.2, 0]
            }}
            transition={{ 
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4">
        {/* Logo dan animasi */}
        <div className="relative">
          {/* Lingkaran luar berputar */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -inset-6 rounded-full border-2 border-blue-300 border-opacity-30"
            style={{ width: '160px', height: '160px' }}
          />
          
          {/* Lingkaran tengah berputar */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 -m-3 rounded-full border-2 border-t-purple-400 border-r-blue-400 border-b-purple-500 border-l-blue-400"
            style={{ width: '140px', height: '140px' }}
          />
          
          {/* Lingkaran dalam berputar */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 -m-1 rounded-full border-4 border-t-blue-400 border-r-transparent border-b-purple-500 border-l-transparent"
            style={{ width: '125px', height: '125px' }}
          />

          {/* Logo Container dengan glow effect */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 15px 2px rgba(59, 130, 246, 0.5)", 
                "0 0 25px 5px rgba(147, 51, 234, 0.5)", 
                "0 0 15px 2px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative w-28 h-28 bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
          >
            {/* Backdrop blur gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
            
            {/* Sinar yang bergerak */}
            <motion.div
              animate={{ 
                x: [-100, 100],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
              className="absolute -inset-1 skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            
            {/* Logo text dengan glow */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="z-10"
            >
              <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(191,219,254,0.5)]">C</span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Nama aplikasi dengan animasi */}
        <motion.div
          className="text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Career<motion.span
              animate={{ 
                textShadow: [
                  "0 0 7px rgba(191,219,254,0.8)",
                  "0 0 10px rgba(147,197,253,0.8)",
                  "0 0 7px rgba(191,219,254,0.8)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-blue-200"
            >AI</motion.span>
          </motion.h1>
          
          {/* Tagline dengan efek typing */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: showTagline ? 1 : 0,
              height: showTagline ? "auto" : 0
            }}
            className="overflow-hidden"
          >
            <p className="text-sm font-medium text-blue-100 mt-2 tracking-wider">
              TEMUKAN POTENSI • RAIH MASA DEPAN
            </p>
          </motion.div>
        </motion.div>
        
        {/* Progress bar dengan design yang lebih menarik */}
        <div className="w-full max-w-xs flex flex-col items-center gap-2">
          <motion.div 
            className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden relative"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
              style={{ width: `${progress}%` }}
            />
            
            {/* Glow effect pada progress bar */}
            <motion.div 
              className="absolute top-0 left-0 h-full rounded-full bg-white/50 blur-sm"
              style={{ width: `${Math.max(0, progress - 5)}%` }}
            />
            
            {/* Pulse di ujung progress bar */}
            {progress < 100 && (
              <motion.div 
                className="absolute top-0 h-full aspect-square bg-white rounded-full blur-sm"
                style={{ left: `${progress}%` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.3, 0.7] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          {/* Animasi pesan berganti */}
          <div className="h-6 relative overflow-hidden">
            <motion.div 
              className="flex flex-col absolute w-full"
              animate={{ y: -currentPhrase * 24 }} // 24px per item for transition
              transition={{ duration: 0.5 }}
            >
              {inspiringPhrases.map((phrase, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentPhrase === index ? 1 : 0 }}
                  className="h-6 text-center text-blue-100 text-sm whitespace-nowrap"
                >
                  {phrase}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;