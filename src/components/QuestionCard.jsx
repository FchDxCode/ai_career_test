import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import DragDropQuestion from './DragDropQuestion';
import SliderQuestion from './SliderQuestion';

export default function QuestionCard({ question, onNext, questionsLength, currentStep }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

        {question.type === 'drag_drop' ? (
          <DragDropQuestion options={question.options} onComplete={onNext} />
        ) : question.type === 'slider' ? (
          <SliderQuestion options={question.options} onComplete={onNext} />
        ) : (
          <div className="grid gap-4">
            {question.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02, backgroundColor: '#f0f9ff' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNext(opt.value)}
                className="p-6 text-left rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{opt.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{opt.text}</h3>
                    {opt.description && (
                      <p className="text-gray-600">{opt.description}</p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl cursor-pointer"
          onClick={() =>
            toast(`💫 ${question.funFact}`, {
              icon: '🎓',
              style: { borderRadius: '10px', background: '#333', color: '#fff' }
            })
          }
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-sm font-medium">Tap untuk fakta menarik!</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
