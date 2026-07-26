import { TechFieldSelector, TechNotesField } from './fields/TechField';
import MonetizationField from './fields/MonetizationField';
import ContextField from './fields/ContextField';
import DesignSystemField from './fields/DesignSystemField';

export default function WizardStep3Tech({ formData, onChange }) {
  return (
    <div className="space-y-2">
      {/* Row 1: Theme Choose & Target Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 items-start">
        <DesignSystemField formData={formData} onChange={onChange} />
        <TechFieldSelector formData={formData} onChange={onChange} />
      </div>

      {/* Row 2: Monetization & Custom Tech Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 items-start">
        <MonetizationField formData={formData} onChange={onChange} />
        <TechNotesField formData={formData} onChange={onChange} />
      </div>

      {/* Row 3: Additional Context Full Row */}
      <ContextField formData={formData} onChange={onChange} />
    </div>
  );
}
