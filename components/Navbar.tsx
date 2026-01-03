
import React from 'react';

interface NavbarProps {
  onLogoClick: () => void;
  onAdminClick: () => void;
  onSectionClick: (sectionId: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLogoClick, onAdminClick, onSectionClick, currentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md z-50 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div 
          onClick={onLogoClick} 
          className="cursor-pointer group flex items-center space-x-2"
        >
          <span className="serif text-2xl font-bold tracking-tight text-stone-800 transition-colors group-hover:text-amber-900">
            Camille Mignon
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">Archive</span>
        </div>
        
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => onSectionClick('stories')}
            className={`text-sm font-medium tracking-wide transition-colors ${currentPage === 'HOME' ? 'text-stone-800' : 'text-stone-500'} hover:text-amber-900`}
          >
            Stories
          </button>
          <button 
            onClick={() => onSectionClick('philosophy')}
            className="text-sm font-medium tracking-wide text-stone-500 hover:text-amber-900 transition-colors"
          >
            Philosophy
          </button>
          <button 
            onClick={onAdminClick}
            className={`px-4 py-1.5 border rounded-full text-xs font-medium transition-all ${currentPage === 'ADMIN' ? 'bg-stone-800 text-white border-stone-800' : 'text-stone-600 border-stone-300 hover:bg-stone-50'}`}
          >
            Manage
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
