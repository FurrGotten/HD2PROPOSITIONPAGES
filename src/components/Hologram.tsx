import React from 'react';
import './HologramStyle.css';

interface HologramProps {
  children: React.ReactNode;
  className?: string;
}

export const Hologram = ({ children, className = "" }: HologramProps) => {
  return (
    <div className={`hologram-container ${className}`}>
      <div className="hologram-content">
        {children}
      </div>
      <div className="hologram-noise" />
    </div>
  );
};
