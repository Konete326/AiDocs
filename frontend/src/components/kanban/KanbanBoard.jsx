import { DragDropContext } from '@hello-pangea/dnd';

const KanbanBoard = ({ children, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-6 min-h-[600px]">
        {children}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
