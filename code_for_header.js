import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Find active section
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out
        ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'}
      `}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Centered Name with animation */}
        <div className="text-center mb-8">
          <h1 className="relative inline-block text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent
            hover:scale-102 transition-transform duration-300 cursor-default"
          >
            Manish Ramchandani
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="flex justify-center items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`group px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out relative
                  ${activeSection === item.href.substring(1) 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transform transition-all duration-300 ease-out
                  ${activeSection === item.href.substring(1)
                    ? 'bg-blue-600 scale-x-100'
                    : 'bg-gray-300 scale-x-0 group-hover:scale-x-100'
                  }
                `} />
                <ChevronDown 
                  className={`inline-block ml-1 w-4 h-4 transform transition-transform duration-300
                    ${activeSection === item.href.substring(1) ? 'rotate-180' : 'group-hover:translate-y-1'}
                  `}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu button with animation */}
        <div className="md:hidden absolute right-4 top-8">
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 
            focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6 transform rotate-90 animate-in" />
            ) : (
              <Menu className="block h-6 w-6 hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Mobile menu with smooth animation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg
            animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-300
                    ${activeSection === item.href.substring(1)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;