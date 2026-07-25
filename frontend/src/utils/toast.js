import { toast } from 'react-hot-toast';

export const showSuccess = (title, message) => {
  toast.success(message || title, { title });
};

export const showError = (title, message) => {
  toast.error(message || title, { title });
};

export const showInfo = (title, message) => {
  toast(message || title, { title });
};

export default { showSuccess, showError, showInfo };
