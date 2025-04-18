"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Section {
  id: string;
  name: string;
}

interface ScrollGuideProps {
  sections: Section[];
}

const ScrollGuide: React.FC<ScrollGuideProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

  const handleScroll = useCallback(() => {
    let currentSection = sections[0]?.id || "";
    let minDistance = Infinity;

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Calculate the distance from the top of the viewport or center
        // Element is considered active if its top is near the top of the viewport
        const distance = Math.abs(rect.top);

        // Or, consider active if the element takes up a significant portion of the viewport center
        const viewportHeight = window.innerHeight;
        const elementCenterY = rect.top + rect.height / 2;
        const viewportCenterY = viewportHeight / 2;
        const centerDistance = Math.abs(elementCenterY - viewportCenterY);

        // Prioritize sections closest to the center, but also consider those near the top
        // Adjust the weight or logic as needed
        const effectiveDistance = Math.min(distance, centerDistance * 0.8); // Weight center proximity slightly more

        if (rect.top <= viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.3) {
          // Check if element is roughly in the middle part of the viewport
          if (effectiveDistance < minDistance) {
            minDistance = effectiveDistance;
            currentSection = section.id;
          }
        }
      }
    });

    setActiveSection(currentSection);
  }, [sections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center space-y-2">
      {sections.map((section) => (
        <div key={section.id} className="relative flex items-center group">
          <button
            onClick={() => scrollToSection(section.id)}
            className={`w-3 h-3 rounded-full border border-amber-400 transition-all duration-300 ease-in-out ${
              activeSection === section.id ? "bg-amber-400 scale-125" : "bg-transparent hover:bg-amber-400/50"
            }`}
            aria-label={`Scroll to ${section.name}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ScrollGuide;
