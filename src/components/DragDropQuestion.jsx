import { DndContext, closestCenter } from '@dnd-kit/core';
import React from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';  

export default function DragDropQuestion({ options, onComplete }) {
  const [items, setItems] = React.useState(options);

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setItems((old) => {
        const oldIdx = old.findIndex(i => i.id === active.id);
        const newIdx = old.findIndex(i => i.id === over.id);
        const newItems = arrayMove(old, oldIdx, newIdx);
        onComplete(newItems.map(i => i.value));
        return newItems;
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map(opt => (
            <SortableItem key={opt.id} id={opt.id} option={opt} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
