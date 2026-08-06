import { Sparkles, Layers, ToggleRight } from 'lucide-react';

const presets = [
  {
    name: 'Glow Button',
    category: 'Buttons',
    icon: Sparkles,
    html: '<button class="glow-btn">Hover Glow</button>',
    css: `.glow-btn { padding: 12px 28px; background: #2563eb; color: #fff; border: none; border-radius: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px rgba(37,99,235,0.6); transition: all 0.3s ease; } .glow-btn:hover { box-shadow: 0 0 25px rgba(37,99,235,0.9); transform: translateY(-2px); }`,
    aiPrompt: 'Create a vibrant glowing button with animated neon box-shadow on hover.'
  },
  {
    name: 'Glass Card',
    category: 'Cards',
    icon: Layers,
    html: '<div class="glass-card"><h3>Glassmorphism</h3><p>Modern soft blur container card.</p></div>',
    css: `.glass-card { padding: 24px; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.6); color: #3d4852; font-family: sans-serif; box-shadow: 0 8px 32px rgba(0,0,0,0.05); }`,
    aiPrompt: 'Create a glassmorphism card component with subtle border and backdrop blur.'
  },
  {
    name: 'Neumorphic Switch',
    category: 'Toggle switches',
    icon: ToggleRight,
    html: '<label class="neo-switch"><input type="checkbox"><span class="slider"></span></label>',
    css: `.neo-switch { position: relative; display: inline-block; width: 60px; height: 34px; } .neo-switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e0e5ec; border-radius: 34px; box-shadow: inset 3px 3px 6px rgba(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5); transition: .4s; } .slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: #2563eb; border-radius: 50%; transition: .4s; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); } input:checked + .slider:before { transform: translateX(26px); }`,
    aiPrompt: 'Create a dual physics inset shadow Neumorphic toggle switch element.'
  }
];

const PresetStarters = ({ onSelectPreset }) => {
  return (
    <div className="mb-4">
      <label className="text-[11px] font-bold text-[#3D4852] block mb-1.5 uppercase">Quick Template Presets</label>
      <div className="grid grid-cols-3 gap-2">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className="p-2 bg-[#E0E5EC] rounded-xl text-xs font-bold text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] hover:shadow-[4px_4px_8px_rgba(163,177,198,0.7),-4px_-4px_8px_rgba(255,255,255,0.6)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/30"
            >
              <Icon className="w-3.5 h-3.5 text-blue-600" />
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PresetStarters;
