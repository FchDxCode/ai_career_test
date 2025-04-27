import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loadFull } from "tsparticles";
import Particles from '@tsparticles/react';

const Home = () => {
  const navigate = useNavigate();

  const particlesInit = async engine => {
    // engine sekarang kompatibel, loadFull akan menambahkan semua plugin
    await loadFull(engine);
  };

  // Untuk animasi statistik
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const statsControls = useAnimation();

  // Efek menghitung angka untuk statistik
  useEffect(() => {
    if (isStatsInView && !hasAnimated) {
      statsControls.start("visible");
      
      // Mulai animasi counter
      const statsElements = document.querySelectorAll('.stat-number');
      statsElements.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // 2 detik
        const interval = duration / target;
        
        const counter = setInterval(() => {
          count++;
          stat.textContent = count;
          
          if (count === target) {
            clearInterval(counter);
          }
        }, interval);
      });
      
      setHasAnimated(true);
    }
  }, [isStatsInView, statsControls, hasAnimated]);

  return (
    <>
      {/* Hero Section dengan Particles */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-blue-200 to-purple-300">
        {/* Partikel Animasi Background */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0"
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                outMode: "out",
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
              },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
              },
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true
              },
              modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
              }
            }
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Temukan <span className="text-yellow-300">Masa Depan</span> Yang 
                <span className="relative inline-block ml-3">
                  Cerah
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-2 bg-blue-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-blue-500 mt-6 mb-10"
              >
                Gunakan AI untuk menemukan jurusan kuliah dan karir yang sesuai dengan potensi dan passion kamu.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-64 btn-glow bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-8 rounded-xl text-lg font-semibold shadow-lg"
                  onClick={() => navigate('/test-jurusan')}
                >
                  Mulai Test Jurusan
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-64 btn-glow bg-gradient-to-r from-purple-500 to-purple-700 text-white py-4 px-8 rounded-xl text-lg font-semibold shadow-lg"
                  onClick={() => navigate('/test-karir')}
                >
                  Mulai Test Karir
                </motion.button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-8 flex items-center justify-center"
              >
                <motion.p
                  href="#quiz"
                  whileHover={{ y: -3 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-white flex flex-col items-center"
                >
                  <span className="mb-2">Scroll ke bawah</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistik dengan Counter Animation */}
      <section ref={statsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isStatsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-16"
          >
            CareerAI dalam Angka
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className={`text-5xl font-bold mb-2 ${stat.color}`}>
                  <span className="stat-number" data-target={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategori Jurusan/Karir dengan Cards Interaktif */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Temukan Bidang yang Kamu Minati</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Eksplorasi berbagai bidang studi dan karir untuk menemukan passion dan potensimu</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl text-white group-hover:scale-125 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors flex items-center"
                  >
                    Jelajahi
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Data untuk halaman
const stats = [
  { number: 5600, suffix: "+", label: "Pengguna Aktif", color: "text-blue-600" },
  { number: 125, suffix: "+", label: "Jurusan Tersedia", color: "text-purple-600" },
  { number: 98, suffix: "%", label: "Tingkat Akurasi", color: "text-green-600" },
  { number: 250, suffix: "+", label: "Karir Terdaftar", color: "text-indigo-600" }
];

const categories = [
  {
    icon: "🔬",
    title: "Sains & Teknologi",
    description: "Eksplorasi dunia teknologi, komputer, dan sains dalam berbagai bidang ilmiah."
  },
  {
    icon: "📊",
    title: "Bisnis & Ekonomi",
    description: "Temukan potensimu dalam dunia bisnis, manajemen, dan keuangan."
  },
  {
    icon: "🎨",
    title: "Seni & Desain",
    description: "Salurkan kreativitasmu dalam bidang desain, musik, dan seni visual."
  },
  {
    icon: "👩‍⚕️",
    title: "Kesehatan",
    description: "Jelajahi karir di bidang kedokteran, keperawatan, dan kesehatan masyarakat."
  },
  {
    icon: "👨‍⚖️",
    title: "Sosial & Hukum",
    description: "Berbagai pilihan karir dalam bidang hukum, politik, dan sosial."
  },
  {
    icon: "✈️",
    title: "Pariwisata & Bahasa",
    description: "Temukan peluang dalam bidang pariwisata, perhotelan, dan bahasa."
  }
];

export default Home;