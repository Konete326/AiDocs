import { ChevronLeft, ChevronRight } from 'lucide-react';

const DashboardPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
  itemsPerPage,
  onItemsPerPageChange
}) => {
  if (totalItems === 0 || totalPages <= 1) {
    if (totalItems === 0) return null;
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-[#6B7280]/20">
      <div className="text-xs font-mono font-bold text-[#6B7280]">
        Showing <span className="text-[#3D4852]">{startIndex + 1}</span> to{' '}
        <span className="text-[#3D4852]">{Math.min(endIndex, totalItems)}</span> of{' '}
        <span className="text-[#3D4852]">{totalItems}</span> projects
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="neumorphic-btn rounded-2xl p-2.5 text-[#3D4852] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-2xl text-xs font-bold font-mono transition-all cursor-pointer ${
                currentPage === p
                  ? 'bg-[#6C63FF] text-white shadow-md'
                  : 'neumorphic-btn text-[#3D4852] hover:bg-[#d1d7e0]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="neumorphic-btn rounded-2xl p-2.5 text-[#3D4852] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {onItemsPerPageChange && (
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="ml-2 bg-[#E0E5EC] rounded-2xl px-2 py-1.5 text-xs font-mono font-bold text-[#3D4852] border border-white/60 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none cursor-pointer"
          >
            <option value={8}>8 / page</option>
            <option value={12}>12 / page</option>
            <option value={16}>16 / page</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default DashboardPagination;
