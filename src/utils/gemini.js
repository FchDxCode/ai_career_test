import { GoogleGenerativeAI } from '@google/generative-ai';

const getApiKey = () => {
  const key = process.env.REACT_APP_GEMINI_API;
  if (!key) {
    console.error("API Key tidak ditemukan!");
    return "AIzaSyAKXiPl2kLA_9j4LOWxmFf0_-Myz_PkQoI"; 
  }
  return key;
};

export const getGeminiResponse = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI(getApiKey());
    
    // Gunakan model yang tersedia - gemini-1.0-pro (model versi sebelumnya)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Tambahkan instruksi eksplisit untuk mendapatkan valid JSON
    const promptWithInstructions = `${prompt}\n\nPenting: Berikan respons HANYA dalam format JSON yang valid, tanpa backtick atau komentar tambahan.`;
    
    const result = await model.generateContent(promptWithInstructions);
    const response = await result.response;
    const text = response.text();
    
    console.log("Raw API response:", text);
    
    // Coba bersihkan output jika ada backtick atau karakter tambahan
    let cleanedText = text;
    if (text.includes('```json')) {
      cleanedText = text.split('```json')[1].split('```')[0].trim();
    } else if (text.includes('```')) {
      cleanedText = text.split('```')[1].split('```')[0].trim();
    }
    
    return cleanedText;
  } catch (error) {
    console.error("Error with Gemini AI:", error);
    throw error;
  }
};

