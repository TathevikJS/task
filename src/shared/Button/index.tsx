// Button.tsx
import React from 'react';
import './styles.scss';
import { ButtonProps } from '../../types/buttonTypes';

export const Button: React.FC<ButtonProps> = ({ onClick, variant = 'default', children }) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
