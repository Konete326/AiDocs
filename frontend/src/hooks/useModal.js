import { useState } from 'react';

export function useConfirmModal() {
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    onConfirm: null,
    isDangerous: false,
  });

  const confirm = ({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, isDangerous = false }) => {
    setModal({ isOpen: true, title, message, confirmLabel, cancelLabel, onConfirm, isDangerous });
  };

  const close = () => setModal(prev => ({ ...prev, isOpen: false, onConfirm: null, isDangerous: false }));

  const handleConfirm = () => {
    if (modal.onConfirm) modal.onConfirm();
    close();
  };

  return { modal, confirm, close, handleConfirm };
}

export function useAlertModal() {
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', buttonLabel: 'Got it' });

  const alert = ({ title, message, buttonLabel = 'Got it' }) => {
    setModal({ isOpen: true, title, message, buttonLabel });
  };

  const close = () => setModal(prev => ({ ...prev, isOpen: false }));

  return { modal, alert, close };
}
