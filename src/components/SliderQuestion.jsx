import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function SliderQuestion({ options, onComplete }) {
  const [value, setValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Menentukan opsi mana yang lebih dominan berdasarkan nilai slider
  const dominantOption = value < 50 ? options[0] : options[1];
  const dominancePercentage = value < 50 
    ? Math.round(100 - value * 2) 
    : Math.round((value - 50) * 2);
  
  // Efek untuk menampilkan konfirmasi setelah slider tidak digerakkan selama 1 detik
  useEffect(() => {
    if (!isDragging) {
      const timer = setTimeout(() => {
        setShowConfirmation(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowConfirmation(false);
    }
  }, [value, isDragging]);

  // CSS untuk mengatur lebar bagian sesuai dengan nilai slider
  const leftWidth = `${100 - value}%`;
  const rightWidth = `${value}%`;

  return (
    <div className="space-y-8">
      
      {/* Container untuk opsi dan slider */}
      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-sm">
        {/* Background dinamis yang bergerak sesuai nilai slider */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden flex">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-100 to-blue-200"
            animate={{ width: leftWidth }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="h-full bg-gradient-to-r from-purple-200 to-purple-100"
            animate={{ width: rightWidth }}
            transition={{ duration: 0.2 }}
          />
        </div>
        
        {/* Opsi di kiri dan kanan */}
        <div className="relative flex justify-between mb-12">
          {options.map((opt, idx) => (
            <motion.div
              key={idx}
              className={`text-center px-4 py-3 rounded-lg ${idx === 0 ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'} ${value === (idx === 0 ? 0 : 100) ? 'ring-4 ring-opacity-50' : ''} ${idx === 0 ? (value < 30 ? 'ring-4 ring-blue-300' : '') : (value > 70 ? 'ring-4 ring-purple-300' : '')}`}
              animate={{
                scale: (idx === 0 && value < 30) || (idx === 1 && value > 70) ? 1.05 : 1
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-4xl block mb-2">{opt.icon}</span>
              <span className="font-medium">{opt.text}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Slider yang ditingkatkan */}
        <div className="relative z-10">
          <div className="absolute -top-6 left-0 w-full flex justify-center">
            <motion.div
              className="px-3 py-1 bg-white shadow-md rounded-full text-sm font-medium flex items-center"
              animate={{
                x: `calc(${value}% - ${value > 50 ? '3rem' : value < 50 ? '1rem' : '2rem'})`,
                backgroundColor: value < 40 ? '#3B82F6' : value > 60 ? '#8B5CF6' : '#FFFFFF',
                color: value < 40 || value > 60 ? '#FFFFFF' : '#1F2937'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <span>{value}%</span>
            </motion.div>
          </div>
          
          <Slider
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setIsDragging(true);
            }}
            onAfterChange={() => {
              setIsDragging(false);
            }}
            railStyle={{ backgroundColor: '#E5E7EB', height: 10 }}
            trackStyle={{ 
              background: `linear-gradient(to right, #3B82F6 ${100 - value}%, #8B5CF6 ${100 - value}%)`,
              height: 10
            }}
            handleStyle={{
              borderColor: value < 40 ? '#3B82F6' : value > 60 ? '#8B5CF6' : '#6366F1',
              backgroundColor: value < 40 ? '#3B82F6' : value > 60 ? '#8B5CF6' : '#6366F1',
              height: 24,
              width: 24,
              marginTop: -7,
              opacity: 1,
              boxShadow: '0 0 0 6px rgba(99, 102, 241, 0.2)'
            }}
            className="mt-8"
          />
          
          {/* Marks/label untuk nilai spesifik */}
          <div className="flex justify-between mt-2 px-2 text-xs text-gray-500">
            <span>100% {options[0].text}</span>
            <span>Seimbang</span>
            <span>100% {options[1].text}</span>
          </div>
        </div>
      </div>
      
      {/* Card hasil */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${value < 50 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                <span className="text-2xl">{dominantOption.icon}</span>
              </div>
              <div>
                <h3 className={`font-bold text-lg ${value < 50 ? 'text-blue-700' : 'text-purple-700'}`}>
                  {dominantOption.text} ({dominancePercentage}%)
                </h3>
                <p className="text-gray-600 mt-1">
                  {value < 50
                    ? `Anda cenderung lebih memilih "${options[0].text}" dibandingkan "${options[1].text}"`
                    : value > 50
                    ? `Anda cenderung lebih memilih "${options[1].text}" dibandingkan "${options[0].text}"`
                    : `Anda menyukai keduanya secara seimbang`
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tombol konfirmasi */}
      <div className="text-center mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onComplete(value)}
          className={`px-8 py-3 rounded-xl font-medium shadow-md transition-all ${
            value < 40 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
              : value > 60 
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Konfirmasi Pilihan</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.button>
      </div>
      
      {/* Informasi tambahan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-500 text-xs mt-4"
      >
        <p>Anda dapat mengubah pilihan kapan saja sebelum mengkonfirmasi</p>
      </motion.div>
    </div>
  );
}