import { motion } from 'framer-motion';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

const sampleTestimonials = [
  { avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg", name: "Sarah Chen", handle: "@sarahdigital", text: "Amazing platform! Experience is seamless." },
  { avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg", name: "Marcus J.", handle: "@marcustech", text: "Transformed how I work. Clean design." },
  { avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg", name: "David M.", handle: "@davidcreates", text: "Intuitive, reliable, and helpful." },
];

const TestimonialCard = ({ testimonial, i }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="flex items-start gap-3 rounded-3xl liquid-glass border border-white/10 p-5 w-64 lg:w-72 flex-shrink-0">
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="font-medium text-white">{testimonial.name}</p>
      <p className="text-white/50 text-xs">{testimonial.handle}</p>
      <p className="mt-1 text-white/80 text-xs">{testimonial.text}</p>
    </div>
  </motion.div>
);

const AuthLayout = ({ children }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row">
      <video src={VIDEO_URL} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      
      <div className="relative z-10 w-full md:w-1/2 lg:w-[45%] flex items-center justify-center p-6 sm:p-8 bg-black/40 backdrop-blur-xl border-r border-white/10 h-full overflow-y-auto">
        {children}
      </div>

      <div className="relative z-10 hidden md:flex flex-1 flex-col items-center justify-end p-8 pb-16">
        <div className="flex gap-4 overflow-hidden w-full justify-center">
            {sampleTestimonials.map((t, i) => <TestimonialCard key={i} testimonial={t} i={i} />)}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
