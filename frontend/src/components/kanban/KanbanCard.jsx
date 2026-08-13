import { Draggable } from '@hello-pangea/dnd';
import { X, AlertTriangle } from 'lucide-react';

const KanbanCard = ({ task, index, columnId, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            touchAction: 'pan-y',
            zIndex: snapshot.isDragging ? 99999 : (provided.draggableProps.style?.zIndex || 1)
          }}
          className={`neumorphic-card rounded-2xl px-4 py-3 flex items-start justify-between gap-3 group cursor-grab active:cursor-grabbing transition-all touch-pan-y select-none ${
            snapshot.isDragging ? 'scale-105 shadow-2xl z-[9999] ring-2 ring-[#6C63FF] !opacity-100' : ''
          }`}
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-[#3D4852] font-bold leading-relaxed">
              {task.text || task.title || task.description}
            </p>

            {task.dueDate && (
              <div className="mt-1.5 flex items-center gap-1">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                  new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0))
                    ? 'bg-amber-500/10 text-amber-700 border border-amber-500/30'
                    : 'bg-[#6C63FF]/10 text-[#6C63FF]'
                }`}>
                  {new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0)) && <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />}
                  <span>{new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0)) ? '⚠️ Past Due' : 'Due'}: {task.dueDate}</span>
                </span>
              </div>
            )}
          </div>

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
