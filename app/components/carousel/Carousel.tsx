'use client';

import { useRef, useState, useEffect } from 'react';
import ProjectCard, { ProjectCardProps } from './ProjectCard';

interface CarouselProps {
  projects: ProjectCardProps[];
  width?: string;
  imageHeight?: string;
  textHeight?: string;
  cardWidth?: string;
}

export default function Carousel({
  projects,
  width = 'w-full',
  imageHeight = 'h-40',
  textHeight = 'h-12',
  cardWidth = 'w-52',
}: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = Array.from(container.children) as HTMLElement[];
      if (cards.length === 0) return;

      const containerWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const containerCenter = scrollLeft + containerWidth / 2;

      // Find the currently visible/centered card
      let currentCardIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const cardRight = cardLeft + cardWidth;
        const cardCenter = cardLeft + cardWidth / 2;
        
        // Calculate distance from container center
        const distance = Math.abs(cardCenter - containerCenter);
        
        // Prefer cards that are at least partially visible
        const isVisible = cardRight > scrollLeft && cardLeft < scrollLeft + containerWidth;
        
        if (isVisible && distance < minDistance) {
          minDistance = distance;
          currentCardIndex = i;
        } else if (!isVisible && distance < minDistance) {
          minDistance = distance;
          currentCardIndex = i;
        }
      }

      // Calculate target card index
      const targetIndex = direction === 'left'
        ? Math.max(0, currentCardIndex - 1)
        : Math.min(cards.length - 1, currentCardIndex + 1);

      // Use scrollIntoView for reliable centering, especially on mobile
      const targetCard = cards[targetIndex];
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // Check if there's any content cut off on the left
      const hasContentOnLeft = scrollLeft > 1;

      // Check if there's any content cut off on the right
      const hasContentOnRight = scrollLeft < scrollWidth - clientWidth - 1;

      // Only show arrows if content is actually being clipped
      const isOverflowing = scrollWidth > clientWidth;

      setShowLeftArrow(isOverflowing && hasContentOnLeft);
      setShowRightArrow(isOverflowing && hasContentOnRight);
    }
  };

  const handleScroll = () => {
    updateArrowVisibility();
  };

  useEffect(() => {
    // Initial check
    updateArrowVisibility();

    // Update on window resize
    const handleResize = () => {
      updateArrowVisibility();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className={`${width} h-64 flex items-center justify-center border border-dashed border-black/[.08] dark:border-white/[.145] rounded-lg`}>
        <p className="text-zinc-400 dark:text-zinc-600">No projects yet</p>
      </div>
    );
  }

  return (
    <div className={`${width} relative`}>
      <button
        onClick={() => scroll('left')}
        className={`absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-black border border-black/[.08] dark:border-white/[.145] flex items-center justify-center shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 ${
          showLeftArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll left"
      >
          <svg
            className="w-5 h-5 dark:invert"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
      </button>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-0 md:px-12"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory'
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex justify-center md:w-auto md:block"
            style={{ scrollSnapAlign: 'center' }}
          >
            <ProjectCard {...project} imageHeight={imageHeight} textHeight={textHeight} cardWidth={cardWidth} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className={`absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-black border border-black/[.08] dark:border-white/[.145] flex items-center justify-center shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 ${
          showRightArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll right"
      >
          <svg
            className="w-5 h-5 dark:invert"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
      </button>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
