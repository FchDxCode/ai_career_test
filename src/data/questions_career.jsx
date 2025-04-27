export const questions_career = [
  {
    type: 'multiple_choice',
    question: "Kalau kamu jadi superhero, kamu lebih suka...",
    funFact: "Tahukah kamu? Banyak inovator teknologi seperti Elon Musk memulai karirnya dari hobi mereka!",
    options: [
      { icon: "🦸‍♂️", text: "Bekerja dengan tim superhero", description: "Seperti Avengers, berkolaborasi menyelamatkan dunia", value: "social" },
      { icon: "🦹‍♂️", text: "Solo mission", description: "Seperti Batman, mengandalkan teknologi dan strategi sendiri", value: "analytical" },
      { icon: "🎭", text: "Kombinasi keduanya", description: "Seperti Spider-Man, kadang sendiri kadang dengan tim", value: "leadership" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa nyaman kamu bekerja dengan teknologi?",
    funFact: "Di era digital, hampir semua pekerjaan membutuhkan kemampuan teknologi dasar!",
    options: [
      { icon: "📱", text: "Lebih suka cara tradisional", value: "traditional" },
      { icon: "💻", text: "Sangat nyaman dengan teknologi", value: "tech_savvy" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan hal berikut berdasarkan yang paling kamu sukai",
    funFact: "Prioritas kita sering mencerminkan passion tersembunyi!",
    options: [
      { id: '1', icon: "🎨", text: "Membuat sesuatu yang kreatif", description: "Desain, seni, atau kreasi baru", value: "creative" },
      { id: '2', icon: "🔍", text: "Memecahkan masalah", description: "Analisis dan mencari solusi", value: "analytical" },
      { id: '3', icon: "🤝", text: "Membantu orang lain", description: "Berinteraksi dan memberikan dampak", value: "social" }
    ]
  },
  // === Tambahan Multiple Choice ===
  {
    type: 'multiple_choice',
    question: "Saat ada masalah, kamu lebih suka...",
    funFact: "Kemampuan problem-solving sangat dicari dalam dunia kerja!",
    options: [
      { icon: "🧩", text: "Menganalisis penyebabnya", description: "Memahami akar masalah", value: "analytical" },
      { icon: "⚡", text: "Bertindak cepat", description: "Langsung mengambil keputusan", value: "leadership" },
      { icon: "👂", text: "Mendengarkan berbagai sudut pandang", description: "Mencari masukan dari orang lain", value: "social" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Di sekolah, pelajaran favoritmu apa?",
    funFact: "Minat akademis bisa mengarah ke karir masa depan!",
    options: [
      { icon: "🧮", text: "Matematika", description: "Suka angka dan logika", value: "analytical" },
      { icon: "🎨", text: "Seni", description: "Mengekspresikan kreativitas", value: "creative" },
      { icon: "🌍", text: "Ilmu Sosial", description: "Memahami masyarakat", value: "social" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Kalau diberi pilihan proyek, kamu lebih suka...",
    funFact: "Cara memilih proyek mencerminkan kepribadian kerja!",
    options: [
      { icon: "🛠️", text: "Membangun sesuatu dari awal", description: "Proyek kreatif", value: "creative" },
      { icon: "📈", text: "Menganalisis data dan membuat laporan", description: "Proyek analitis", value: "analytical" },
      { icon: "🧑‍🤝‍🧑", text: "Mengatur tim dan koordinasi", description: "Proyek sosial", value: "leadership" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Kamu lebih nyaman bekerja di lingkungan yang...",
    funFact: "Lingkungan kerja yang sesuai bisa meningkatkan produktivitas!",
    options: [
      { icon: "🏢", text: "Terstruktur dan formal", description: "Penuh aturan dan rencana", value: "analytical" },
      { icon: "🏖️", text: "Fleksibel dan santai", description: "Lebih kreatif dan bebas", value: "creative" },
      { icon: "🏡", text: "Dekat dengan komunitas", description: "Berkontribusi langsung ke masyarakat", value: "social" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Kalau dihadapkan pilihan karir, kamu lebih suka...",
    funFact: "Pilihan ini menunjukkan orientasi karir awalmu!",
    options: [
      { icon: "🧠", text: "Peneliti", description: "Mencari tahu hal baru", value: "analytical" },
      { icon: "🎤", text: "Presenter", description: "Menyampaikan ide secara kreatif", value: "leadership" },
      { icon: "🤝", text: "Pekerja sosial", description: "Membantu orang lain", value: "social" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Saat melakukan tugas kelompok, kamu biasanya...",
    funFact: "Peran dalam tim menggambarkan gaya kepemimpinan!",
    options: [
      { icon: "🧑‍🏫", text: "Mengatur jalannya diskusi", description: "Memimpin", value: "leadership" },
      { icon: "🧠", text: "Menganalisis semua ide", description: "Berpikir kritis", value: "analytical" },
      { icon: "💬", text: "Mendukung teman dan menjaga kekompakan", description: "Kolaboratif", value: "social" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Kamu lebih semangat saat...",
    funFact: "Energi positif dalam pekerjaan membuat performa meningkat!",
    options: [
      { icon: "🎨", text: "Mengekspresikan ide kreatif", description: "Menciptakan sesuatu baru", value: "creative" },
      { icon: "🧪", text: "Mencoba eksperimen dan riset", description: "Menguji dan menganalisis", value: "analytical" },
      { icon: "👐", text: "Membantu menyelesaikan masalah orang", description: "Berorientasi sosial", value: "social" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Bagaimana kamu melihat 'sukses'?",
    funFact: "Definisi sukses berhubungan erat dengan motivasi karir!",
    options: [
      { icon: "🏆", text: "Mencapai tujuan pribadi", description: "Mandiri", value: "leadership" },
      { icon: "👥", text: "Memberi manfaat bagi banyak orang", description: "Kolaboratif", value: "social" },
      { icon: "🧩", text: "Menemukan solusi inovatif", description: "Problem solver", value: "analytical" }
    ]
  },
  {
    type: 'multiple_choice',
    question: "Kalau ada peluang baru, kamu lebih...",
    funFact: "Keberanian mengambil peluang mempengaruhi pertumbuhan karir!",
    options: [
      { icon: "🚀", text: "Langsung mencoba", description: "Berani mengambil risiko", value: "leadership" },
      { icon: "🔬", text: "Menganalisis pro-kontra dulu", description: "Logis dan hati-hati", value: "analytical" },
      { icon: "🤝", text: "Bertanya pendapat teman", description: "Kolaboratif", value: "social" }
    ]
  },
  // === Tambahan Slider ===
  {
    type: 'slider',
    question: "Seberapa suka kamu memimpin orang lain?",
    funFact: "Skill leadership dibutuhkan di hampir semua bidang!",
    options: [
      { icon: "🙇‍♂️", text: "Lebih suka mengikuti", value: "supportive" },
      { icon: "🧑‍✈️", text: "Suka memimpin", value: "leadership" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa nyaman kamu bekerja dalam tim?",
    funFact: "Kolaborasi efektif meningkatkan hasil kerja!",
    options: [
      { icon: "🧍", text: "Lebih suka sendiri", value: "independent" },
      { icon: "🧑‍🤝‍🧑", text: "Lebih suka bersama tim", value: "teamwork" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa besar minatmu terhadap data dan angka?",
    funFact: "Data adalah kunci di banyak bidang modern!",
    options: [
      { icon: "📚", text: "Kurang tertarik", value: "creative" },
      { icon: "📊", text: "Sangat tertarik", value: "analytical" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa kreatif kamu dalam menyelesaikan masalah?",
    funFact: "Thinking out of the box adalah keunggulan kompetitif!",
    options: [
      { icon: "🛤️", text: "Lebih suka cara biasa", value: "analytical" },
      { icon: "🚀", text: "Selalu mencari cara baru", value: "creative" }
    ]
  },
  {
    type: 'slider',
    question: "Seberapa suka kamu berinteraksi dengan banyak orang?",
    funFact: "Networking membantu mempercepat karir!",
    options: [
      { icon: "🧍", text: "Lebih suka interaksi terbatas", value: "independent" },
      { icon: "👥", text: "Sangat suka berjejaring", value: "social" }
    ]
  },
  // === Tambahan Drag and Drop ===
  {
    type: 'drag_drop',
    question: "Urutkan aktivitas berikut dari paling menarik buatmu",
    funFact: "Kecenderungan ini bisa menunjukkan bidang karir!",
    options: [
      { id: '4', icon: "💡", text: "Brainstorm ide", description: "Menciptakan gagasan baru", value: "creative" },
      { id: '5', icon: "📋", text: "Menyusun rencana", description: "Membuat strategi detail", value: "analytical" },
      { id: '6', icon: "🤝", text: "Berinteraksi dengan klien", description: "Membangun hubungan sosial", value: "social" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan jenis kegiatan kerja yang kamu sukai",
    funFact: "Preferensi kerja membantu menemukan karir ideal!",
    options: [
      { id: '7', icon: "🎬", text: "Proyek kreatif", description: "Film, desain, konten", value: "creative" },
      { id: '8', icon: "📊", text: "Analisa data", description: "Statistik dan riset", value: "analytical" },
      { id: '9', icon: "💬", text: "Melayani pelanggan", description: "Interaksi sosial", value: "social" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan apa yang menurutmu paling penting dalam bekerja",
    funFact: "Nilai ini penting untuk kecocokan karir!",
    options: [
      { id: '10', icon: "🎯", text: "Mencapai target", description: "Hasil konkret", value: "leadership" },
      { id: '11', icon: "🤝", text: "Membangun hubungan", description: "Tim solid", value: "social" },
      { id: '12', icon: "🧠", text: "Mengasah keahlian", description: "Skill bertumbuh", value: "analytical" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan gaya kerja favoritmu",
    funFact: "Gaya kerja yang cocok = produktivitas tinggi!",
    options: [
      { id: '13', icon: "🛠️", text: "Praktis dan langsung", description: "Tindakan nyata", value: "leadership" },
      { id: '14', icon: "📚", text: "Teoritis dan analitis", description: "Berpikir mendalam", value: "analytical" },
      { id: '15', icon: "🎨", text: "Eksperimen kreatif", description: "Ide-ide baru", value: "creative" }
    ]
  },
  {
    type: 'drag_drop',
    question: "Urutkan tujuan karir yang paling kamu inginkan",
    funFact: "Motivasi karir akan membentuk langkahmu!",
    options: [
      { id: '16', icon: "👑", text: "Menjadi pemimpin", description: "Menginspirasi banyak orang", value: "leadership" },
      { id: '17', icon: "💼", text: "Ahli di bidang tertentu", description: "Spesialisasi", value: "analytical" },
      { id: '18', icon: "🌍", text: "Berkontribusi untuk dunia", description: "Misi sosial", value: "social" }
    ]
  }
];
