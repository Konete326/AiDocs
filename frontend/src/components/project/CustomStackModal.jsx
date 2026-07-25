import CustomStackBuilderPanel from './CustomStackBuilderPanel';

export default function CustomStackModal({ onSaveCustomStack, currentCustom, isUpdating }) {
  return (
    <CustomStackBuilderPanel
      onSaveCustomStack={onSaveCustomStack}
      currentCustom={currentCustom}
      isUpdating={isUpdating}
    />
  );
}
