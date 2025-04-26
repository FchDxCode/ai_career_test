// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6"
        >
          AI Career Counselor
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-12"
        >
          Bingung menentukan masa depan? Biar AI bantu kamu menemukan jalur yang tepat
        </motion.p>

        {/* Two Main Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full sm:w-64"
          >
            <button
              onClick={() => navigate('/test-jurusan')}
              className="w-full bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              Test Jurusan Kuliah
              <p className="text-sm font-normal mt-1 opacity-80">Untuk calon mahasiswa</p>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full sm:w-64"
          >
            <button
              onClick={() => navigate('/test-karir')}
              className="w-full bg-secondary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
            >
              Test Karir
              <p className="text-sm font-normal mt-1 opacity-80">Untuk pencari kerja</p>
            </button>
          </motion.div>
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Cara Kerja</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 max-w-sm mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 3) }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-primary text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const steps = [
  {
    icon: "1️⃣",
    title: "Pilih Jenis Tes",
    description: "Pilih antara tes jurusan kuliah atau tes karir sesuai kebutuhanmu"
  },
  {
    icon: "2️⃣",
    title: "Jawab Pertanyaan",
    description: "Jawab beberapa pertanyaan tentang minat, bakat, dan kepribadianmu"
  },
  {
    icon: "3️⃣",
    title: "Dapatkan Rekomendasi",
    description: "AI akan menganalisis dan memberikan rekomendasi yang sesuai untukmu"
  }
];

const features = [
  {
    icon: "🎯",
    title: "Analisis Akurat",
    description: "Powered by Google Gemini AI"
  },
  {
    icon: "🎓",
    title: "Data Lengkap",
    description: "Informasi 100+ jurusan & karir"
  },
  {
    icon: "⚡",
    title: "Hasil Instan",
    description: "Dapatkan hasil dalam hitungan detik"
  },
  {
    icon: "💡",
    title: "Saran Terperinci",
    description: "Lengkap dengan alasan & insight"
  }
];

export default Home;