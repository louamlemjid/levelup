"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern online shopping experience with seamless checkout",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative project management with real-time updates",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
  }
];

const ProjectCard = ({ project, index, scrollYProgress }: {
  project: Project;
  index: number;
  scrollYProgress: any;
}) => {
  const numCards = projects.length;
  
  // Each card animates in its own scroll range
  const cardStart = index / numCards;
  const cardEnd = (index + 1) / numCards;
  
  // Card slides up from bottom to center
  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    ["100vh", `${index * 20}px`]
  );
  
  // Scale effect during scroll
  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.2, cardEnd - 0.2, cardEnd],
    [1, 1.1, 1.1, 1]
  );
  
  // Opacity fade in
  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.3],
    [0, 1]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
      }}
      className="absolute inset-0 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Browser Header */}
        <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded-full px-4 py-1 text-sm text-gray-600 text-center border">
              https://{project.title.toLowerCase().replace(/\s+/g, '-')}.com
            </div>
          </div>
          <div className="w-16"></div>
        </div>
        
        {/* Content */}
        <div className="bg-blue-400 p-8">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {project.title}
          </h3>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {project.description}
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Live Demo
            </button>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium">
              View Code
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StackedProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const numCards = projects.length;
  const containerHeight = numCards * 100; // 100vh per card

  return (
    <div 
      ref={containerRef}
      style={{ height: `${containerHeight}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen ">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
        </div>
        
        {/* Title */}
        <div className="absolute  left-1/2 transform -translate-x-1/2 text-center z-10">
          <h2 className="text-5xl font-bold text-white mb-4">
            My Projects
          </h2>
          <p className="text-gray-300 text-xl">
            Scroll to explore my latest work
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative h-full">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackedProjects;