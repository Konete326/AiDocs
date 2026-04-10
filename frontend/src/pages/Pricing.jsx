import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMySubscription, createCheckoutSession } from '../services/subscriptionService';
import PricingHeader from '../components/pricing/PricingHeader';
import PricingCard from '../components/pricing/PricingCard';
import PricingFaq from '../components/pricing/PricingFaq';
import { ChevronLeft } from 'lucide-react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

import { PLANS } from '../constants/pricing';


const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    if (user) {
      getMySubscription().then(setSubscription).catch(() => {});
    }
  }, [user]);

  const handleCheckout = async (plan) => {
    if (!user) {
      navigate('/register');
      return;
    }
    if (subscription?.plan === plan) return;
    
    setIsLoading(true);
    setCheckoutError('');
    try {
      const url = await createCheckoutSession(plan);
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err.response?.data?.error || 'Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <video src={VIDEO_URL} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      
      <div className="relative z-10 min-h-screen px-6 py-16 md:py-24 max-w-5xl mx-auto space-y-16">
        <button 
          onClick={() => navigate(-1)}
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 mb-8 hover:scale-105 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Back</span>
        </button>
        <PricingHeader />

        {checkoutError && (
          <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-white/80 text-center max-w-lg mx-auto">
            {checkoutError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {PLANS.map((planData) => (
            <PricingCard 
              key={planData.plan}
              {...planData}
              isCurrent={subscription?.plan === planData.plan}
              isLoading={isLoading}
              onCheckout={handleCheckout}
            />
          ))}
        </div>

        <PricingFaq />
      </div>
    </section>
  );
};

export default Pricing;
