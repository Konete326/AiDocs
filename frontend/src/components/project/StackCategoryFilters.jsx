import { LayoutGrid, Layers, Smartphone, Cpu, ShieldCheck, ShoppingBag, Radio } from 'lucide-react';

const getDynamicCategories = (project) => {
  const tech = (project?.wizardAnswers?.techPreferences || '').toLowerCase();
  const type = (project?.projectType || '').toLowerCase();

  const isMobile = type === 'mobile' || tech.includes('flutter') || tech.includes('react-native') || tech.includes('react native') || tech.includes('ios') || tech.includes('android') || tech.includes('swift') || tech.includes('kotlin');
  const isEcommerce = type === 'ecommerce' || type === 'marketplace';
  const isAi = type === 'ai' || tech.includes('python') || tech.includes('fastapi');

  if (isMobile) {
    return [
      { id: 'all', label: 'All Mobile Stacks', icon: LayoutGrid },
      { id: 'cross_platform', label: 'Cross-Platform (Flutter / RN)', icon: Smartphone },
      { id: 'native_mobile', label: 'Native iOS & Android', icon: Radio },
      { id: 'mobile_backend', label: 'Mobile APIs & Backends', icon: Cpu },
    ];
  }

  if (isEcommerce) {
    return [
      { id: 'all', label: 'All E-Commerce Stacks', icon: LayoutGrid },
      { id: 'ecommerce', label: 'Storefronts & SaaS', icon: ShoppingBag },
      { id: 'mobile_commerce', label: 'Mobile Store Apps', icon: Smartphone },
      { id: 'fullstack', label: 'Unified Fullstack', icon: Layers },
    ];
  }

  if (isAi) {
    return [
      { id: 'all', label: 'All AI Stacks', icon: LayoutGrid },
      { id: 'ai_async', label: 'Async & AI Pipelines', icon: Cpu },
      { id: 'fullstack', label: 'Fullstack AI Apps', icon: Layers },
      { id: 'decoupled', label: 'Decoupled Frontends', icon: Radio },
    ];
  }

  return [
    { id: 'all', label: 'All Compatible Blueprints', icon: LayoutGrid },
    { id: 'fullstack', label: 'Unified Fullstack', icon: Layers },
    { id: 'mobile_backend', label: 'Async & APIs', icon: Cpu },
    { id: 'enterprise', label: 'Enterprise & Rapid API', icon: ShieldCheck },
  ];
};

export default function StackCategoryFilters({ activeCategory, onSelectCategory, project }) {
  const categories = getDynamicCategories(project);

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none my-4">
      {categories.map(({ id, label, icon: Icon }) => {
        const isActive = activeCategory === id;
        return (
          <button
            key={id}
            onClick={() => onSelectCategory(id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? 'bg-[#6C63FF] text-white shadow-md'
                : 'neumorphic-btn text-[#3D4852]'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#6C63FF]'}`} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
