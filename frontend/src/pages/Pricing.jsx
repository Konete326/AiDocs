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
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 md:px-8 relative overflow-hidden text-white">
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-40 translate-z-0 pointer-events-none">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/40 -z-[5]" />
      <div className="max-w-7xl mx-auto space-y-12">
        <PricingHero />
        <BentoGrid subscription={subscription} isLoading={isLoading} onCheckout={handleCheckout} />
        <PricingFeatures />
        <PricingFaq />
      </div>
    </div>
  );
};

export default Pricing;
