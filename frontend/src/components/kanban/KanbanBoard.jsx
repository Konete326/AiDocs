import { DragDropContext } from '@hello-pangea/dnd';

const KanbanBoard = ({ children, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 w-full h-full min-h-0 overflow-y-auto pr-1.5 pb-20 scroll-smooth hover-scrollbar custom-scrollbar">
        {children}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
