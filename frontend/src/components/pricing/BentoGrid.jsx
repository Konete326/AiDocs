import ProCard from './ProCard';
import FreeCard from './FreeCard';
import TeamCard from './TeamCard';

const BentoGrid = ({ subscription, isLoading, onCheckout }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 max-w-5xl mx-auto auto-rows-min mt-12">
      <ProCard 
        subscription={subscription} 
        isLoading={isLoading} 
        onCheckout={onCheckout} 
      />
      <FreeCard 
        subscription={subscription} 
        onCheckout={onCheckout} 
      />
      <TeamCard 
        subscription={subscription} 
        isLoading={isLoading} 
        onCheckout={onCheckout} 
      />
    </div>
  );
};

export default BentoGrid;
