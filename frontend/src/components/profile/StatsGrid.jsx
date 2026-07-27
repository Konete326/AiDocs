const StatsGrid = ({ projectsCount, totalDocs, plan }) => {
  const stats = [
    { label: 'Projects', value: projectsCount },
    { label: 'Documents', value: totalDocs },
    { label: 'Plan', value: plan.charAt(0).toUpperCase() + plan.slice(1) },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {stats.map((stat, i) => (
        <div key={i} className="neumorphic-inset rounded-2xl p-3 cursor-default">
          <p className="text-[10px] uppercase tracking-widest text-[#6B7280]">{stat.label}</p>
          <p className="text-xl font-bold text-[#3D4852] mt-0.5">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

