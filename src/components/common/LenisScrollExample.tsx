// Example usage of Lenis smooth scrolling

import { useLenisScroll } from '@/hooks/useLenisScroll';

export const ExampleComponent = () => {
  const { scrollToElement, scrollToTop, scrollToPosition } = useLenisScroll();

  return (
    <div>
      {/* Scroll to specific element */}
      <button
        onClick={() =>
          scrollToElement('hero-section', { offset: 80, duration: 1.5 })
        }
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Go to Hero
      </button>

      {/* Scroll to top */}
      <button
        onClick={() => scrollToTop(2.0)}
        className="px-4 py-2 bg-secondary text-white rounded"
      >
        Back to Top
      </button>

      {/* Scroll to specific position */}
      <button
        onClick={() => scrollToPosition(1000, 1.2)}
        className="px-4 py-2 bg-accent text-white rounded"
      >
        Scroll to 1000px
      </button>
    </div>
  );
};

// For anchor links, Lenis automatically handles them
// Just use regular anchor links and they'll be smooth:
// <a href="#section-id">Smooth scroll to section</a>
