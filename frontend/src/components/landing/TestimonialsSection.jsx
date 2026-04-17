import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Marquee } from '../ui/marquee';
import { useNavigate } from 'react-router-dom';
import { SpecialText } from '../ui/SpecialText';

const testimonials = [
  {
    name: 'Sarah Chen',
    username: '@sarah_dev',
    body: 'AiDocs turned our documentation nightmare into a dream. The PRD generation is absolute magic.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=80',
    country: '🇺🇸',
  },
  {
    name: 'Marcus Thorne',
    username: '@mthorne',
    body: 'The most intuitive AI document tool I\'ve used. It actually understands the technical context.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=80',
    country: '🇬🇧',
  },
  {
    name: 'Elena Rodriguez',
    username: '@elena_specs',
    body: 'Glass UI with AI power? This is the future of startup tooling. Saved us weeks of planning.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=60&w=80',
    country: '🇪🇸',
  },
  {
    name: 'David Kim',
    username: '@dkim_tech',
    body: 'The collaboration features are seamless. Finally, a tool that keeps everyone on the same page.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=80',
    country: '🇰🇷',
  },
  {
    name: 'Anya Varma',
    username: '@anya_ai',
    body: 'SwiftDocs AI is a game changer for technical writers. The automated spec generation is top-tier.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=60&w=80',
    country: '🇮🇳',
  },
  {
    name: 'Julian Schmidt',
    username: '@j_schmidt',
    body: 'Minimal design, maximum output. This is exactly what our dev team needed.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=60&w=80',
    country: '🇩🇪',
  },
];

function TestimonialCard({ img, name, username, body, country }) {
  return (
    <Card className="w-72 border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 rounded-2xl">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-9 border-white/10 ring-1 ring-white/10">
            <AvatarImage src={img} alt={name} loading="lazy" />
            <AvatarFallback className="bg-white/5 text-white/50 text-xs">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-white flex items-center gap-1.5">
              {name} <span>{country}</span>
            </div>
            <p className="text-xs font-medium text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm leading-relaxed text-white/65 italic">
          "{body}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">
            <SpecialText speed={25} inView={true} className="text-white/40">
              Community Feedback
            </SpecialText>
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tighter">
            Loved by Visionary{' '}
            <span className="font-serif italic text-white/80">Builders</span>
          </h2>
        </motion.div>

        {/* Marquee wrapper 
            - Desktop: h-[580px], 3D tilt for premium look
            - Mobile: h-[380px], no 3D (saves GPU on phones)
            - repeat=1 → only 6 cards per column = 18 total (was 72!)
        */}
        <div
          className="relative w-full max-w-[960px] overflow-hidden rounded-3xl"
          style={{ height: 'clamp(360px, 50vw, 580px)' }}
        >
          {/* 3D tilt container — hidden on mobile to save GPU */}
          <div
            className="hidden md:flex flex-row items-start gap-4 absolute inset-0"
            style={{
              transform: 'rotateX(10deg) rotateZ(6deg) scale(1.08)',
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            <Marquee vertical pauseOnHover repeat={1} className="[--duration:32s] h-full">
              {testimonials.map((r) => <TestimonialCard key={r.username + '_a'} {...r} />)}
            </Marquee>
            <Marquee vertical pauseOnHover reverse repeat={1} className="[--duration:28s] h-full">
              {testimonials.map((r) => <TestimonialCard key={r.username + '_b'} {...r} />)}
            </Marquee>
            <Marquee vertical pauseOnHover repeat={1} className="[--duration:36s] h-full">
              {testimonials.map((r) => <TestimonialCard key={r.username + '_c'} {...r} />)}
            </Marquee>
          </div>

          {/* Mobile — flat 2 columns, no 3D */}
          <div className="flex md:hidden flex-row items-start gap-3 absolute inset-0">
            <Marquee vertical pauseOnHover repeat={1} className="[--duration:30s] h-full">
              {testimonials.map((r) => <TestimonialCard key={r.username + '_m1'} {...r} />)}
            </Marquee>
            <Marquee vertical pauseOnHover reverse repeat={1} className="[--duration:26s] h-full">
              {testimonials.map((r) => <TestimonialCard key={r.username + '_m2'} {...r} />)}
            </Marquee>
          </div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black to-transparent z-10" />

          {/* Give Feedback CTA
              - Desktop: appears only when section is hovered
              - Mobile: always visible
          */}
          {/* Mobile always-visible */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none md:hidden">
            <div className="pointer-events-auto">
              <FeedbackButton onClick={() => navigate('/feedback')} />
            </div>
          </div>

          {/* Desktop hover-reveal */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="feedback-cta"
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute inset-0 items-center justify-center z-20 pointer-events-auto hidden md:flex"
              >
                <FeedbackButton onClick={() => navigate('/feedback')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* Glass feedback button — same style as Explore btn, smaller, rounded-2xl */
function FeedbackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        liquid-glass
        flex items-center gap-2.5
        px-5 py-2.5
        rounded-2xl
        border border-white/15
        text-white/85 text-sm font-medium tracking-wide
        hover:bg-white/10
        transition-colors duration-200
        cursor-pointer
        shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
      "
    >
      <MessageSquarePlus className="w-4 h-4 text-white/60" />
      <span>Give Feedback</span>
    </button>
  );
}
