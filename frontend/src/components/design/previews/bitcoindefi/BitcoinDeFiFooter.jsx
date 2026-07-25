import React from "react";

export const BitcoinDeFiFooter = () => {
  return (
    <footer className="bg-[#08080C] border-t border-[#F7931A]/20 py-16 font-['Space_Grotesk'] text-[#F4F4F6]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-bold text-2xl tracking-wider text-white mb-4">BTC_VAULT</div>
          <p className="font-mono text-xs text-[#A0A0B0] leading-relaxed">
            Bitcoin DeFi precision engineering with luminescent orange fire and cryptographic trust.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#F7931A] mb-4">// PROTOCOL</div>
          <ul className="space-y-2 font-mono text-xs text-[#A0A0B0]">
            <li><a href="#features" className="hover:text-white">Architecture</a></li>
            <li><a href="#pricing" className="hover:text-white">Vault Yield</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#FFD700] mb-4">// NETWORK</div>
          <ul className="space-y-2 font-mono text-xs text-[#A0A0B0]">
            <li><a href="#showcase" className="hover:text-white">Components</a></li>
            <li><a href="#pricing" className="hover:text-white">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#F7931A] mb-4">// NETWORK STATE</div>
          <p className="font-mono text-xs text-[#FFD700]">MAINNET ACTIVE // 2026</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#F7931A]/20 font-mono text-[10px] uppercase text-[#A0A0B0] flex justify-between">
        <span>© 2026 BITCOIN DEFI SYSTEM</span>
        <span>BITCOIN ORANGE #F7931A</span>
      </div>
    </footer>
  );
};
