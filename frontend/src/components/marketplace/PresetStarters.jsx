import { Sparkles, Layers, ToggleRight, CheckSquare, Loader, FormInput, Radio, Grid, MessageSquare, Box, Palette } from 'lucide-react';

const presetsByCategory = {
  Buttons: [
    {
      name: 'Glow Button',
      category: 'Buttons',
      icon: Sparkles,
      html: '<button class="glow-btn">Hover Glow</button>',
      css: `.glow-btn { padding: 12px 28px; background: #2563eb; color: #fff; border: none; border-radius: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px rgba(37,99,235,0.6); transition: all 0.3s ease; } .glow-btn:hover { box-shadow: 0 0 25px rgba(37,99,235,0.9); transform: translateY(-2px); }`,
      aiPrompt: 'Create a vibrant glowing button with animated neon box-shadow on hover.'
    },
    {
      name: 'Neumorphic Button',
      category: 'Buttons',
      icon: Layers,
      html: '<button class="neo-btn">Soft UI Button</button>',
      css: `.neo-btn { padding: 12px 28px; background: #E0E5EC; color: #3D4852; border: none; border-radius: 16px; font-weight: bold; cursor: pointer; box-shadow: 6px 6px 12px rgba(163,177,198,0.6), -6px -6px 12px rgba(255,255,255,0.5); transition: all 0.2s ease; } .neo-btn:active { box-shadow: inset 4px 4px 8px rgba(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.5); }`,
      aiPrompt: 'Create a dual physics Neumorphic soft UI button with inset active pressed effect.'
    },
    {
      name: 'Gradient Pulse',
      category: 'Buttons',
      icon: Sparkles,
      html: '<button class="grad-btn">Gradient Pulse</button>',
      css: `.grad-btn { padding: 12px 28px; background: linear-gradient(135deg, #6C63FF, #2563EB); color: #fff; border: none; border-radius: 14px; font-weight: bold; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; } .grad-btn:hover { transform: scale(1.04); box-shadow: 0 8px 20px rgba(108,99,255,0.4); }`,
      aiPrompt: 'Create a gradient button with scale transition and dynamic shadow hover effect.'
    }
  ],
  Checkboxes: [
    {
      name: 'Neumorphic Check',
      category: 'Checkboxes',
      icon: CheckSquare,
      html: '<label class="neo-check"><input type="checkbox" checked><span class="checkmark"></span><span class="label">Enable Feature</span></label>',
      css: `.neo-check { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; font-family: sans-serif; font-size: 14px; font-weight: bold; color: #3D4852; } .neo-check input { display: none; } .checkmark { width: 24px; height: 24px; background: #E0E5EC; border-radius: 8px; box-shadow: inset 3px 3px 6px rgba(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: center; position: relative; } input:checked + .checkmark::after { content: "✓"; color: #2563EB; font-weight: bold; font-size: 14px; }`,
      aiPrompt: 'Create a Neumorphic custom inset checkbox with blue checkmark indicator.'
    },
    {
      name: 'Pill Checkbox',
      category: 'Checkboxes',
      icon: CheckSquare,
      html: '<label class="pill-check"><input type="checkbox"><span>Option Selected</span></label>',
      css: `.pill-check { display: inline-block; cursor: pointer; } .pill-check input { display: none; } .pill-check span { padding: 8px 18px; background: #E0E5EC; color: #6B7280; border-radius: 20px; font-weight: bold; font-size: 13px; box-shadow: 3px 3px 6px rgba(163,177,198,0.6), -3px -3px 6px rgba(255,255,255,0.5); transition: all 0.2s; } input:checked + span { background: #2563EB; color: #fff; box-shadow: 0 4px 12px rgba(37,99,235,0.4); }`,
      aiPrompt: 'Create an active pill badge checkbox toggle button.'
    }
  ],
  'Toggle switches': [
    {
      name: 'Neumorphic Switch',
      category: 'Toggle switches',
      icon: ToggleRight,
      html: '<label class="neo-switch"><input type="checkbox" checked><span class="slider"></span></label>',
      css: `.neo-switch { position: relative; display: inline-block; width: 60px; height: 34px; } .neo-switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e0e5ec; border-radius: 34px; box-shadow: inset 3px 3px 6px rgba(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5); transition: .4s; } .slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: #2563eb; border-radius: 50%; transition: .4s; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); } input:checked + .slider:before { transform: translateX(26px); }`,
      aiPrompt: 'Create a dual physics inset shadow Neumorphic toggle switch element.'
    },
    {
      name: 'iOS Style Toggle',
      category: 'Toggle switches',
      icon: ToggleRight,
      html: '<label class="ios-switch"><input type="checkbox"><span class="ios-slider"></span></label>',
      css: `.ios-switch { position: relative; width: 52px; height: 30px; display: inline-block; } .ios-switch input { opacity: 0; width: 0; height: 0; } .ios-slider { position: absolute; cursor: pointer; inset: 0; background: #cbd5e1; border-radius: 30px; transition: 0.3s; } .ios-slider::before { content: ""; position: absolute; height: 24px; width: 24px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.3s; box-shadow: 0 2px 5px rgba(0,0,0,0.2); } input:checked + .ios-slider { background: #10b981; } input:checked + .ios-slider::before { transform: translateX(22px); }`,
      aiPrompt: 'Create an iOS style smooth green toggle slider switch.'
    }
  ],
  Cards: [
    {
      name: 'Glass Card',
      category: 'Cards',
      icon: Layers,
      html: '<div class="glass-card"><h3>Glassmorphism</h3><p>Modern soft blur container card with subtle borders.</p></div>',
      css: `.glass-card { padding: 24px; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.6); color: #3d4852; font-family: sans-serif; box-shadow: 0 8px 32px rgba(0,0,0,0.05); } .glass-card h3 { margin: 0 0 8px; color: #2563eb; } .glass-card p { margin: 0; font-size: 13px; color: #6b7280; }`,
      aiPrompt: 'Create a glassmorphism card component with subtle border and backdrop blur.'
    },
    {
      name: 'Neumorphic Raised Card',
      category: 'Cards',
      icon: Layers,
      html: '<div class="neo-card"><h4>Neumorphic Container</h4><p>Cool clay surface with dual extruded shadows.</p></div>',
      css: `.neo-card { padding: 24px; background: #E0E5EC; border-radius: 24px; color: #3D4852; font-family: sans-serif; box-shadow: 9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5); } .neo-card h4 { margin: 0 0 6px; font-size: 16px; color: #3D4852; } .neo-card p { margin: 0; font-size: 12px; color: #6B7280; }`,
      aiPrompt: 'Create a Neumorphic raised card with soft clay background and dual physics shadows.'
    }
  ],
  Loaders: [
    {
      name: 'Pulse Ring Loader',
      category: 'Loaders',
      icon: Loader,
      html: '<div class="spinner-ring"></div>',
      css: `.spinner-ring { width: 44px; height: 44px; border: 4px solid rgba(37,99,235,0.2); border-top-color: #2563eb; border-radius: 50%; animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`,
      aiPrompt: 'Create a smooth CSS keyframe ring spinner loading indicator.'
    },
    {
      name: 'Pulse Dots Loader',
      category: 'Loaders',
      icon: Loader,
      html: '<div class="pulse-dots"><span></span><span></span><span></span></div>',
      css: `.pulse-dots { display: flex; gap: 8px; } .pulse-dots span { width: 12px; height: 12px; background: #2563eb; border-radius: 50%; animation: pulse 1.2s infinite ease-in-out; } .pulse-dots span:nth-child(2) { animation-delay: 0.2s; } .pulse-dots span:nth-child(3) { animation-delay: 0.4s; } @keyframes pulse { 0%, 100% { transform: scale(0.6); opacity: 0.4; } 50% { transform: scale(1.2); opacity: 1; } }`,
      aiPrompt: 'Create a 3-dot pulsing wave loading indicator.'
    }
  ],
  Inputs: [
    {
      name: 'Neumorphic Inset Input',
      category: 'Inputs',
      icon: FormInput,
      html: '<div class="input-box"><input type="text" placeholder="Enter username..."><span class="focus-border"></span></div>',
      css: `.input-box { position: relative; width: 100%; max-width: 280px; } .input-box input { width: 100%; padding: 12px 16px; background: #E0E5EC; border: none; border-radius: 14px; font-family: sans-serif; font-size: 13px; color: #3D4852; box-shadow: inset 4px 4px 8px rgba(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.5); outline: none; }`,
      aiPrompt: 'Create a Neumorphic inset text input with soft inner shadow.'
    },
    {
      name: 'Floating Label Field',
      category: 'Inputs',
      icon: FormInput,
      html: '<div class="float-group"><input type="text" id="email" required><label for="email">Email Address</label></div>',
      css: `.float-group { position: relative; margin-top: 10px; font-family: sans-serif; } .float-group input { padding: 12px 16px; background: #E0E5EC; border: 1px solid #cbd5e1; border-radius: 12px; font-size: 13px; outline: none; } .float-group label { position: absolute; left: 14px; top: 12px; color: #6b7280; font-size: 13px; transition: 0.2s ease; pointer-events: none; } .float-group input:focus ~ label, .float-group input:valid ~ label { top: -8px; left: 10px; font-size: 10px; background: #2563eb; color: white; padding: 2px 6px; border-radius: 4px; }`,
      aiPrompt: 'Create a material style floating label text field.'
    }
  ],
  'Radio buttons': [
    {
      name: 'Neumorphic Radio',
      category: 'Radio buttons',
      icon: Radio,
      html: '<div class="radio-group"><label><input type="radio" name="opt" checked><span>Option A</span></label><label><input type="radio" name="opt"><span>Option B</span></label></div>',
      css: `.radio-group { display: flex; gap: 12px; font-family: sans-serif; } .radio-group label { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: bold; color: #3D4852; cursor: pointer; } .radio-group input { accent-color: #2563EB; width: 16px; height: 16px; }`,
      aiPrompt: 'Create a clean custom radio button selection group.'
    }
  ],
  Forms: [
    {
      name: 'Login Card Form',
      category: 'Forms',
      icon: FormInput,
      html: '<form class="mini-form"><h4>Sign In</h4><input type="email" placeholder="Email"><input type="password" placeholder="Password"><button type="submit">Login</button></form>',
      css: `.mini-form { background: #E0E5EC; padding: 20px; border-radius: 20px; box-shadow: 8px 8px 16px rgba(163,177,198,0.6), -8px -8px 16px rgba(255,255,255,0.5); display: flex; flex-direction: column; gap: 12px; width: 260px; font-family: sans-serif; } .mini-form h4 { margin: 0; font-size: 16px; color: #3D4852; } .mini-form input { padding: 10px 14px; background: #E0E5EC; border: none; border-radius: 12px; font-size: 12px; box-shadow: inset 3px 3px 6px rgba(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5); outline: none; } .mini-form button { padding: 10px; background: #2563EB; color: white; border: none; border-radius: 12px; font-weight: bold; cursor: pointer; }`,
      aiPrompt: 'Create a compact Neumorphic login card form.'
    }
  ],
  Patterns: [
    {
      name: 'Dot Grid Background',
      category: 'Patterns',
      icon: Grid,
      html: '<div class="dot-pattern"><p>Dot Grid Pattern</p></div>',
      css: `.dot-pattern { width: 100%; height: 180px; background-color: #E0E5EC; background-image: radial-gradient(#2563eb 1px, transparent 1px); background-size: 16px 16px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-family: sans-serif; font-weight: bold; color: #3D4852; }`,
      aiPrompt: 'Create a clean radial gradient dot background pattern container.'
    }
  ],
  Tooltips: [
    {
      name: 'Neumorphic Tooltip',
      category: 'Tooltips',
      icon: MessageSquare,
      html: '<div class="tooltip-container"><button class="trigger">Hover Me</button><div class="tooltip-box">Neumorphic Info Tooltip</div></div>',
      css: `.tooltip-container { position: relative; display: inline-block; font-family: sans-serif; } .trigger { padding: 10px 20px; background: #E0E5EC; border: none; border-radius: 12px; font-weight: bold; color: #3D4852; box-shadow: 4px 4px 8px rgba(163,177,198,0.6), -4px -4px 8px rgba(255,255,255,0.5); cursor: pointer; } .tooltip-box { visibility: hidden; position: absolute; bottom: 125%; left: 50%; transform: translateX(-50%); background: #2563EB; color: white; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: bold; whitespace-nowrap: opacity 0.3s; opacity: 0; } .tooltip-container:hover .tooltip-box { visibility: visible; opacity: 1; }`,
      aiPrompt: 'Create a hover tooltip popup with smooth fade animation.'
    }
  ],
  'UI Kits': [
    {
      name: 'Status Badge Kit',
      category: 'UI Kits',
      icon: Box,
      html: '<div class="badge-kit"><span class="badge active">Active</span><span class="badge pending">Pending</span><span class="badge error">Alert</span></div>',
      css: `.badge-kit { display: flex; gap: 8px; font-family: sans-serif; } .badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; } .badge.active { background: #dcfce7; color: #166534; } .badge.pending { background: #fef3c7; color: #92400e; } .badge.error { background: #fee2e2; color: #991b1b; }`,
      aiPrompt: 'Create a set of status pill badges.'
    }
  ],
  Themes: [
    {
      name: 'Neumorphic Color Tokens',
      category: 'Themes',
      icon: Palette,
      html: '<div class="theme-swatch"><div class="swatch bg"></div><div class="swatch text"></div><div class="swatch accent"></div></div>',
      css: `.theme-swatch { display: flex; gap: 10px; } .swatch { width: 40px; height: 40px; border-radius: 12px; box-shadow: 4px 4px 8px rgba(163,177,198,0.6), -4px -4px 8px rgba(255,255,255,0.5); } .swatch.bg { background: #E0E5EC; } .swatch.text { background: #3D4852; } .swatch.accent { background: #6C63FF; }`,
      aiPrompt: 'Create a Neumorphic design token palette swatch.'
    }
  ]
};

const PresetStarters = ({ selectedCategory = 'Buttons', onSelectPreset }) => {
  const currentPresets = presetsByCategory[selectedCategory] || presetsByCategory['Buttons'];

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] font-bold text-[#3D4852] uppercase">
          Quick Templates ({selectedCategory})
        </label>
        <span className="text-[10px] text-blue-600 font-semibold">1-Click Starter Code</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {currentPresets.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className="p-2 bg-[#E0E5EC] rounded-xl text-xs font-bold text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] hover:shadow-[4px_4px_8px_rgba(163,177,198,0.7),-4px_-4px_8px_rgba(255,255,255,0.6)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/30 truncate"
              title={`Load ${preset.name} template`}
            >
              <Icon className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span className="truncate">{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PresetStarters;
