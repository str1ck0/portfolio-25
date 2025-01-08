'use client'

import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If section is intersecting and moving into view
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
        // If section is moving out of view and it was the active section
        else if (entry.target.id === activeSection) {
          // Find the previous visible section
          const visibleSections = Array.from(document.querySelectorAll('section[id]'))
            .filter(section => {
              const rect = section.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              // Check if section is at least partially visible in viewport
              return rect.top < windowHeight / 2 && rect.bottom >= windowHeight / 2;
            });

          if (visibleSections.length > 0) {
            setActiveSection(visibleSections[0].id);
          } else {
            setActiveSection('');
          }
        }
      });
    }, options);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Set initial active section on page load
    const setInitialActiveSection = () => {
      const visibleSections = Array.from(sections)
        .filter(section => {
          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          return rect.top < windowHeight / 2 && rect.bottom >= windowHeight / 2;
        });

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].id);
        }
    };

    // Set initial state after a short delay to ensure all sections are rendered
    setTimeout(setInitialActiveSection, 100);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [activeSection]); // Add activeSection as dependency

  return activeSection;
};
