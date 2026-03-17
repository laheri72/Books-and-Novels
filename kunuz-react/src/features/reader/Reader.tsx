import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, Share2, Maximize2 } from 'lucide-react';
import notesData from '../../data/notesIndex.json';
import booksData from '../../data/booksIndex.json';

const Reader: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();

  let item: any = null;
  let title = '';

  if (type === 'note') {
    for (const darajah of notesData.darajah) {
      for (const subject of darajah.subjects) {
        const note = subject.notes.find(n => n.id === id);
        if (note) {
          item = note;
          title = note.title;
          break;
        }
      }
      if (item) break;
    }
  } else if (type === 'book') {
    item = booksData.books.find(b => b.id === id);
    title = item?.title || '';
  }

  if (!item) {
    return (
      <div className="reader-error">
        <h2>Item not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="reader-container">
      <header className="reader-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <div className="reader-title-container">
            <h2 className="reader-title">{title}</h2>
            <span className="reader-subtitle">{type === 'note' ? 'Note' : 'Book'}</span>
          </div>
        </div>
        
        <div className="header-right">
          <button className="icon-btn"><Share2 size={20} /></button>
          <button className="icon-btn mobile-hidden"><Maximize2 size={20} /></button>
          <button className="close-btn" onClick={() => navigate(-1)}>
            <X size={24} />
          </button>
        </div>
      </header>

      <div className="reader-content">
        <iframe 
          src={item.src} 
          title={title}
          className="reader-iframe"
          allow="autoplay"
        />
      </div>
    </div>
  );
};

export default Reader;
