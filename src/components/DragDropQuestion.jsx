import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DragDropQuestion({ options, onComplete }) {
  const [items, setItems] = useState(options);
  const [dirty, setDirty] = useState(false);

  const reorder = (list, start, end) => {
    const result = Array.from(list);
    const [moved] = result.splice(start, 1);
    result.splice(end, 0, moved);
    return result;
  };

  const handleDragEnd = (res) => {
    const { destination, source } = res;
    if (!destination || destination.index === source.index) return;

    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);
    setDirty(true);
  };

  const handleSubmit = () => {
    onComplete(items.map(i => i.value));
    setDirty(false);
  };

  return (
    <div className='relative'>
    {/* Instruksi dengan efek highlight */}
    <motion.div 
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-blue-800 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <h3 className="font-semibold">Instruksi</h3>
        </div>
        <p className="text-sm text-blue-700">
          Urutkan pilihan berikut berdasarkan preferensi Anda dengan cara <strong>drag and drop</strong> (tarik dan lepas). 
          Pilihan paling atas adalah yang paling Anda prioritaskan.
        </p>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full -z-10 blur-xl opacity-60"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-full -z-10 blur-xl opacity-60"></div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {items.map((opt, idx) => (
                <Draggable key={opt.id} draggableId={opt.id} index={idx}>
                  {(prov, snap) => (
                    <div
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      className={`bg-white p-4 rounded-lg shadow-sm border-2
                        ${snap.isDragging ? 'border-blue-500' : 'border-gray-200'}
                        transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">⋮⋮</span>
                        <span className="text-2xl">{opt.icon}</span>
                        <div>
                          <h3 className="font-medium">{opt.text}</h3>
                          <p className="text-sm text-gray-600">{opt.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder /* keeps height during drag */}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg disabled:opacity-40"
        onClick={handleSubmit}
        disabled={!dirty}
      >
        Kirim Jawaban
      </button>
    </div>
  );
}
