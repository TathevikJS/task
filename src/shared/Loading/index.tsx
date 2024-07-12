import React from 'react';
import './styles.scss';

export const Loading: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};
