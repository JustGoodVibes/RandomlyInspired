import React from 'react';

const SkipNavigation = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:z-50"
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
};

export default SkipNavigation;
