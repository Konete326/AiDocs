import { DragDropContext } from '@hello-pangea/dnd';

const KanbanBoard = ({ children, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-2 h-full min-h-0 w-full hover-scrollbar custom-scrollbar">
        {children}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
