// src/utils/promptTemplates.js
export const generateCareerPrompt = (answers, traits) => {
  return `
Kamu adalah AI Career Counselor. Berikan analisis karir dalam format JSON di bawah ini. JANGAN TAMBAHKAN BACKTICK, HANYA RESPONS JSON.

Jawaban user: ${JSON.stringify(answers)}
Trait terdeteksi: ${JSON.stringify(traits)}

RESPONS HARUS DALAM FORMAT JSON SEPERTI INI, TANPA TAMBAHAN APAPUN:
{
  "personalityTraits": {
    "dominantTrait": "contoh: Analytical Thinker",
    "description": "contoh: Kamu memiliki kemampuan analisis yang kuat"
  },
  "careerRecommendations": [
    {
      "title": "contoh: Software Engineer",
      "description": "contoh: Mengembangkan aplikasi dan sistem",
      "matchPercentage": 85,
      "requiredSkills": ["Skill 1", "Skill 2", "Skill 3"],
      "growthPotential": "contoh: Prospek sangat bagus dengan perkembangan teknologi"
    }
  ],
  "developmentSuggestions": [
    "contoh: Pelajari coding", 
    "contoh: Ikuti kursus online"
  ],
  "additionalInsights": "contoh: Kamu memiliki potensi bagus di bidang teknologi"
}`;
};

export const generateJurusanPrompt = (answers, traits) => {
    return `
  Kamu adalah AI Education Counselor profesional. Analisis jawaban berikut dan berikan rekomendasi jurusan kuliah yang sesuai.
  Format output harus dalam bahasa Indonesia dan dalam format berikut:
  {
    "academicProfile": {
      "dominantInterest": "minat akademik dominan",
      "learningStyle": "gaya belajar yang sesuai"
    },
    "jurusanRecommendations": [
      {
        "name": "nama jurusan",
        "description": "deskripsi singkat",
        "matchPercentage": persentase kecocokan,
        "prospek": ["karir 1", "karir 2", "karir 3"],
        "mataKuliah": ["mata kuliah utama 1", "mata kuliah utama 2"]
      }
    ],
    "preparationTips": [
      "tips persiapan 1",
      "tips persiapan 2"
    ],
    "additionalAdvice": "saran tambahan untuk persiapan kuliah"
  }
  
  Jawaban user:
  ${JSON.stringify(answers, null, 2)}
  
  Trait yang terdeteksi:
  ${JSON.stringify(traits, null, 2)}
  
  Berikan analisis yang DETAIL dan REALISTIS dengan fokus pada POTENSI AKADEMIK user.`;
  };