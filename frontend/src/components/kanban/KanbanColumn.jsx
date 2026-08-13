import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Inbox } from 'lucide-react';
import KanbanCard from './KanbanCard';
import AddTaskInput from './AddTaskInput';

const KanbanColumn = ({ column, onAddTask, onDeleteTask, onEditTitle }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(column.title);

  return (
    <div className="w-full flex flex-col gap-2.5 h-[380px] max-h-[400px] overflow-hidden neumorphic-card rounded-3xl p-3.5 transition-all touch-pan-y">
      <div className="flex items-center justify-between px-1 flex-shrink-0 pb-1.5 border-b border-black/5">
        {isEditingTitle ? (
          <div className="neumorphic-inset rounded-xl px-3 py-1 flex-1 mr-2">
            <input
              type="text"
              className="bg-transparent text-[#3D4852] outline-none text-xs font-bold w-full"
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
            className="text-xs sm:text-sm font-bold text-[#3D4852] cursor-pointer hover:text-[#6C63FF] transition-colors truncate"
            onClick={() => setIsEditingTitle(true)}
            title="Click to rename column"
          >
            {column.title}
          </h3>
        )}

        <div className="neumorphic-inset rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#6C63FF] flex-shrink-0">
          {column.tasks.length}
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pr-1 pb-4 scroll-smooth custom-scrollbar transition-all p-1 rounded-2xl ${
              snapshot.isDraggingOver ? 'neumorphic-inset ring-2 ring-[#6C63FF]' : ''
            }`}
          >
            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center my-auto pointer-events-none select-none opacity-60">
                <div className="w-10 h-10 rounded-2xl neumorphic-inset flex items-center justify-center mb-2 text-[#6C63FF]">
                  <Inbox className="w-5 h-5 text-[#6C63FF]/70" />
                </div>
                <span className="text-[11px] font-bold text-[#3D4852]">Empty Column</span>
                <span className="text-[9.5px] text-[#6B7280] mt-0.5">Drop or add cards here</span>
              </div>
            )}

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

      <div className="flex-shrink-0 pt-1">
        <AddTaskInput columnId={column.id} onAdd={onAddTask} />
      </div>
    </div>
  );
};

export default KanbanColumn;
