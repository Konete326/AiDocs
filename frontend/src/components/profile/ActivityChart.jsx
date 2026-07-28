import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="neumorphic-card rounded-xl px-3 py-2 text-xs">
      <p className="font-semibold text-[#3D4852] truncate max-w-[120px]">{label}</p>
      <p className="text-[#6C63FF] font-bold">{payload[0].value} docs</p>
    </div>
  );
};

const ActivityChart = ({ chartData }) => {
  const hasData = chartData?.length > 0 && chartData.some(d => d.docs > 0);

  return (
    <div className="neumorphic-inset rounded-2xl p-4 flex flex-col gap-2">
      <p className="text-[10px] uppercase tracking-widest text-[#6B7280] font-semibold">Docs Per Project</p>
      {hasData ? (
        <ResponsiveContainer width="100%" height={110}>
          <BarChart data={chartData} barSize={18} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 9, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(108,99,255,0.06)' }} />
            <Bar dataKey="docs" radius={[6, 6, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell
                  key={i}
                  fill={i === chartData.length - 1 ? '#6C63FF' : 'rgba(108,99,255,0.35)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[110px] flex items-center justify-center text-[11px] text-[#6B7280]">
          No project data yet
        </div>
      )}
    </div>
  );
};

export default ActivityChart;
