import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Plus } from 'lucide-react';
import api from '../services/api';
import Button from '../components/common/Button';
import FeedbackModal from '../components/landing/FeedbackModal';
import { SpecialText } from '../components/ui/SpecialText';

// --- Static Dummy Testimonials (as provided) ---
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
        animate={{
          translateY: reverse ? "0%" : "-50%",
        }}
        initial={{
          translateY: reverse ? "-50%" : "0%",
        }}
        transition={{
          duration: duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ willChange: 'transform' }}
        className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
      >
        {[...testimonials, ...testimonials].map((item, i) => (
          <li 
            key={item._id || `${item.name}-${i}`}
            className="p-8 rounded-[2.5rem] liquid-glass-strong border border-white/5 shadow-2xl w-full max-w-sm cursor-default select-none group hover:border-white/10 transition-colors duration-300"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-3 h-3 text-yellow-500/50 fill-yellow-500/30" />
              ))}
            </div>
            <p className="text-white/60 leading-relaxed text-sm mb-6 italic">
              "{item.content || item.text}"
            </p>
            <footer className="flex items-center gap-3">
              <img
                src={item.avatar || item.image || `https://ui-avatars.com/api/?name=${item.name}&background=random`}
                alt={item.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/5 group-hover:ring-white/10 transition-all"
                loading="lazy"
              />
              <div className="flex flex-col">
                <cite className="font-semibold not-italic text-sm text-white">
                  {item.name}
                </cite>
                <span className="text-[10px] tracking-widest uppercase font-bold text-white/30">
                  {item.role || 'Contributor'}
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await api.get('/feedback');
        setRealFeedback(res.data.data);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  // Merge real and dummy data
  const combinedData = useMemo(() => {
    // If we have enough real feedback, use it. Otherwise pad with dummy.
    const data = [...realFeedback, ...DUMMY_TESTIMONIALS];
    return {
      col1: data.slice(0, Math.ceil(data.length / 3)),
      col2: data.slice(Math.ceil(data.length / 3), Math.ceil(data.length * 2 / 3)),
      col3: data.slice(Math.ceil(data.length * 2 / 3)),
    };
  }, [realFeedback]);

  const handleNewFeedback = (feedback) => {
    setRealFeedback(prev => [feedback, ...prev]);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Dark overlay — video from PersistentBackground in App.jsx */}
      <div className="fixed inset-0 bg-black/60 z-[1] backdrop-blur-[2px]" />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex-1 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button 
              variant="strong" 
              className="px-8 py-3 rounded-full mb-8 flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              onClick={() => setIsModalOpen(true)}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share Feedback</span>
              <Plus className="w-3 h-3 opacity-50 group-hover:rotate-90 transition-transform" />
            </Button>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-medium text-white tracking-tighter mb-6"
          >
            Built by us, shaped <br />
            by <span className="font-serif italic text-white/80">you.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-xl text-lg"
          >
            <SpecialText speed={15} delay={0.5} inView={true} className="text-white/40">
              Insights from pioneers building the next generation of documentation and AI-driven workflows.
            </SpecialText>
          </motion.p>
        </div>

        {/* Scrolling Columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[700px] overflow-hidden px-4">
          <TestimonialsColumn testimonials={combinedData.col1} duration={25} />
          <TestimonialsColumn testimonials={combinedData.col2} duration={35} reverse className="hidden md:block" />
          <TestimonialsColumn testimonials={combinedData.col3} duration={30} className="hidden lg:block" />
        </div>
      </div>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleNewFeedback}
      />
      
      <footer className="relative z-10 py-12 text-center border-t border-white/5 bg-black/40 backdrop-blur-md">
        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/20">
          AiDocs Evolution • Verified Community Voice
        </p>
      </footer>
    </div>
  );
};

export default Feedback;
