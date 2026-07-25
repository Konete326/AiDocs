import React from "react";

export const TerminalFooter = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t-2 border-[#1f521f] py-16 font-['JetBrains_Mono',monospace] text-[#33ff00]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-bold text-lg text-[#ffb000] mb-4">root@aidocs:~$</div>
          <p className="text-xs text-[#33ff00]/60 leading-relaxed font-mono">
            Cyber-industrial shell environment paying homage to command-line interfaces.
          </p>
        </div>
        <div>
          <div className="text-xs text-[#ffb000] font-bold mb-4">[ COMMANDS ]</div>
          <ul className="space-y-2 text-xs">
            <li><a href="#features" className="hover:bg-[#33ff00] hover:text-black font-mono">ls -la ./features</a></li>
            <li><a href="#pricing" className="hover:bg-[#33ff00] hover:text-black font-mono">cat ./pricing.txt</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs text-[#ffb000] font-bold mb-4">[ SYSTEM ]</div>
          <ul className="space-y-2 text-xs">
            <li><a href="#showcase" className="hover:bg-[#33ff00] hover:text-black font-mono">./run_ui_tests.sh</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs text-[#ffb000] font-bold mb-4">[ STATUS ]</div>
          <p className="text-xs text-[#33ff00]/60">UPTIME: 99.99% // CPU: OK</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#1f521f] text-[10px] text-[#33ff00]/50 flex justify-between font-mono">
        <span>© 2026 TERMINAL CLI DESIGN SYSTEM</span>
        <span>STATUS_OK</span>
      </div>
    </footer>
  );
};
