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
        className="liquid-glass rounded-full px-4 py-2 w-full flex items-center gap-2 text-xs text-white/40 hover:text-white/60 transition-colors"
      >
        <Plus className="w-3 h-3" />
        <span>Add task</span>
      </button>
    );
  }

  return (
    <div className="liquid-glass rounded-2xl p-3 flex flex-col gap-2">
      <textarea
        className="bg-transparent text-white placeholder:text-white/30 outline-none text-sm resize-none w-full"
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
      <div className="flex gap-2 justify-end mt-2">
        <button
          onClick={() => {
            setIsOpen(false);
            setText('');
          }}
          className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/50 hover:text-white/70 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="liquid-glass-strong rounded-full px-3 py-1.5 text-xs text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTaskInput;
