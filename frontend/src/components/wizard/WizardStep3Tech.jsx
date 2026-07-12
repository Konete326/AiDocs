import TechField from './fields/TechField';
import MonetizationField from './fields/MonetizationField';
import ContextField from './fields/ContextField';

export default function WizardStep3Tech({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <TechField formData={formData} onChange={onChange} />
        <MonetizationField formData={formData} onChange={onChange} />
      </div>
      <ContextField formData={formData} onChange={onChange} />
    </div>
  );
}
