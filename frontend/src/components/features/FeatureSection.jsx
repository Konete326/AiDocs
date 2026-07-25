import { Rocket, Shield, Globe } from 'lucide-react';

const FeatureSection = () => {
  const sections = [
    { icon: <Rocket className="w-6 h-6" />, title: 'Generation Engine', desc: 'Proprietary AI optimized for high-conversion documents. 9 standard docs in seconds.' },
    { icon: <Shield className="w-6 h-6" />, title: 'Privacy First', desc: 'Your data is never used to train global models. Secure, encrypted, and private workspaces.' },
    { icon: <Globe className="w-6 h-6" />, title: 'Global Exports', desc: 'Export to Markdown, PDF, Word, or HTML. Ready for GitHub, Notion, or your VC pitch.' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-4">
      {sections.map((s, i) => (
        <div key={i} className="liquid-glass rounded-3xl p-8 hover:scale-105 transition-transform group">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center text-white/40 mb-6 group-hover:text-white transition-colors">
            {s.icon}
          </div>
          <h3 className="text-xl font-medium text-white mb-3 tracking-tight">{s.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed font-light">{s.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
