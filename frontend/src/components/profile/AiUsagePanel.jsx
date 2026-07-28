import { Cpu, MessageSquare, Zap, Clock } from 'lucide-react';

const fmt = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
};

const fmtMs = (ms) => {
  if (!ms) return '—';
  if (ms >= 60_000) return (ms / 60_000).toFixed(1) + 'm';
  return (ms / 1000).toFixed(1) + 's';
};

const Stat = ({ icon: Icon, label, value, accent }) => (
  <div className="neumorphic-inset rounded-2xl p-3 flex flex-col gap-1">
    <div className="flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" style={{ color: accent || '#6C63FF' }} />
      <span className="text-[9px] uppercase tracking-widest text-[#6B7280] font-semibold">{label}</span>
    </div>
    <p className="text-lg font-bold text-[#3D4852] leading-none">{value}</p>
  </div>
);

const AiUsagePanel = ({ stats }) => {
  const { totalTokens = 0, totalAiMessages = 0, modelBreakdown = {}, avgGenMs = 0, totalDocs = 0 } = stats || {};

  const topModel = Object.entries(modelBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
  const shortModel = topModel.length > 18 ? topModel.slice(0, 18) + '…' : topModel;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] uppercase tracking-widest text-[#6B7280] font-semibold">AI Usage Overview</p>

      <div className="grid grid-cols-2 gap-2">
        <Stat icon={Cpu} label="Tokens Used" value={fmt(totalTokens)} />
        <Stat icon={MessageSquare} label="AI Replies" value={totalAiMessages} accent="#10b981" />
        <Stat icon={Zap} label="Docs Generated" value={totalDocs} accent="#f59e0b" />
        <Stat icon={Clock} label="Avg Gen Time" value={fmtMs(avgGenMs)} accent="#ec4899" />
      </div>

      {topModel !== '—' && (
        <div className="neumorphic-inset rounded-2xl px-3 py-2 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-widest text-[#6B7280]">Top Model</span>
          <span className="text-[10px] font-bold text-[#6C63FF] truncate max-w-[140px]">{shortModel}</span>
        </div>
      )}
    </div>
  );
};

export default AiUsagePanel;
