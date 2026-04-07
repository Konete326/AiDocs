import React from 'react';
import {
  Menu,
  Download,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Sparkles,
  Wand2,
  BookOpen,
  Plus,
} from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex overflow-hidden bg-black">
      {/* ── Background Video ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ── Dark scrim over video ── */}
      <div className="absolute inset-0 z-[1] bg-black/30" />

      {/* ══════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════ */}
      <div className="relative z-10 w-full lg:w-[52%] min-h-screen flex flex-col p-4 lg:p-6">
        {/* Liquid glass overlay card */}
        <div className="liquid-glass-strong rounded-3xl absolute inset-4 lg:inset-6 z-0" />

        {/* Panel content sits above the glass */}
        <div className="relative z-10 flex flex-col min-h-full">

          {/* ── Top Nav ── */}
          <nav className="flex items-center justify-between px-6 pt-6">
            <span className="text-2xl font-semibold tracking-tighter text-white select-none">
              SwiftDocs
            </span>

            {/* Menu pill */}
            <button className="liquid-glass rounded-full flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform">
              <Menu className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/80 font-light">Menu</span>
            </button>
          </nav>

          {/* ── Hero Center ── */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-8">
            <h1
              className="text-6xl lg:text-7xl font-medium tracking-[-0.05em] text-white leading-[1.05]"
            >
              Architecting the
              <br />
              <i className="font-serif text-white/80">intelligence</i> of SaaS
            </h1>

            {/* CTA Button */}
            <button className="liquid-glass-strong rounded-full flex items-center gap-3 px-7 py-3.5 hover:scale-105 transition-transform">
              <Download className="w-4 h-4 text-white/80" />
              <span className="text-sm font-medium text-white tracking-wide">
                Start Generating
              </span>
            </button>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['9-Doc Tech Suites', 'AI Generation Cascade', 'Kanban Workspace'].map(
                (pill) => (
                  <span
                    key={pill}
                    className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 tracking-wide hover:scale-105 transition-transform cursor-default"
                  >
                    {pill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* ── Bottom Section ── */}
          <div className="px-8 pb-8 flex flex-col gap-4">
            {/* Label */}
            <p className="text-xs tracking-widest uppercase text-white/50 text-center">
              Visionary Engineering
            </p>

            {/* Quote */}
            <p className="text-center text-white/80 text-base font-light">
              "We imagined a workflow with{' '}
              <i className="font-serif text-white/70">zero friction</i>."
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 justify-center">
              <div className="flex-1 h-px bg-white/15" />
              <span className="text-xs text-white/50 font-light tracking-wide whitespace-nowrap">
                AiDocs Engine
              </span>
              <div className="flex-1 h-px bg-white/15" />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          RIGHT PANEL
      ══════════════════════════════════ */}
      <div className="hidden lg:flex relative z-10 w-[48%] min-h-screen flex-col p-6 gap-5">

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-end gap-3">
          {/* Social icons pill */}
          <div className="liquid-glass rounded-full flex items-center gap-1 px-3 py-2">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <button
                key={i}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Icon className="w-3.5 h-3.5 text-white/70" />
              </button>
            ))}
            <div className="w-px h-4 bg-white/20 mx-1" />
            <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>

          {/* Account / Sparkles button */}
          <button className="liquid-glass rounded-full flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white/70" />
            <span className="text-xs text-white/70 font-light">Account</span>
          </button>
        </div>

        {/* ── Community Card ── */}
        <div className="liquid-glass rounded-2xl p-5 w-56">
          <p className="text-sm font-medium text-white leading-snug mb-2">
            Enter the developer ecosystem
          </p>
          <p className="text-xs text-white/60 font-light leading-relaxed">
            Join builders shipping faster with AI-generated docs.
          </p>
        </div>

        {/* ── Bottom Feature Section ── */}
        <div className="mt-auto">
          <div className="liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-3">

            {/* Two side-by-side cards */}
            <div className="flex gap-3">
              {/* AI Processing */}
              <div className="liquid-glass rounded-3xl flex-1 p-5 flex flex-col gap-3 hover:scale-105 transition-transform cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Wand2 className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">AI Processing</p>
                  <p className="text-xs text-white/50 font-light mt-1">
                    4-level fallback cascade
                  </p>
                </div>
              </div>

              {/* Doc Archive */}
              <div className="liquid-glass rounded-3xl flex-1 p-5 flex flex-col gap-3 hover:scale-105 transition-transform cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Doc Archive</p>
                  <p className="text-xs text-white/50 font-light mt-1">
                    9-document tech suite
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom inner card */}
            <div className="liquid-glass rounded-3xl p-5 flex items-start gap-4 hover:scale-105 transition-transform cursor-default">
              {/* Thumbnail */}
              <div className="w-24 h-16 rounded-xl bg-white/5 flex-shrink-0 overflow-hidden">
                <svg
                  viewBox="0 0 96 64"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="96" height="64" fill="rgba(255,255,255,0.03)" />
                  {/* Abstract tech grid */}
                  {[0, 1, 2, 3].map((row) =>
                    [0, 1, 2, 3, 4].map((col) => (
                      <rect
                        key={`${row}-${col}`}
                        x={col * 20 + 3}
                        y={row * 15 + 2}
                        width={14}
                        height={10}
                        rx={2}
                        fill={`rgba(255,255,255,${Math.random() * 0.08 + 0.03})`}
                      />
                    ))
                  )}
                  <line x1="0" y1="32" x2="96" y2="32" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  <line x1="48" y1="0" x2="48" y2="64" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Text + Plus */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white leading-snug">
                  Advanced Document Architecture
                </p>
                <p className="text-xs text-white/50 font-light mt-1 leading-relaxed">
                  Structured outputs ready for AI coding agents.
                </p>
              </div>

              <button className="liquid-glass rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform">
                <Plus className="w-4 h-4 text-white/70" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
