import React, { useState, useEffect, useCallback } from 'react';
import './SlideWrapper.css';

interface SlideWrapperProps {
  slides: React.ReactNode[];
}

export function SlideWrapper({ slides }: SlideWrapperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Logic for Vertical Swipes
  let touchStart = 0;
  const onTouchStart = (e: React.TouchEvent) => (touchStart = e.touches[0].clientY);
  const onTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    if (touchStart - touchEnd > 70) nextSlide(); // Swipe Up
    if (touchStart - touchEnd < -70) prevSlide(); // Swipe Down
  };

  return (
    <div
      className="slide-wrapper-container"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="nav-hitbox left-hitbox" onClick={prevSlide} />
      <div className="nav-hitbox right-hitbox" onClick={nextSlide} />

      <div className="nav-hitbox top-hitbox" onClick={prevSlide} />
      <div className="nav-hitbox bottom-hitbox" onClick={nextSlide} />

      <div className="slide-content">
        {slides[currentIndex]}
      </div>
    </div>
  );
}
