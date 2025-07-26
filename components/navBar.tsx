'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';



export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(true);
  const [mouseState, setMouseState] = useState({ x: 0, y: 0 });
  const pathname = usePathname();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/blog', label: 'Blog' },
    { href: '/center', label: 'Nos Centres' },
    { href: '/services', label: 'Services' },
    { href: '/zones-desservices', label: 'Zones desservies' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mousemoveXY = { x: e.movementY, y: e.movementX };
      if (mousemoveXY.x !== mouseState.x || mousemoveXY.y !== mouseState.y) {
        setIsVisible(true);
      }
      setMouseState(mousemoveXY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, mouseState]);

  return (
    <>
      {/* Custom Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <header id='navbar'
        className={`${
          isSticky ? '' : ''
        } fixed top-0 w-full z-50 text-white py-3 md:py-4 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center" 
            aria-label="Accueil Securicar"
          >
            
          </Link>
 
          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center space-x-6 flex-grow justify-center"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium text-white hover:text-[#007cf0] transition-colors duration-200 ${
                  pathname === item.href
                    ? 'after:content-[""] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#007cf0] after:to-[#00dfd8]'
                    : ''
                } relative`}
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#007cf0] p-1.5 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full pb-4 pt-3 bg-white/95 backdrop-blur-sm animate-slide-down shadow-md">
            <nav
              className="flex flex-col items-center space-y-2 px-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`text-base font-medium text-gray-700 hover:text-[#007cf0] transition-colors duration-200 w-full text-center py-2 rounded-md hover:bg-gray-50 ${
                    pathname === item.href
                      ? 'text-[#007cf0] underline underline-offset-4 decoration-[#00dfd8]'
                      : ''
                  }`}
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}