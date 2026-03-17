import React, { useState, useMemo } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Search as SearchIcon, X, FileText, Book } from 'lucide-react';
import notesData from '../../data/notesIndex.json';
import booksData from '../../data/booksIndex.json';

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: any[] = [];

    // Search Books
    booksData.books.forEach(book => {
      if (book.title.toLowerCase().includes(query)) {
        results.push({ ...book, type: 'book' });
      }
    });

    // Search Notes
    notesData.darajah.forEach(darajah => {
      darajah.subjects.forEach(subject => {
        subject.notes.forEach(note => {
          if (note.title.toLowerCase().includes(query)) {
            results.push({ ...note, type: 'note', darajah: darajah.level, subject: subject.name });
          }
        });
      });
    });

    return results.slice(0, 10); // Limit results
  }, [searchQuery]);

  const handleResultClick = (result: any) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/read/${result.type}/${result.id}`);
  };

  return (
    <div className="app-layout">
      {/* Sidebar - desktop version */}
      <aside className="sidebar-desktop">
        <Sidebar />
      </aside>

      {/* Sidebar - mobile drawer version */}
      {isSidebarOpen && (
        <div className="mobile-overlay" onClick={() => setIsSidebarOpen(false)}>
          <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="main-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="header-title mobile-only">KUNUZ</h1>
          </div>

          <div className="header-right">
            <div className="search-bar-desktop">
              <input 
                type="text" 
                placeholder="Search notes and books..." 
                onFocus={() => setIsSearchOpen(true)}
              />
              <SearchIcon size={18} className="search-icon" />
            </div>
            <button className="mobile-search-btn" onClick={() => setIsSearchOpen(true)}>
              <SearchIcon size={24} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="search-modal-overlay">
          <div className="search-modal-content">
            <div className="search-modal-header">
              <input 
                autoFocus
                type="text" 
                placeholder="Search notes and books..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>Cancel</button>
            </div>
            
            <div className="search-results-list">
              {searchQuery.trim() === '' ? (
                <p className="empty-state">Start typing to search...</p>
              ) : searchResults.length === 0 ? (
                <p className="empty-state">No results found for "{searchQuery}"</p>
              ) : (
                <div className="results-container">
                  {searchResults.map((result) => (
                    <div 
                      key={`${result.type}-${result.id}`} 
                      className="search-result-item"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className={`result-icon ${result.type}`}>
                        {result.type === 'book' ? <Book size={18} /> : <FileText size={18} />}
                      </div>
                      <div className="result-info">
                        <div className="result-title">{result.title}</div>
                        <div className="result-meta">
                          {result.type === 'book' ? 'Book' : `Darajah ${result.darajah} • ${result.subject}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
