import { Search, X, Archive, FolderKanban, Filter } from 'lucide-react';

const DashboardFilterBar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  viewTab,
  setViewTab,
  activeCount,
  archivedCount
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 bg-[#E0E5EC] p-4 rounded-[28px] border border-white/60 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setViewTab('active')}
          className={`rounded-2xl px-4 py-2 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            viewTab === 'active'
              ? 'bg-[#6C63FF] text-white shadow-md'
              : 'neumorphic-btn text-[#3D4852] hover:bg-[#d1d7e0]'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Active Projects</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
            viewTab === 'active' ? 'bg-white/20 text-white' : 'bg-[#6C63FF]/10 text-[#6C63FF]'
          }`}>
            {activeCount}
          </span>
        </button>

        <button
          onClick={() => setViewTab('archived')}
          className={`rounded-2xl px-4 py-2 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            viewTab === 'archived'
              ? 'bg-rose-600 text-white shadow-md'
              : 'neumorphic-btn text-[#3D4852] hover:bg-[#d1d7e0]'
          }`}
        >
          <Archive className="w-4 h-4" />
          <span>Archive / Hidden</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
            viewTab === 'archived' ? 'bg-white/20 text-white' : 'bg-rose-600/10 text-rose-600'
          }`}>
            {archivedCount}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap flex-1 md:flex-initial md:justify-end">
        <div className="relative min-w-[200px] flex-1 md:flex-initial">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[#E0E5EC] rounded-2xl pl-10 pr-8 py-2 text-xs font-bold text-[#3D4852] placeholder-[#6B7280] border border-white/60 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#3D4852]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="relative flex items-center gap-1.5 min-w-[140px]">
          <Filter className="w-3.5 h-3.5 text-[#6C63FF]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#E0E5EC] rounded-2xl px-3 py-2 text-xs font-bold text-[#3D4852] border border-white/60 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="generating">Generating</option>
            <option value="complete">Complete</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilterBar;
