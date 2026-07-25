import { Check, X } from 'lucide-react';

const FeatureComparisonTable = () => {
  const categories = [
    { name: 'Generation', features: [
      { name: 'AI Projects', free: '3', pro: '10', team: 'Unlimited' },
      { name: 'Docs per Project', free: '9 (Full)', pro: '9 (Full)', team: '9 (Full)' },
      { name: 'AI Regeneration', free: 'Basic', pro: 'Unlimited', team: 'Priority' }
    ]},
    { name: 'Collaboration', features: [
      { name: 'Co-Founder Chat', free: false, pro: 'Premium', team: 'Enterprise' },
      { name: 'Team Access', free: false, pro: false, team: true },
      { name: 'Shared Workspace', free: false, pro: false, team: true }
    ]},
    { name: 'Exports', features: [
      { name: 'Markdown Copy', free: true, pro: true, team: true },
      { name: 'Instant ZIP', free: false, pro: true, team: true },
      { name: 'PDF/Word/EPUB', free: false, pro: true, team: true }
    ]}
  ];

  return (
    <div className="overflow-x-auto liquid-glass rounded-3xl p-4 md:p-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 uppercase tracking-widest text-[10px] text-white/40">
            <th className="py-4 font-medium min-w-[150px]">Feature</th>
            <th className="py-4 font-medium text-center">Free</th>
            <th className="py-4 font-medium text-center text-white/80">Pro</th>
            <th className="py-4 font-medium text-center">Team</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, ci) => (
            <React.Fragment key={ci}>
              <tr className="bg-white/5"><td colSpan={4} className="py-3 px-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">{cat.name}</td></tr>
              {cat.features.map((f, fi) => (
                <tr key={fi} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-4 text-sm text-white/70">{f.name}</td>
                  <td className="py-5 text-center">{renderVal(f.free)}</td>
                  <td className="py-5 text-center">{renderVal(f.pro)}</td>
                  <td className="py-5 text-center">{renderVal(f.team)}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const renderVal = (v) => {
  if (v === true) return <Check className="w-4 h-4 text-white mx-auto opacity-70" />;
  if (v === false) return <X className="w-4 h-4 text-white mx-auto opacity-20" />;
  return <span className="text-xs font-medium text-white/60">{v}</span>;
};

import React from 'react';
export default FeatureComparisonTable;
