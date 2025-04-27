import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import SortableItem from './SortableItem';

export default function DragDropQuestion({ options, onComplete }) {
  const [items, setItems] = useState(options);
  const [dirty, setDirty] = useState(false);   // true bila urutan berubah

  /* 1️⃣ Sensor khusus desktop + mobile */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },       // mouse
    }),
    useSensor(TouchSensor, {                       // sentuhan
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  /* 2️⃣ Ubah urutan, tapi JANGAN langsung kirim */
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIdx = items.findIndex(i => i.id === active.id);
    const newIdx = items.findIndex(i => i.id === over.id);

    setItems(arrayMove(items, oldIdx, newIdx));
    setDirty(true);
  };

  /* 3️⃣ Kirim jawaban manual */
  const handleSubmit = () => {
    onComplete(items.map(i => i.value));  // kirim ke parent
    setDirty(false);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map(opt => (
              <SortableItem
                key={opt.id}
                id={opt.id}
                option={opt}
                /* sentuhan tidak bentrok dengan scroll */
                style={{ touchAction: 'none' }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* 4️⃣ Tombol submit */}
      <button
        className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg disabled:opacity-40"
        disabled={!dirty}
        onClick={handleSubmit}
      >
        Kirim Jawaban
      </button>
    </>
  );
}
