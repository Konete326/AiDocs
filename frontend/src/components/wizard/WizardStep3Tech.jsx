import TechField from './fields/TechField';
import MonetizationField from './fields/MonetizationField';
import ContextField from './fields/ContextField';

export default function WizardStep3Tech({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <TechField formData={formData} onChange={onChange} />
      <MonetizationField formData={formData} onChange={onChange} />
      <ContextField formData={formData} onChange={onChange} />
    </div>
  );
}
