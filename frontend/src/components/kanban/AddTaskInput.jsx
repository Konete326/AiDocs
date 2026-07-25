import { useState } from 'react';
import { Plus } from 'lucide-react';

const AddTaskInput = ({ columnId, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(columnId, text.trim());
    setText('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="neumorphic-btn rounded-2xl px-4 py-2.5 w-full flex items-center justify-center gap-2 text-xs text-[#3D4852] font-bold cursor-pointer transition-all"
      >
        <Plus className="w-3.5 h-3.5 text-[#6C63FF]" />
        <span>Add task</span>
      </button>
    );
  }

  return (
    <div className="neumorphic-card rounded-2xl p-3 flex flex-col gap-2">
      <textarea
        className="bg-[#E0E5EC] text-[#3D4852] placeholder:text-[#6B7280] outline-none text-xs font-bold p-2.5 rounded-xl resize-none w-full neumorphic-inset"
        rows={2}
        placeholder="Task description..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        autoFocus
      />
      <div className="flex gap-2 justify-end mt-1">
        <button
          onClick={() => {
            setIsOpen(false);
            setText('');
          }}
          className="neumorphic-btn rounded-xl px-3 py-1.5 text-xs text-[#6B7280] font-bold cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="bg-[#6C63FF] text-white rounded-xl px-3 py-1.5 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTaskInput;
