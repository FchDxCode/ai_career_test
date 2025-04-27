import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({ id, option }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-sm border-2 border-gray-200 cursor-move hover:border-blue-500 transition-all"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">⋮⋮</span>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{option.icon}</span>
          <div>
            <h3 className="font-medium">{option.text}</h3>
            <p className="text-sm text-gray-600">{option.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
