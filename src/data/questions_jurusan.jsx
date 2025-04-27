// src/data/questions_jurusan.jsx
export const questions_jurusan = [
    {
      type: 'multiple_choice',
      question: "Pelajaran apa yang paling membuatmu penasaran?",
      funFact: "Ketertarikan pada mata pelajaran tertentu bisa jadi petunjuk jurusan yang cocok untukmu!",
      options: [
        { 
          icon: "🧪", 
          text: "Sains (Fisika/Kimia/Biologi)", 
          description: "Suka eksperimen dan memahami fenomena alam", 
          value: "science" 
        },
        { 
          icon: "💻", 
          text: "Matematika & Komputer", 
          description: "Suka logika dan pemecahan masalah", 
          value: "computing" 
        },
        { 
          icon: "📚", 
          text: "Sosial & Bahasa", 
          description: "Suka memahami masyarakat dan komunikasi", 
          value: "social_studies" 
        }
      ]
    },
    {
      type: 'slider',
      question: "Seberapa tertarik kamu dengan aktivitas praktik vs teori?",
      funFact: "Beberapa jurusan memiliki lebih banyak praktikum, sementara yang lain lebih fokus ke teori!",
      options: [
        { icon: "📖", text: "Lebih suka teori dan konsep", value: "theoretical" },
        { icon: "🔧", text: "Lebih suka praktik langsung", value: "practical" }
      ]
    },
    {
      type: 'drag_drop',
      question: "Urutkan kegiatan kuliah berikut dari yang paling kamu minati",
      funFact: "Aktivitas yang kamu sukai bisa menunjukkan jurusan yang cocok denganmu!",
      options: [
        { 
          id: '1', 
          icon: "🔬", 
          text: "Penelitian dan Riset", 
          description: "Mengumpulkan data dan analisis mendalam", 
          value: "research" 
        },
        { 
          id: '2', 
          icon: "👥", 
          text: "Diskusi dan Presentasi", 
          description: "Bertukar ide dan public speaking", 
          value: "communication" 
        },
        { 
          id: '3', 
          icon: "💡", 
          text: "Proyek Kreatif", 
          description: "Membuat karya dan inovasi", 
          value: "creative" 
        }
      ]
    },
    {
      type: 'multiple_choice',
      question: "Lingkungan belajar seperti apa yang kamu inginkan?",
      funFact: "Setiap jurusan punya suasana belajar yang berbeda lho!",
      options: [
        { 
          icon: "🧪", 
          text: "Lab dan Studio", 
          description: "Banyak praktikum dan eksperimen", 
          value: "lab_based" 
        },
        { 
          icon: "💻", 
          text: "Ruang Komputer", 
          description: "Fokus pada teknologi dan pemrograman", 
          value: "computer_based" 
        },
        { 
          icon: "🏢", 
          text: "Kelas Diskusi", 
          description: "Banyak diskusi dan presentasi", 
          value: "discussion_based" 
        }
      ]
    }
  ];
  
  // Kita juga bisa menambahkan mapping khusus untuk jurusan
  export const jurusanTraits = {
    science: {
      icon: "🔬",
      label: "Sains & Teknologi",
      jurusan: ["Teknik", "Kedokteran", "Farmasi"]
    },
    computing: {
      icon: "💻",
      label: "Komputasi",
      jurusan: ["Informatika", "Sistem Informasi", "Data Science"]
    },
    social_studies: {
      icon: "📚",
      label: "Sosial Humaniora",
      jurusan: ["Psikologi", "Komunikasi", "Hukum"]
    },
    research: {
      icon: "🔬",
      label: "Penelitian",
      jurusan: ["Biologi", "Kimia", "Fisika"]
    },
    communication: {
      icon: "👥",
      label: "Komunikasi",
      jurusan: ["Jurnalistik", "Public Relations", "Marketing"]
    },
    creative: {
      icon: "🎨",
      label: "Kreatif",
      jurusan: ["DKV", "Arsitektur", "Film"]
    }
  };