'use client';

import { useRef, useState } from 'react';
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
      const scrollAmount = 340; // Slightly more than card width for smooth transition
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  if (projects.length === 0) {
    return (
      <div className={`${width} h-64 flex items-center justify-center border border-dashed border-black/[.08] dark:border-white/[.145] rounded-lg`}>
        <p className="text-zinc-400 dark:text-zinc-600">No projects yet</p>
      </div>
    );
  }

  return (
    <div className={`${width} relative`}>
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-black border border-black/[.08] dark:border-white/[.145] flex items-center justify-center shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
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
      )}

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-0 md:px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} imageHeight={imageHeight} textHeight={textHeight} cardWidth={cardWidth} />
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-black border border-black/[.08] dark:border-white/[.145] flex items-center justify-center shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
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
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
