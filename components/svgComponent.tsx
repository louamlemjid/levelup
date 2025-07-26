"use client";

import React, { useEffect, useRef, useState } from 'react';

const EllipticalLoopLine = () => {
  const [pathData, setPathData] = useState('M 3 6');
  const [currentY, setCurrentY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const pathSegments = [
    
    ' C 4 6 1 8 3 10',
    ' C 5 12 1 6 7 9',
    ' C 9 10 9 14 6 13',
    ' C 1 10 15 8 7 16',
    ' C 4 21 21 19 24 25'
  ];

  useEffect(() => {
    let currentSegmentIndex = 0;
    const handleScroll = () => {
        
      const scrollY = window.scrollY;
      const newY = scrollY * 0.1; // Adjust speed of animation
      setCurrentY(newY);

      if (currentSegmentIndex < pathSegments.length) {
        const newPathData = `M -1 6` + pathSegments.slice(0, currentSegmentIndex + 1).join('');
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
    

     
        <svg style={
      {
        position: 'sticky',
        

        width: '400px',
        height: '400px',
        zIndex: '10',
      }
    }
      ref={svgRef}
      strokeLinecap='round'
      
      xmlns="http://www.w3.org/2000/svg" viewBox="3 5.51598 10.06 8.484">
    <path d={pathData} stroke="blue" strokeWidth="0.5" fill="none"/>
</svg>
      
    
  );
};

export default EllipticalLoopLine;