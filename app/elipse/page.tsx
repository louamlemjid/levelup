"use client";

import React, { useEffect, useRef, useState } from 'react';

const EllipticalLoopLine = () => {
  const [pathData, setPathData] = useState('M 3 6');
  const [currentY, setCurrentY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const pathSegments = [
    ' C 4 9 6.3333 6.6667 6 7',
    ' C 9 4 1 6 7 9',
    ' C 9 10 10 12 7 11',
    ' C 3 10 14 9 13 11 ',
    ' C 11 14 4 11 3 14'
  ];

  useEffect(() => {
    let currentSegmentIndex = 0;
    const handleScroll = () => {
        
      const scrollY = window.scrollY;
      const newY = scrollY * 0.1; // Adjust speed of animation
      setCurrentY(newY);

      if (currentSegmentIndex < pathSegments.length) {
        const newPathData = `M 3 6` + pathSegments.slice(0, currentSegmentIndex + 1).join('');
        setPathData(newPathData);
        
        if (newY > 20) { // Adjust threshold for next segment
          currentSegmentIndex++;
        }
      }

        
     
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex justify-start items-center min-h-screen bg-gray-100">

      <svg style={{ width: '700px', height: '600px', left: '-150px'}}
      ref={svgRef}
      strokeLinecap='round'
      
      xmlns="http://www.w3.org/2000/svg" viewBox="3 5.51598 10.06 8.484">
	<path d={pathData} stroke="blue" strokeWidth="0.5" fill="none"/>
</svg>
    </div>
    
  );
};

export default EllipticalLoopLine;