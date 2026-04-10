import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';
import AddTaskInput from './AddTaskInput';

const KanbanColumn = ({ column, onAddTask, onDeleteTask, onEditTitle }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(column.title);

  return (
    <div className="flex-shrink-0 w-72 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        {isEditingTitle ? (
          <div className="liquid-glass rounded-xl px-3 py-1.5 flex-1 mr-2">
            <input
              type="text"
              className="bg-transparent text-white outline-none text-sm font-medium w-full"
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
            className="text-sm font-medium text-white/80 cursor-pointer hover:text-white transition-colors"
            onClick={() => setIsEditingTitle(true)}
          >
            {column.title}
          </h3>
        )}

        <div className="liquid-glass rounded-full px-2 py-0.5 text-xs text-white/40">
          {column.tasks.length}
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 min-h-[200px] rounded-2xl p-2 transition-colors ${
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

      {/* Bottom Add Task */}
      <AddTaskInput columnId={column.id} onAdd={onAddTask} />
    </div>
  );
};

export default KanbanColumn;
