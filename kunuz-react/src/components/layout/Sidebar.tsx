import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight, Book, GraduationCap, Search, Menu, X } from 'lucide-react';
import notesData from '../../data/notesIndex.json';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({ 1: true });

  const toggleLevel = (level: number) => {
    setExpandedLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="sidebar-title">KUNUZ</h1>
        <button className="mobile-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/books" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <Book size={20} />
          <span>Books Library</span>
        </NavLink>

        <div className="nav-divider">Darajah Levels</div>

        {notesData.darajah.map((d) => (
          <div key={d.level} className="darajah-group">
            <button 
              className="darajah-toggle"
              onClick={() => toggleLevel(d.level)}
            >
              <GraduationCap size={20} />
              <span className="darajah-name">{d.name}</span>
              {expandedLevels[d.level] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {expandedLevels[d.level] && (
              <div className="subjects-list">
                {d.subjects.map((s) => (
                  <NavLink
                    key={s.name}
                    to={`/darajah/${d.level}/${s.name.toLowerCase()}`}
                    className={({ isActive }) => `subject-link ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    {s.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
