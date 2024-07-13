import React from 'react';
import './styles.scss';
import { ButtonProps } from '../../types/buttonTypes';

export const Button: React.FC<ButtonProps> = ({ onClick, variant = 'default', children, disabled }) => {
  return (
    <button
      className={`button ${variant} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
