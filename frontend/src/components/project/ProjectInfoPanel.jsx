import { Info, Calendar, Database, Target, Users, Zap } from 'lucide-react';
import { SpecialText } from '../ui/SpecialText';

const ProjectInfoPanel = ({ project, subscription, documents }) => {
  const wizardAnswers = project?.wizardAnswers || {};
  
  const stats = [
    { label: 'Platform Type', value: project?.projectType || 'N/A', icon: Zap },
    { label: 'Target Audience', value: wizardAnswers.targetAudience || 'Developer/Business', icon: Target },
    { label: 'Scale Expectation', value: wizardAnswers.scaleExpectation || 'Growth', icon: Users },
    { label: 'Monetization', value: wizardAnswers.monetizationModel || 'SaaS', icon: Database },
    { label: 'Created', value: new Date(project?.createdAt).toLocaleDateString(), icon: Calendar },
    { label: 'Docs Ready', value: `${documents?.length || 0} / 9`, icon: Info },
  ];

  return (
    <div className="lg:col-span-8 liquid-glass rounded-3xl p-8 flex flex-col lg:flex-row lg:items-center gap-8 group relative overflow-hidden">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/[0.01] blur-3xl pointer-events-none" />
      
      <div className="lg:w-1/3 z-10">
        <div className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50 w-fit mb-3">Project Blueprint</div>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-4xl font-semibold text-white tracking-tight">Technical Data</span>
        </div>
        <div className="text-sm text-white/60 font-light leading-relaxed mb-6">
          <SpecialText speed={10} delay={0.2} inView={false} className="text-white/60">
            Aggregated insights based on your wizard input. Use these parameters to guide your final project implementation.
          </SpecialText>
        </div>
        <div className="flex gap-4">
          <div className="liquid-glass rounded-2xl px-4 py-3 border border-white/5">
               <p className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Status</p>
               <p className="text-white font-medium capitalize">{project?.status}</p>
          </div>
          <div className="liquid-glass rounded-2xl px-4 py-3 border border-white/5">
               <p className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Plan</p>
               <p className="text-white font-medium capitalize font-premium-gradient">{subscription?.plan || 'Free'}</p>
          </div>
        </div>
      </div>

      <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 z-10">
        {stats.map((stat, i) => (
          <div key={i} className="liquid-glass rounded-2xl p-4 border border-white/5 hover:bg-white/[0.02] transition-all group/item">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:bg-white/10 transition-colors">
                 <stat.icon className="w-4 h-4 text-white/40" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/30">{stat.label}</span>
            </div>
            <p className="text-sm text-white/80 font-medium truncate">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectInfoPanel;
