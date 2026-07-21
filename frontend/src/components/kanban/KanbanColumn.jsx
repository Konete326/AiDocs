import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';
import AddTaskInput from './AddTaskInput';

const KanbanColumn = ({ column, onAddTask, onDeleteTask, onEditTitle }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(column.title);

  return (
    <div className="flex-shrink-0 w-72 sm:w-80 flex flex-col gap-2.5 h-full max-h-full overflow-hidden liquid-glass-strong rounded-3xl p-3 sm:p-3.5 border border-white/10 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-1 flex-shrink-0 pb-1 border-b border-white/5">
        {isEditingTitle ? (
          <div className="liquid-glass rounded-xl px-3 py-1 flex-1 mr-2 border border-white/15">
            <input
              type="text"
              className="bg-transparent text-white outline-none text-xs font-semibold w-full"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              onBlur={() => {
                onEditTitle(column.id, titleValue);
                setIsEditingTitle(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onEditTitle(column.id, titleValue);
                  setIsEditingTitle(false);
                }
              }}
              autoFocus
            />
          </div>
        ) : (
          <h3
            className="text-xs sm:text-sm font-semibold text-white/90 cursor-pointer hover:text-white transition-colors truncate"
            onClick={() => setIsEditingTitle(true)}
            title="Click to rename column"
          >
            {column.title}
          </h3>
        )}

        <div className="liquid-glass rounded-full px-2 py-0.5 text-[10px] font-mono text-white/60 border border-white/5 flex-shrink-0">
          {column.tasks.length}
        </div>
      </div>

      {/* Droppable Task Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pr-1 hover-scrollbar custom-scrollbar transition-colors p-1 rounded-2xl ${
              snapshot.isDraggingOver ? 'bg-white/5' : ''
            }`}
          >
            {column.tasks.map((task, index) => (
              <KanbanCard
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Bottom Add Task Input */}
      <div className="flex-shrink-0 pt-1">
        <AddTaskInput columnId={column.id} onAdd={onAddTask} />
      </div>
    </div>
  );
};

export default KanbanColumn;
