import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SliderQuestion({ options, onComplete }) {
  const [value, setValue] = React.useState(50);

  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-600 mb-8">
        {options.map((opt, idx) => (
          <div key={idx} className="text-center">
            <span className="text-3xl block mb-2">{opt.icon}</span>
            <span>{opt.text}</span>
          </div>
        ))}
      </div>
      <Slider
        value={value}
        onChange={setValue}
        railStyle={{ backgroundColor: '#E5E7EB' }}
        trackStyle={{ backgroundColor: '#3B82F6' }}
        handleStyle={{
          borderColor: '#3B82F6',
          backgroundColor: '#3B82F6',
          opacity: 1,
          boxShadow: '0 0 0 5px rgba(59, 130, 246, 0.1)'
        }}
      />
      <div className="text-center mt-8">
        <button
          onClick={() => onComplete(value)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Konfirmasi Pilihan
        </button>
      </div>
    </div>
  );
}
