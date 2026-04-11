import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Marquee } from '../ui/marquee';
import Button from '../common/Button';

const testimonials = [
  {
    name: 'Sarah Chen',
    username: '@sarah_dev',
    body: 'AiDocs turned our documentation nightmare into a dream. The PRD generation is absolute magic.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    country: '🇺🇸',
  },
  {
    name: 'Marcus Thorne',
    username: '@mthorne',
    body: 'The most intuitive AI document tool I\'ve used. It actually understands the technical context.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    country: '🇬🇧',
  },
  {
    name: 'Elena Rodriguez',
    username: '@elena_specs',
    body: 'Glass UI with AI power? This is the future of startup tooling. Saved us weeks of planning.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    country: '🇪🇸',
  },
  {
    name: 'David Kim',
    username: '@dkim_tech',
    body: 'The collaboration features are seamless. Finally, a tool that keeps everyone on the same page.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    country: '🇰🇷',
  },
  {
    name: 'Anya Varma',
    username: '@anya_ai',
    body: 'SwiftDocs AI is a game changer for technical writers. The automated spec generation is top-tier.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    country: '🇮🇳',
  },
  {
    name: 'Julian Schmidt',
    username: '@j_schmidt',
    body: 'Minimal design, maximum output. This is exactly what our dev team needed.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    country: '🇩🇪',
  },
];

function TestimonialCard({ img, name, username, body, country }) {
  return (
    <Card className="w-80 border-white/5 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border-white/10 ring-2 ring-white/5">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-white/5 text-white/50">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              {name} <span>{country}</span>
            </div>
            <p className="text-xs font-medium text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-4 text-sm leading-relaxed text-white/70 italic">
          "{body}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* 3D Perspective Wrapper */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">Community Feedback</p>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tighter">
            Loved by Visionary <span className="font-serif italic text-white/80">Builders</span>
          </h2>
        </motion.div>

        {/* The Marquee Display with 3D Tilt */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [perspective:1200px]">
          <div 
            className="flex gap-8 px-4"
            style={{ 
              transform: 'rotateX(15deg) translateY(-20px)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Multiple staggered marquees for the 3D effect */}
            <Marquee vertical repeat={3} className="[--duration:50s] h-[600px]">
              {testimonials.slice(0, 3).map((item) => (
                <TestimonialCard key={item.username} {...item} />
              ))}
            </Marquee>
            <Marquee vertical reverse repeat={3} className="[--duration:40s] h-[600px] mt-12">
              {testimonials.slice(3, 6).map((item) => (
                <TestimonialCard key={item.username} {...item} />
              ))}
            </Marquee>
            <Marquee vertical repeat={3} className="[--duration:60s] h-[600px] hidden md:flex">
              {testimonials.slice(0, 3).reverse().map((item) => (
                <TestimonialCard key={item.username} {...item} />
              ))}
            </Marquee>
          </div>

          {/* Centered Feedback CTA Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="pointer-events-auto"
            >
              <Button 
                variant="strong" 
                className="shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center gap-3 py-6 px-10 group"
                onClick={() => navigate('/feedback')}
              >
                <MessageSquarePlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="text-lg font-medium">Give Your Feedback</span>
              </Button>
            </motion.div>
          </div>

          {/* Gradients to fade edges */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
