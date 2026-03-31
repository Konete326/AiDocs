// Reusable Button component
import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
