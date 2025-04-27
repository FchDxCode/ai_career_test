export const questions_career = [
    {
      type: 'multiple_choice',
      question: "Kalau kamu jadi superhero, kamu lebih suka...",
      funFact: "Tahukah kamu? Banyak inovator teknologi seperti Elon Musk memulai karirnya dari hobi mereka!",
      options: [
        { icon: "🦸‍♂️", text: "Bekerja dengan tim superhero", description: "Seperti Avengers, berkolaborasi menyelamatkan dunia", value: "social" },
        { icon: "🦹‍♂️", text: "Solo mission",            description: "Seperti Batman, mengandalkan teknologi dan strategi sendiri", value: "analytical" },
        { icon: "🎭",  text: "Kombinasi keduanya",         description: "Seperti Spider-Man, kadang sendiri kadang dengan tim", value: "leadership" }
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
        { id: '2', icon: "🔍", text: "Memecahkan masalah",               description: "Analisis dan mencari solusi",       value: "analytical" },
        { id: '3', icon: "🤝", text: "Membantu orang lain",               description: "Berinteraksi dan memberikan dampak", value: "social" }
      ]
    }
  ];
  