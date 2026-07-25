import { Draggable } from '@hello-pangea/dnd';
import { X } from 'lucide-react';

const KanbanCard = ({ task, index, columnId, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`neumorphic-card rounded-2xl px-4 py-3 flex items-start justify-between gap-3 group cursor-grab active:cursor-grabbing transition-all ${
            snapshot.isDragging ? 'scale-105 shadow-2xl z-50 ring-2 ring-[#6C63FF]' : ''
          }`}
        >
          <p className="text-xs sm:text-sm text-[#3D4852] font-bold flex-1 leading-relaxed">
            {task.text || task.title || task.description}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(columnId, task.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-rose-600 flex-shrink-0 mt-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
