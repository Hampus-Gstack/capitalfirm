'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { presentationSlides } from '@/components/PresentationSlides';

export default function RoialsCapitalPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if mobile and show hint
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowMobileHint(true);
        setTimeout(() => setShowMobileHint(false), 5000);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setIsMenuOpen(false);
  };

  const goToNextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, presentationSlides.length - 1));
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="h-screen bg-black overflow-hidden relative" ref={containerRef}>
      {/* Mobile Landscape Hint */}
      {showMobileHint && isMobile && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg z-50 flex items-center space-x-2">
          <span className="text-xl">📱</span>
          <span className="font-bold">Rotate device for better experience</span>
        </div>
      )}

      {/* Navigation Menu */}
      <div className={`fixed top-0 left-0 h-full bg-black/95 backdrop-blur-sm z-40 transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 w-80 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">ROIALS CAPITAL</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-yellow-400"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {presentationSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  currentSlide === index
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm opacity-60">{String(index + 1).padStart(2, '0')}</span>
                  <span>{slide.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 left-4 z-30 text-white hover:text-yellow-400 transition-colors"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / presentationSlides.length) * 100}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="fixed top-4 right-4 text-white/60 text-sm z-20">
        {currentSlide + 1} / {presentationSlides.length}
      </div>

      {/* Main Content */}
      <div className="h-full relative">
        <div className="h-full">
          {presentationSlides[currentSlide]?.content}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPreviousSlide}
        disabled={currentSlide === 0}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed z-20"
      >
        <ChevronLeftIcon className="h-8 w-8" />
      </button>

      <button
        onClick={goToNextSlide}
        disabled={currentSlide === presentationSlides.length - 1}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed z-20"
      >
        <ChevronRightIcon className="h-8 w-8" />
      </button>
    </div>
  );
} 