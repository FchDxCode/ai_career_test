import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';

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
    <>
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
    </>
  );
}
