import { useState } from 'react';
import { Plus, Calendar, AlertTriangle } from 'lucide-react';

const AddTaskInput = ({ columnId, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const isPastDue = dueDate && new Date(dueDate) < new Date(new Date().setHours(0,0,0,0));

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(columnId, text.trim(), dueDate || null);
    setText('');
    setDueDate('');
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
        placeholder="Task / Milestone description..."
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

      <div className="flex items-center gap-2 flex-wrap pt-1">
        <div className="flex items-center gap-1 bg-[#E0E5EC] neumorphic-inset rounded-xl px-2.5 py-1 text-xs">
          <Calendar className="w-3.5 h-3.5 text-[#6C63FF]" />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-transparent text-[11px] font-bold text-[#3D4852] outline-none cursor-pointer"
          />
        </div>

        {isPastDue && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 text-[10px] font-bold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Past Due Date Warning</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end mt-1">
        <button
          onClick={() => {
            setIsOpen(false);
            setText('');
            setDueDate('');
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
