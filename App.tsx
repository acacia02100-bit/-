
import React, { useState, useEffect } from 'react';
import { Page, Child, Artwork } from './types';
import { INITIAL_CHILDREN, INITIAL_ARTWORKS } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChildDetail from './pages/ChildDetail';
import Admin from './pages/Admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    try {
      const storedChildren = localStorage.getItem('camille_children');
      const storedArtworks = localStorage.getItem('camille_artworks');

      if (storedChildren) {
        setChildren(JSON.parse(storedChildren));
      } else {
        setChildren(INITIAL_CHILDREN);
        localStorage.setItem('camille_children', JSON.stringify(INITIAL_CHILDREN));
      }

      if (storedArtworks) {
        setArtworks(JSON.parse(storedArtworks));
      } else {
        setArtworks(INITIAL_ARTWORKS);
        localStorage.setItem('camille_artworks', JSON.stringify(INITIAL_ARTWORKS));
      }
    } catch (error) {
      console.warn("LocalStorage access failed. Using initial data.", error);
      setChildren(INITIAL_CHILDREN);
      setArtworks(INITIAL_ARTWORKS);
    }
  }, []);

  const navigateToHome = () => {
    setCurrentPage('HOME');
    setSelectedChildId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (sectionId: string) => {
    if (currentPage !== 'HOME') {
      setCurrentPage('HOME');
      setSelectedChildId(null);
      // Wait for re-render before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80; // Navbar height
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const navigateToChild = (id: string) => {
    setSelectedChildId(id);
    setCurrentPage('CHILD_DETAIL');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToAdmin = () => {
    setCurrentPage('ADMIN');
    setSelectedChildId(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const updateData = (newChildren: Child[], newArtworks: Artwork[]) => {
    setChildren(newChildren);
    setArtworks(newArtworks);
    try {
      localStorage.setItem('camille_children', JSON.stringify(newChildren));
      localStorage.setItem('camille_artworks', JSON.stringify(newArtworks));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onLogoClick={navigateToHome} 
        onAdminClick={navigateToAdmin}
        onSectionClick={navigateToSection}
        currentPage={currentPage}
      />
      
      <main className="flex-grow pt-20">
        {currentPage === 'HOME' && (
          <Home 
            childrenList={children.filter(c => c.visibility === 'PUBLIC')} 
            onChildSelect={navigateToChild} 
          />
        )}
        
        {currentPage === 'CHILD_DETAIL' && selectedChildId && (
          <ChildDetail 
            child={children.find(c => c.id === selectedChildId)!} 
            artworks={artworks.filter(a => a.childId === selectedChildId)}
            onBack={navigateToHome}
          />
        )}

        {currentPage === 'ADMIN' && (
          <Admin 
            childrenList={children}
            artworksList={artworks}
            onUpdate={updateData}
            onExit={navigateToHome}
          />
        )}
      </main>

      <footer className="bg-stone-100 py-16 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="mb-8">
            <span className="serif text-2xl font-bold tracking-tight text-stone-800">Camille Mignon</span>
          </div>
          <div className="space-y-2 mb-12">
            <p className="text-stone-500 font-medium">결과를 소비하지 않는 곳, 아이의 생각과 시간이 기록되는 공간</p>
            <p className="text-stone-400 text-sm">서울특별시 예술로 123 까미유미뇽 아카이브 | 02-1234-5678</p>
          </div>
          <div className="flex space-x-6 mb-12 text-sm">
            <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors">Instagram</a>
            <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors">Blog</a>
            <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors">Contact</a>
          </div>
          <p className="text-[10px] text-stone-300 uppercase tracking-widest">© 2024 까미유미뇽. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
