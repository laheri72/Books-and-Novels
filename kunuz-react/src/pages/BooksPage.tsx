import React from 'react';
import { useNavigate } from 'react-router-dom';
import booksData from '../data/booksIndex.json';
import { Book as BookIcon, ExternalLink } from 'lucide-react';

const BooksPage: React.FC = () => {
  const navigate = useNavigate();
  const { books } = booksData;

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="page-title">Books Library</h2>
        <p className="page-description">A collection of books and novels.</p>
      </header>

      {books.length === 0 ? (
        <div className="empty-state-card">
          <BookIcon size={48} />
          <p>No books available yet.</p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                {book.cover ? (
                  <img src={book.cover} alt={book.title} />
                ) : (
                  <div className="book-cover-placeholder">
                    <BookIcon size={32} />
                  </div>
                )}
              </div>
              <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <button 
                  className="open-button"
                  onClick={() => navigate(`/read/book/${book.id}`)}
                >
                  <span>Open Library</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
