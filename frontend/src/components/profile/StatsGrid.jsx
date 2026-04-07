import { motion } from 'framer-motion';

const StatsGrid = ({ user }) => {
  const stats = [
    { label: "Projects Created", value: user.projectsCreated, desc: "Total projects in your workspace" },
    { label: "Documents Generated", value: user.docsGenerated, desc: "AI-sculpted documents so far" },
    { label: "Current Plan", value: user.plan, desc: "Active subscription tier" },
  ];

  return (
    <div className="flex flex-col gap-4 mt-8 flex-1">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          className="liquid-glass rounded-2xl p-5 cursor-default"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">{stat.label}</p>
          <p className="text-2xl font-medium text-white mt-1">{stat.value}</p>
          <p className="text-sm text-white/60">{stat.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;
