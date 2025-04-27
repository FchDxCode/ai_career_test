export const questions_jurusan = [
  {
    type: 'multiple_choice',
    question: "Pelajaran apa yang paling membuatmu penasaran?",
    funFact: "Ketertarikan pada mata pelajaran tertentu bisa jadi petunjuk jurusan yang cocok untukmu!",
    options: [
      { icon: "🧪", text: "Sains (Fisika/Kimia/Biologi)", description: "Suka eksperimen dan memahami fenomena alam", value: "science" },
      { icon: "💻", text: "Matematika & Komputer", description: "Suka logika dan pemecahan masalah", value: "computing" },
      { icon: "📚", text: "Sosial & Bahasa", description: "Suka memahami masyarakat dan komunikasi", value: "social_studies" }
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
      { id: '1', icon: "🔬", text: "Penelitian dan Riset", description: "Mengumpulkan data dan analisis mendalam", value: "research" },
      { id: '2', icon: "👥", text: "Diskusi dan Presentasi", description: "Bertukar ide dan public speaking", value: "communication" },
      { id: '3', icon: "💡", text: "Proyek Kreatif", description: "Membuat karya dan inovasi", value: "creative" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Lingkungan belajar seperti apa yang kamu inginkan?",
    funFact: "Setiap jurusan punya suasana belajar yang berbeda lho!",
    options: [
      { icon: "🧪", text: "Lab dan Studio", description: "Banyak praktikum dan eksperimen", value: "lab_based" },
      { icon: "💻", text: "Ruang Komputer", description: "Fokus pada teknologi dan pemrograman", value: "computer_based" },
      { icon: "🏢", text: "Kelas Diskusi", description: "Banyak diskusi dan presentasi", value: "discussion_based" }
    ]
  },
  // ===== Tambahan Multiple Choice (6) =====
  {
    type: 'multiple_choice',
    question: "Kalau kamu mengikuti lomba, kamu lebih memilih...",
    funFact: "Kompetisi bisa mengasah bakat spesifikmu!",
    options: [
      { icon: "📊", text: "Olimpiade Sains", description: "Menunjukkan logika dan analisis", value: "science" },
      { icon: "🖥️", text: "Lomba Coding", description: "Mengasah kemampuan programming", value: "computing" },
      { icon: "🎤", text: "Debat Bahasa", description: "Melatih argumentasi dan komunikasi", value: "social_studies" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Saat menonton film dokumenter, kamu lebih tertarik tentang...",
    funFact: "Topik yang kamu sukai bisa mengarah ke minat akademis!",
    options: [
      { icon: "🌋", text: "Fenomena alam", description: "Ilmiah dan eksploratif", value: "science" },
      { icon: "🤖", text: "Teknologi terbaru", description: "Kecerdasan buatan, robotik", value: "computing" },
      { icon: "🗣️", text: "Isu sosial", description: "Komunitas, budaya, perubahan sosial", value: "social_studies" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Gaya belajar kamu lebih ke arah...",
    funFact: "Mengetahui gaya belajar membantumu sukses di kuliah!",
    options: [
      { icon: "🧠", text: "Logis dan analitis", description: "Mengutamakan logika", value: "science" },
      { icon: "🖥️", text: "Eksperimen dan trial-error", description: "Suka mencoba langsung", value: "computing" },
      { icon: "👥", text: "Diskusi dan tanya jawab", description: "Suka bertukar ide", value: "social_studies" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Kalau diberi proyek kelompok, kamu lebih tertarik...",
    funFact: "Proyek menunjukkan kecenderungan minatmu!",
    options: [
      { icon: "🔬", text: "Menganalisis dan eksperimen", description: "Sains dan riset", value: "science" },
      { icon: "🧑‍💻", text: "Membangun aplikasi", description: "Komputasi dan teknologi", value: "computing" },
      { icon: "📰", text: "Membuat kampanye sosial", description: "Komunikasi dan masyarakat", value: "social_studies" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Topik apa yang lebih membuatmu ingin belajar lebih dalam?",
    funFact: "Minat ini bisa membantu memilih jurusan!",
    options: [
      { icon: "🧬", text: "Genetika dan Biologi", description: "Penelitian sains", value: "science" },
      { icon: "💾", text: "Kecerdasan Buatan", description: "Masa depan teknologi", value: "computing" },
      { icon: "🌎", text: "Isu Global dan Politik", description: "Sosial humaniora", value: "social_studies" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Pekerjaan impianmu lebih banyak berhubungan dengan...",
    funFact: "Bayangan masa depanmu bisa mengarah ke jurusan yang sesuai!",
    options: [
      { icon: "⚗️", text: "Penelitian laboratorium", description: "Saintis", value: "science" },
      { icon: "🧑‍💻", text: "Membuat aplikasi dan sistem", description: "Software engineer", value: "computing" },
      { icon: "🧑‍🎓", text: "Advokasi sosial", description: "Penggerak perubahan sosial", value: "social_studies" }
    ]
  },
  // ===== Tambahan Slider (5) =====
  {
    type: 'slider',
    question: "Seberapa nyaman kamu menghafal dibanding menganalisis?",
    funFact: "Beberapa jurusan lebih banyak membutuhkan analisis dibanding hafalan!",
    options: [
      { icon: "🧠", text: "Lebih suka menganalisis", value: "analytical" },
      { icon: "📚", text: "Lebih suka menghafal", value: "memorization" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa besar minatmu pada sains dan eksperimen?",
    funFact: "Minat ini cocok untuk jurusan teknik atau kedokteran!",
    options: [
      { icon: "🔬", text: "Kurang tertarik", value: "not_interested" },
      { icon: "🧪", text: "Sangat tertarik", value: "science_enthusiast" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa sering kamu menggunakan teknologi dalam aktivitas harian?",
    funFact: "Kemampuan teknologi dibutuhkan di banyak bidang!",
    options: [
      { icon: "🖥️", text: "Jarang", value: "low_tech" },
      { icon: "📱", text: "Sering", value: "high_tech" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa nyaman kamu berbicara di depan umum?",
    funFact: "Public speaking penting di banyak jurusan sosial!",
    options: [
      { icon: "😬", text: "Kurang nyaman", value: "introvert" },
      { icon: "🎤", text: "Sangat nyaman", value: "extrovert" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa suka kamu belajar tentang budaya dan masyarakat?",
    funFact: "Minat ini cocok untuk jurusan sosial dan humaniora!",
    options: [
      { icon: "📖", text: "Kurang tertarik", value: "not_interested" },
      { icon: "🌍", text: "Sangat tertarik", value: "social_enthusiast" }
    ]
  },
  // ===== Tambahan Drag and Drop (5) =====
  {
    type: 'drag_drop',
    question: "Urutkan topik kuliah yang kamu sukai",
    funFact: "Topik favorit bisa mengarahkan ke jurusan tepat!",
    options: [
      { id: '4', icon: "🧪", text: "Eksperimen laboratorium", description: "Praktikum sains", value: "science" },
      { id: '5', icon: "🧑‍💻", text: "Programming", description: "Membangun software", value: "computing" },
      { id: '6', icon: "📰", text: "Kajian budaya", description: "Analisis sosial", value: "social_studies" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan jenis tugas yang paling kamu sukai",
    funFact: "Tipe tugas favorit bisa cocok dengan gaya kuliah!",
    options: [
      { id: '7', icon: "📄", text: "Menulis laporan", description: "Tugas analisis", value: "science" },
      { id: '8', icon: "🖥️", text: "Membuat program komputer", description: "Tugas teknikal", value: "computing" },
      { id: '9', icon: "📢", text: "Presentasi ide", description: "Tugas berbicara", value: "social_studies" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan skill yang ingin kamu kembangkan",
    funFact: "Skill yang diasah di kuliah bisa menentukan karirmu!",
    options: [
      { id: '10', icon: "🔬", text: "Eksperimen ilmiah", description: "Skill penelitian", value: "science" },
      { id: '11', icon: "🧑‍💻", text: "Software development", description: "Skill programming", value: "computing" },
      { id: '12', icon: "🧑‍💼", text: "Negosiasi dan komunikasi", description: "Skill sosial", value: "social_studies" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan cara belajar favoritmu",
    funFact: "Mengetahui caramu belajar = sukses kuliah!",
    options: [
      { id: '13', icon: "🔍", text: "Riset mandiri", description: "Belajar eksploratif", value: "science" },
      { id: '14', icon: "👨‍💻", text: "Latihan coding", description: "Belajar teknikal", value: "computing" },
      { id: '15', icon: "🗣️", text: "Diskusi kelompok", description: "Belajar sosial", value: "social_studies" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan motivasi utama kamu kuliah",
    funFact: "Motivasi ini membentuk pilihan jurusan!",
    options: [
      { id: '16', icon: "🏆", text: "Menjadi ilmuwan", description: "Karir sains", value: "science" },
      { id: '17', icon: "💻", text: "Membuat teknologi baru", description: "Karir teknologi", value: "computing" },
      { id: '18', icon: "🌍", text: "Mengubah masyarakat", description: "Karir sosial", value: "social_studies" }
    ]
  }
];

  
export const jurusanTraits = {
  science: {
    icon: "🔬",
    label: "Sains & Teknologi",
    jurusan: ["Teknik", "Kedokteran", "Farmasi", "Fisika", "Kimia", "Biologi"]
  },
  computing: {
    icon: "💻",
    label: "Komputasi & Data",
    jurusan: ["Informatika", "Sistem Informasi", "Data Science", "Cyber Security", "Artificial Intelligence"]
  },
  social_studies: {
    icon: "📚",
    label: "Sosial Humaniora",
    jurusan: ["Psikologi", "Komunikasi", "Hukum", "Sosiologi", "Hubungan Internasional"]
  },
  research: {
    icon: "🔬",
    label: "Penelitian & Riset",
    jurusan: ["Biologi", "Kimia", "Fisika", "Farmasi", "Kesehatan Masyarakat"]
  },
  communication: {
    icon: "👥",
    label: "Komunikasi & Public Relations",
    jurusan: ["Jurnalistik", "Public Relations", "Marketing", "Advertising", "Broadcasting"]
  },
  creative: {
    icon: "🎨",
    label: "Kreatif & Desain",
    jurusan: ["Desain Komunikasi Visual (DKV)", "Arsitektur", "Film", "Animasi", "Seni Rupa"]
  },
  lab_based: {
    icon: "🧪",
    label: "Lab dan Teknik",
    jurusan: ["Teknik Kimia", "Teknik Bioproses", "Kedokteran", "Farmasi"]
  },
  computer_based: {
    icon: "💻",
    label: "Komputer dan Teknologi",
    jurusan: ["Teknik Informatika", "Software Engineering", "Information System"]
  },
  discussion_based: {
    icon: "🏢",
    label: "Diskusi dan Analisis",
    jurusan: ["Ilmu Komunikasi", "Sosiologi", "Politik", "Hukum"]
  },
  analytical: {
    icon: "📊",
    label: "Analytical Thinkers",
    jurusan: ["Matematika", "Fisika", "Statistika", "Ekonomi"]
  },
  memorization: {
    icon: "📚",
    label: "Memory-Based Learning",
    jurusan: ["Kedokteran", "Farmasi", "Sejarah", "Ilmu Hukum"]
  },
  science_enthusiast: {
    icon: "🧪",
    label: "Science Enthusiast",
    jurusan: ["Kedokteran", "Bioteknologi", "Fisioterapi", "Ilmu Gizi"]
  },
  not_interested: {
    icon: "🛑",
    label: "Kurang Tertarik",
    jurusan: ["Pilihan jurusan perlu dipertimbangkan ulang berdasarkan minat baru"]
  },
  low_tech: {
    icon: "📴",
    label: "Low Tech Usage",
    jurusan: ["Hukum", "Ilmu Politik", "Sosiologi"]
  },
  high_tech: {
    icon: "📱",
    label: "High Tech User",
    jurusan: ["Teknik Informatika", "Data Science", "AI & Machine Learning"]
  },
  introvert: {
    icon: "🙇‍♂️",
    label: "Individual Learning",
    jurusan: ["Ilmu Komputer", "Teknik Sipil", "Matematika"]
  },
  extrovert: {
    icon: "🎤",
    label: "Public Interaction",
    jurusan: ["Public Relations", "Jurnalistik", "Pendidikan", "Hubungan Internasional"]
  },
  social_enthusiast: {
    icon: "🌍",
    label: "Sosial Enthusiast",
    jurusan: ["Sosiologi", "Pendidikan", "Psikologi", "Ilmu Politik"]
  }
};
