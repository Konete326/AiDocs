import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Plus } from 'lucide-react';
import api from '../services/api';
import FeedbackModal from '../components/landing/FeedbackModal';
import { SpecialText } from '../components/ui/SpecialText';

const DUMMY_TESTIMONIALS = [
  {
    content: "AiDocs revolutionized our documentation process. Generating PRDs from simple ideas is absolute magic.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    content: "The seamless integration of AI with collaborative workspace features made team training effortless.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ahmed Bilal",
    role: "IT Manager",
  },
  {
    content: "The support team is exceptional, helping us build high-quality technical specs in minutes.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Product Lead",
  },
  {
    content: "This platform's intuitive interface and smart doc generation boosted our efficiency by 200%.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "CEO @ Visionary",
  },
  {
    content: "Robust features and quick AI responses have transformed our planning workflow entirely.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Project Director",
  },
  {
    content: "The smooth implementation exceeded expectations. It's the only AI tool our devs actually use.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Lead Developer",
  },
];

const TestimonialsColumn = ({ testimonials, duration, className, reverse = false }) => {
  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <motion.ul
        animate={{ translateY: reverse ? "0%" : "-50%" }}
        initial={{ translateY: reverse ? "-50%" : "0%" }}
        transition={{ duration: duration || 18, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
      >
        {[...testimonials, ...testimonials].map((item, i) => (
          <li 
            key={item._id || `${item.name}-${i}`}
            className="p-6 rounded-[2.5rem] neumorphic-card w-full max-w-sm cursor-default select-none"
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              ))}
            </div>
            <p className="text-[#6B7280] leading-relaxed text-xs sm:text-sm mb-6 font-medium">
              "{item.content || item.text}"
            </p>
            <footer className="flex items-center gap-3">
              <img
                src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || 'User')}&background=6C63FF&color=fff`}
                alt={item.name}
                className="h-10 w-10 rounded-2xl object-cover neumorphic-inset"
                loading="lazy"
              />
              <div className="flex flex-col">
                <cite className="font-bold not-italic text-xs sm:text-sm text-[#3D4852]">
                  {item.name || 'Anonymous Contributor'}
                </cite>
                <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-[#6C63FF]">
                  {item.role || 'Verified Member'}
                </span>
              </div>
            </footer>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

const Feedback = () => {
  const [realFeedback, setRealFeedback] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await api.get('/feedback');
        if (res.data?.data) setRealFeedback(res.data.data);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      }
    };
    fetchFeedback();
  }, []);

  const combinedData = useMemo(() => {
    const data = [...realFeedback, ...DUMMY_TESTIMONIALS];
    return {
      col1: data.slice(0, Math.ceil(data.length / 3)),
      col2: data.slice(Math.ceil(data.length / 3), Math.ceil(data.length * 2 / 3)),
      col3: data.slice(Math.ceil(data.length * 2 / 3)),
    };
  }, [realFeedback]);

  return (
    <div className="relative min-h-screen w-full bg-[#E0E5EC] text-[#3D4852] flex flex-col pt-24 sm:pt-28">
      <div className="relative z-10 container mx-auto px-4 pb-12 flex-1 flex flex-col">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <button 
              className="neumorphic-btn px-6 py-3 rounded-2xl mb-8 flex items-center gap-2 text-xs font-bold text-[#3D4852] cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <MessageSquare className="w-4 h-4 text-[#6C63FF]" />
              <span>Share Feedback</span>
              <Plus className="w-3.5 h-3.5 text-[#6C63FF]" />
            </button>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-[#3D4852] tracking-tight mb-4"
          >
            Built by us, shaped by <span className="text-[#6C63FF]">you.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#6B7280] max-w-xl text-sm font-medium"
          >
            <SpecialText speed={15} delay={0.5} inView={true} className="text-[#6B7280]">
              Insights from pioneers building the next generation of documentation and AI-driven workflows.
            </SpecialText>
          </motion.p>
        </div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[620px] overflow-hidden px-4">
          <TestimonialsColumn testimonials={combinedData.col1} duration={25} />
          <TestimonialsColumn testimonials={combinedData.col2} duration={35} reverse className="hidden md:block" />
          <TestimonialsColumn testimonials={combinedData.col3} duration={30} className="hidden lg:block" />
        </div>
      </div>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={(fb) => setRealFeedback(prev => [fb, ...prev])}
      />
      
      <footer className="relative z-10 py-8 text-center border-t border-black/5 bg-[#E0E5EC]">
        <p className="text-[10px] tracking-[0.3em] uppercase font-mono font-bold text-[#6B7280]">
          AiDocs Evolution • Verified Community Voice
        </p>
      </footer>
    </div>
  );
};

export default Feedback;
