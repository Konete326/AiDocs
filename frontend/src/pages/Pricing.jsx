import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PricingHero from '../components/pricing/PricingHero';
import BentoGrid from '../components/pricing/BentoGrid';
import PricingFeatures from '../components/pricing/PricingFeatures';
import PricingFaq from '../components/pricing/PricingFaq';

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      axios.get('/api/users/me/subscription')
        .then(res => setSubscription(res.data.subscription))
        .catch(() => setSubscription(null));
    }
  }, [user]);

  const handleCheckout = async (plan) => {
    if (!user) return navigate('/register');
    if (plan === 'free') return;
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/payments/create-checkout-session', { plan });
      window.location.href = data.url;
    } catch (err) {
      alert(err.response?.data?.message || 'Checkout error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Video from PersistentBackground — no local video needed */}
      <div className="fixed inset-0 bg-black/55 z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12 pt-24 pb-20 px-4 md:px-8">
        <PricingHero />
        <BentoGrid subscription={subscription} isLoading={isLoading} onCheckout={handleCheckout} />
        <PricingFeatures />
        <PricingFaq />
      </div>
    </div>
  );
};

export default Pricing;
