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
          className={`liquid-glass rounded-2xl px-4 py-3 flex items-start justify-between gap-3 group cursor-grab active:cursor-grabbing transition-all ${
            snapshot.isDragging ? 'liquid-glass-strong scale-105 shadow-2xl z-50' : ''
          }`}
        >
          <p className="text-sm text-white/80 flex-1 leading-relaxed">
            {task.text}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(columnId, task.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 flex-shrink-0 mt-0.5 cursor-pointer"
          >
            <X className="w-3 h-3 text-white/60" />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
