import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Area, AreaChart,
} from 'recharts';

const fmt = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="neumorphic-card rounded-xl px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-[#3D4852]">{label}</p>
      <p className="text-[#6C63FF] font-bold">{fmt(payload[0].value)} tokens</p>
      {payload[1] && (
        <p className="text-[#f59e0b] font-semibold">{payload[1].value} docs</p>
      )}
    </div>
  );
};

const MonthlyTokenChart = ({ monthlyTokens }) => {
  const hasData = monthlyTokens?.some(d => d.tokens > 0);

  return (
    <div className="neumorphic-inset rounded-2xl p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-[#6B7280] font-semibold">Monthly Token Usage</p>
        {hasData && (
          <span className="text-[9px] text-[#6C63FF] font-bold">Last 6 months</span>
        )}
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={108}>
          <AreaChart data={monthlyTokens} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,99,255,0.08)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fontSize: 9, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="tokens"
              stroke="#6C63FF"
              strokeWidth={2}
              fill="url(#tokenGrad)"
              dot={{ r: 3, fill: '#6C63FF', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#6C63FF' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[108px] flex flex-col items-center justify-center gap-1">
          <p className="text-[11px] text-[#6B7280]">No token data yet</p>
          <p className="text-[9px] text-[#6B7280]/60">Generate docs to see usage</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyTokenChart;
